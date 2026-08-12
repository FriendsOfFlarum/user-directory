import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import withAttr from 'flarum/common/utils/withAttr';
import KeyboardNavigatable from 'flarum/common/utils/KeyboardNavigatable';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type Model from 'flarum/common/Model';
import TextFilter from '../searchTypes/TextFilter';
import GroupFilter from '../searchTypes/GroupFilter';
import type AbstractType from '../searchTypes/AbstractType';
import type { FilterParams } from '../searchTypes/AbstractType';
import type UserDirectoryListState from '../states/UserDirectoryListState';

export interface ISearchFieldAttrs extends ComponentAttrs {
  state: UserDirectoryListState;
}

/**
 * The directory's search field, showing applied filters as removable chips and
 * suggesting new ones as the user types.
 */
export default class SearchField<CustomAttrs extends ISearchFieldAttrs = ISearchFieldAttrs> extends Component<CustomAttrs> {
  protected searchIndex = 0;
  protected navigator!: KeyboardNavigatable;
  protected availableFilters!: AbstractType[];
  protected appliedFilters: Model[] = [];
  protected filter = '';
  protected focused = false;

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    this.navigator = new KeyboardNavigatable();
    this.navigator
      .when((event) => {
        // Without this it is impossible to TAB out of an empty field.
        return event.key !== 'Tab' || !!this.filter;
      })
      .onUp(() => {
        if (this.searchIndex > 0) {
          this.searchIndex--;
          m.redraw();
        }
      })
      .onDown(() => {
        if (this.searchIndex < this.allSuggestions().length - 1) {
          this.searchIndex++;
          m.redraw();
        }
      })
      .onSelect(() => {
        if (this.filter) {
          this.selectResult(this.allSuggestions()[this.searchIndex]);
          m.redraw();
        } else {
          this.applyFiltering();
        }
      })
      .onRemove(() => {
        this.appliedFilters.pop();
      });

    this.availableFilters = this.filterTypes().toArray();

    // Restore any filters already present in the URL.
    this.availableFilters.forEach((filter) => {
      filter
        .initializeFromParams({
          sort: m.route.param('sort'),
          q: m.route.param('q'),
        })
        .then((resources) => {
          this.appliedFilters.push(...resources);
          m.redraw();
        });
    });
  }

  view(): Mithril.Children {
    const suggestions = this.allSuggestions();
    const loading = this.availableFilters.some((filter) => filter.loading);

    return (
      <div className="Form-group Usersearchbox">
        <label className={`UserDirectorySearchInput FormControl ${this.focused ? 'focus' : ''}`}>
          <span className="UserDirectorySearchInput-selected">
            {this.appliedFilters.map((resource, index) => (
              <span
                key={`${resource.data.type}:${resource.id()}`}
                className="UserDirectorySearchInput-filter"
                onclick={() => {
                  this.appliedFilters.splice(index, 1);
                  this.applyFiltering();
                }}
                title={this.searchResultKind(resource)}
              >
                {this.resourceLabel(resource)}
              </span>
            ))}
          </span>
          <input
            id="user-directory-search"
            className="FormControl"
            placeholder={app.translator.trans('fof-user-directory.forum.search.field.placeholder')}
            value={this.filter}
            oninput={withAttr('value', (value: string) => {
              this.filter = value;
              this.performNewSearch();
            })}
            onkeydown={this.navigator.navigate.bind(this.navigator)}
            onfocus={() => {
              this.focused = true;
            }}
            onblur={() => {
              this.focused = false;
            }}
          />
          {loading && <LoadingIndicator display="inline" size="small" />}
          {!!suggestions.length && (
            <ul className="Dropdown-menu">
              {suggestions.map((result, index) => (
                <li
                  key={`${result.data.type}:${result.id()}`}
                  className={this.searchIndex === index ? 'active' : ''}
                  onclick={() => {
                    this.selectResult(result);
                    this.applyFiltering();
                  }}
                >
                  <button type="button">
                    <span className="UserDirectorySearchKind">{this.searchResultKind(result)}</span>
                    {this.resourceLabel(result)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>
      </div>
    );
  }

  /**
   * The kinds of value this field can filter by.
   */
  filterTypes(): ItemList<AbstractType> {
    const items = new ItemList<AbstractType>();

    items.add('text', new TextFilter(), 10);
    items.add('group', new GroupFilter(), 20);

    return items;
  }

  filterForResource(resource: Model): AbstractType | undefined {
    return this.availableFilters.find((filter) => filter.resourceType() === resource.data.type);
  }

  resourceLabel(resource: Model): Mithril.Children {
    return this.filterForResource(resource)?.renderLabel(resource) ?? '[unknown]';
  }

  searchResultKind(resource: Model): Mithril.Children {
    return this.filterForResource(resource)?.renderKind(resource) ?? '[unknown]';
  }

  selectResult(result?: Model): void {
    if (!result) {
      return;
    }

    this.appliedFilters.push(result);
    this.clearSuggestions();
  }

  clearSuggestions(): void {
    this.filter = '';
    this.availableFilters.forEach((filter) => filter.search(''));
  }

  allSuggestions(): Model[] {
    return this.availableFilters.flatMap((filter) => filter.suggestions);
  }

  performNewSearch(): void {
    this.searchIndex = 0;

    this.availableFilters.forEach((filter) => filter.search(this.filter));

    this.attrs.state.refreshParams({ ...this.attrs.state.getParams(), qBuilder: this.qBuilder() });
  }

  /**
   * Fold the applied filters into the given params, returning the combined
   * query for the list state.
   */
  qBuilder(params: FilterParams = {}): { filter: string } {
    this.appliedFilters.forEach((resource) => {
      const filter = this.filterForResource(resource);

      if (filter) {
        filter.applyFilter(params, resource);
      } else {
        console.warn('Cannot find filter class for resource', resource);
      }
    });

    return { filter: `${this.filter} ${params.q || ''}` };
  }

  applyFiltering(): void {
    const params: FilterParams = {
      sort: m.route.param('sort'),
    };

    this.qBuilder(params);

    // Forced: Mithril does not re-init a component when the route changes to
    // the same one, so filtering from the directory would not reload the list.
    setRouteWithForcedRefresh(app.route('fof_user_directory', params));
  }
}
