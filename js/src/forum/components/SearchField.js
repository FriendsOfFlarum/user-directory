import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import withAttr from 'flarum/common/utils/withAttr';
import KeyboardNavigatable from 'flarum/common/utils/KeyboardNavigatable';
import ItemList from 'flarum/utils/ItemList';

export default class SearchField extends Component {
    oninit(vnode) {
        super.oninit(vnode);

        this.searchIndex = 0;
        this.navigator = new KeyboardNavigatable();
        this.navigator
            .when(event => {
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
    }

    view() {
        return (
            <div className="Form-group Usersearchbox">
                <input
                    className="FormControl"
                    placeholder={app.translator.trans('fof-user-directory.forum.search.field.placeholder')}
                    value={this.filter}
                    oninput={withAttr('value', (value) => {
                        this.filter = value;
                        this.performNewSearch();
                    })}
                />
            </div>
        );
    }

    filterTypes() {
        const items = new ItemList();

        return items;
    }

    filterForResource(resource) {
        return this.availableFilters.find(f => f.resourceType() === resource.data.type);
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
        this.availableFilters.forEach(filter => {
            filter.search('');
        });
    }

    allSuggestions() {
        return [].concat(...this.availableFilters.map(filter => filter.suggestions));
    }

    performNewSearch() {
        //this.attrs.state.refreshParams({ ...this.attrs.state.getParams(), qBuilder: { filter: this.filter } });

        this.searchIndex = 0;

        this.availableFilters.forEach(filter => {
            //filter.search(this.filter);
            this.attrs.state.refreshParams({ ...this.attrs.state.getParams(), qBuilder: { filter: this.filter } });
        })
    }

    applyFiltering() {
        const params = {
            sort: m.route.param('sort')
        };

        this.appliedFilters.forEach(resource => {
            const filter = this.filterForResource(resource);

            if (filter) {
                filter.applyFilter(params, resource);
            } else {
                console.warn('Cannot find filter class for resource', resource);
            }
        });

        m.route(app.route('fof_user_directory', params));
    }
}
