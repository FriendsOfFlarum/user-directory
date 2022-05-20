import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import withAttr from 'flarum/common/utils/withAttr';
import KeyboardNavigatable from 'flarum/common/utils/KeyboardNavigatable';
import ItemList from 'flarum/utils/ItemList';
import TextFilter from '../searchTypes/TextFilter';
import GroupFilter from '../searchTypes/GroupFilter';

export default class SearchField extends Component {
  oninit(vnode) {
    super.oninit(vnode);

    this.searchIndex = 0;
    this.navigator = new KeyboardNavigatable();
    this.navigator
      .when((event) => {
        // Do not handle keyboard when TAB is pressed and there's nothing in field
        // Without this it's impossible to TAB out of the field
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
    this.appliedFilters = [];

    this.filter = '';
    this.focused = false;

    // When the page loads, initialize UI with filters from the parameters
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

  view() {
    const suggestions = this.allSuggestions();

    const loading = this.availableFilters.some((filter) => filter.loading);

    return (
      <div className="Form-group Usersearchbox">
        <div className={`UserDirectorySearchInput FormControl ${this.focused ? 'focus' : ''}`}>
          <span className="UserDirectorySearchInput-selected">
            {this.appliedFilters.map((recipient, index) => (
              <span
                className="UserDirectorySearchInput-filter"
                onclick={() => {
                  this.appliedFilters.splice(index, 1);
                  this.applyFiltering();
                }}
                title={this.searchResultKind(recipient)}
              >
                {this.recipientLabel(recipient)}
              </span>
            ))}
          </span>
          <input
            className="FormControl"
            placeholder={app.translator.trans('fof-user-directory.forum.search.field.placeholder')}
            value={this.filter}
            oninput={withAttr('value', (value) => {
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
          {loading && <LoadingIndicator />}
          {!!suggestions.length && (
            <ul className="Dropdown-menu">
              {suggestions.map((result, index) => (
                <li
                  className={this.searchIndex === index ? 'active' : ''}
                  onclick={() => {
                    this.selectResult(result);
                    this.applyFiltering();
                  }}
                >
                  <button type="button">
                    <span className="UserDirectorySearchKind">{this.searchResultKind(result)}</span>
                    {this.recipientLabel(result)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  filterTypes() {
    const items = new ItemList();

    items.add('text', new TextFilter(), 10);
    items.add('group', new GroupFilter(), 20);

    return items;
  }

  filterForResource(resource) {
    return this.availableFilters.find((f) => f.resourceType() === resource.data.type);
  }

  recipientLabel(resource) {
    const filter = this.filterForResource(resource);

    if (filter) {
      return filter.renderLabel(resource);
    }

    return '[unknown]';
  }

  searchResultKind(resource) {
    const filter = this.filterForResource(resource);

    if (filter) {
      return filter.renderKind(resource);
    }

    return '[unknown]';
  }

  selectResult(result) {
    if (!result) {
      return;
    }

    this.appliedFilters.push(result);
    this.clearSuggestions();
  }

  clearSuggestions() {
    this.filter = '';
    this.availableFilters.forEach((filter) => {
      filter.search('');
    });
  }

  allSuggestions() {
    return [].concat(...this.availableFilters.map((filter) => filter.suggestions));
  }

  performNewSearch() {
    this.searchIndex = 0;

    this.availableFilters.forEach((filter) => {
      filter.search(this.filter);
    });

    this.attrs.state.refreshParams({ ...this.attrs.state.getParams(), qBuilder: this.qBuilder() });
  }

  qBuilder(params = {}) {
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

  applyFiltering() {
    const params = {
      sort: m.route.param('sort'),
    };

    this.qBuilder(params);

    m.route.set(app.route('fof_user_directory', params));
  }
}
