import Page, { type IPageAttrs } from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import UserDirectoryListState, { type UserDirectoryParams } from '../states/UserDirectoryListState';
export interface IUserDirectoryPageAttrs extends IPageAttrs {
}
/**
 * This page re-uses Flarum's IndexPage CSS classes.
 */
export default class UserDirectoryPage<CustomAttrs extends IUserDirectoryPageAttrs = IUserDirectoryPageAttrs> extends Page<CustomAttrs, UserDirectoryListState> {
    state: UserDirectoryListState;
    /**
     * Ids of the groups currently being filtered on.
     */
    enabledGroupFilters: string[];
    /**
     * Gambits contributed by other extensions, keyed by extension id.
     */
    enabledSpecialGroupFilters: Record<string, string>;
    oninit(vnode: Mithril.Vnode<CustomAttrs, this>): void;
    oncreate(vnode: Mithril.VnodeDOM<CustomAttrs, this>): void;
    setTitle(): void;
    view(): Mithril.Children;
    viewItems(): ItemList<Mithril.Children>;
    groupItems(): ItemList<Mithril.Children>;
    actionItems(): ItemList<Mithril.Children>;
    /**
     * Whether the suspended filter can be offered, which needs both the Suspend
     * extension and permission to see who is suspended.
     */
    protected canFilterSuspended(): boolean;
    protected toggleGroupFilter(id: string): void;
    protected toggleSuspendedFilter(): void;
    /**
     * Redirect to the directory using the given sort parameter.
     */
    changeParams(sort?: string): void;
    /**
     * Assemble the active filters back into a query string.
     */
    protected buildQuery(): string;
    stickyParams(): UserDirectoryParams;
    params(): UserDirectoryParams;
}
