import Component, { type ComponentAttrs } from 'flarum/common/Component';
import KeyboardNavigatable from 'flarum/common/utils/KeyboardNavigatable';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type Model from 'flarum/common/Model';
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
    protected searchIndex: number;
    protected navigator: KeyboardNavigatable;
    protected availableFilters: AbstractType[];
    protected appliedFilters: Model[];
    protected filter: string;
    protected focused: boolean;
    oninit(vnode: Mithril.Vnode<CustomAttrs, this>): void;
    view(): Mithril.Children;
    /**
     * The kinds of value this field can filter by.
     */
    filterTypes(): ItemList<AbstractType>;
    filterForResource(resource: Model): AbstractType | undefined;
    resourceLabel(resource: Model): Mithril.Children;
    searchResultKind(resource: Model): Mithril.Children;
    selectResult(result?: Model): void;
    clearSuggestions(): void;
    allSuggestions(): Model[];
    performNewSearch(): void;
    /**
     * Fold the applied filters into the given params, returning the combined
     * query for the list state.
     */
    qBuilder(params?: FilterParams): {
        filter: string;
    };
    applyFiltering(): void;
}
