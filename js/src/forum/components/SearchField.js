import app from 'flarum/app';
import Component from 'flarum/Component';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import KeyboardNavigatable from 'flarum/utils/KeyboardNavigatable';
import ItemList from 'flarum/utils/ItemList';
import TextFilter from '../searchTypes/TextFilter';
import GroupFilter from '../searchTypes/GroupFilter';

/* global m */

export default class SearchField extends Component {
    init() {
        super.init();

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

        // When the page loads, initialize UI with filters from the parameters
        this.availableFilters.forEach(filter => {
            filter.initializeFromParams({
                sort: m.route.param('sort'),
                q: m.route.param('q'),
            }).then(resources => {
                this.appliedFilters.push(...resources);
                m.redraw();
            });
        });
    }

    filterTypes() {
        const items = new ItemList();

        items.add('text', new TextFilter(), 10);
        items.add('group', new GroupFilter(), 20);

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

    view() {
        const suggestions = this.allSuggestions();

        const loading = this.availableFilters.some(filter => filter.loading);

        return m('.Form-group', [
            m('.UserDirectorySearchInput.FormControl', {
                className: this.focused ? 'focus' : '',
            }, [
                m('span.UserDirectorySearchInput-selected', this.appliedFilters.map((recipient, index) => m('span.UserDirectorySearchInput-filter', {
                    onclick: () => {
                        this.appliedFilters.splice(index, 1);
                        this.applyFiltering();
                    },
                    title: this.searchResultKind(recipient),
                }, this.recipientLabel(recipient)))),
                m('input.FormControl', {
                    placeholder: app.translator.trans('fof-user-directory.forum.search.field.placeholder'),
                    value: this.filter,
                    oninput: m.withAttr('value', value => {
                        this.filter = value;
                        this.performNewSearch();
                    }),
                    onkeydown: this.navigator.navigate.bind(this.navigator),
                    onfocus: () => {
                        this.focused = true;
                    },
                    onblur: () => {
                        this.focused = false;
                    },
                }),
                loading ? LoadingIndicator.component({
                    size: 'tiny',
                    className: 'Button Button--icon Button--link',
                }) : null,
                suggestions.length ? m('ul.Dropdown-menu', suggestions.map(
                    (result, index) => m('li', {
                        className: this.searchIndex === index ? 'active' : '',
                        onclick: () => {
                            this.selectResult(result);
                            this.applyFiltering();
                        },
                    }, m('button[type=button]', [
                        m('span.UserDirectorySearchKind', this.searchResultKind(result)),
                        this.recipientLabel(result),
                    ]))
                )) : null,
            ]),
        ]);
    }

    performNewSearch() {
        this.searchIndex = 0;

        this.availableFilters.forEach(filter => {
            filter.search(this.filter);
        });
    }

    applyFiltering() {
        const params = {
            sort: m.route.param('sort'),
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
