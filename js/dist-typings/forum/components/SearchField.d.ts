export default class SearchField extends Component<any, undefined> {
    constructor();
    oninit(vnode: any): void;
    searchIndex: number | undefined;
    navigator: KeyboardNavigatable | undefined;
    availableFilters: any[] | undefined;
    appliedFilters: any[] | undefined;
    filter: any;
    focused: boolean | undefined;
    view(): JSX.Element;
    filterTypes(): ItemList<any>;
    filterForResource(resource: any): any;
    recipientLabel(resource: any): any;
    searchResultKind(resource: any): any;
    selectResult(result: any): void;
    clearSuggestions(): void;
    allSuggestions(): never[];
    performNewSearch(): void;
    qBuilder(params?: {}): {
        filter: string;
    };
    applyFiltering(): void;
}
import Component from "flarum/common/Component";
import KeyboardNavigatable from "flarum/common/utils/KeyboardNavigatable";
import ItemList from "flarum/common/utils/ItemList";
