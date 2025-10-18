/**
 * This page re-uses Flarum's IndexPage CSS classes
 */
export default class UserDirectoryPage extends Page<import("flarum/common/components/Page").IPageAttrs, undefined> {
    constructor();
    oninit(vnode: any): void;
    state: UserDirectoryState;
    enabledGroupFilters: any;
    enabledSpecialGroupFilters: {} | undefined;
    oncreate(vnode: any): void;
    view(): JSX.Element;
    viewItems(): ItemList<any>;
    groupItems(): ItemList<any>;
    actionItems(): ItemList<any>;
    /**
     * Redirect to the index page using the given sort parameter.
     *
     * @param {String} sort
     */
    changeParams(sort: string): void;
    stickyParams(): {
        sort: any;
        q: any;
    };
    params(): {
        sort: any;
        q: any;
    };
}
import Page from "flarum/common/components/Page";
import UserDirectoryState from "../states/UserDirectoryState";
import ItemList from "flarum/common/utils/ItemList";
