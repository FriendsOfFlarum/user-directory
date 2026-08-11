import PaginatedListState, { PaginatedListParams, PaginatedListRequestParams, type SortMap as SortMapType } from 'flarum/common/states/PaginatedListState';
import User from 'flarum/common/models/User';
import { ApiResponsePlural } from 'flarum/common/Store';
export interface UserDirectoryParams extends PaginatedListParams {
    sort?: string;
    q?: string;
    filter?: Record<string, any>;
    qBuilder?: Record<string, any>;
}
/**
 * State class for managing the user directory list with pagination.
 * Based on Flarum's modern DiscussionListState pattern.
 */
export default class UserDirectoryListState extends PaginatedListState<User, UserDirectoryParams> {
    protected qBuilder: Record<string, any>;
    constructor(params?: UserDirectoryParams, page?: number);
    get type(): string;
    requestParams(): PaginatedListRequestParams;
    protected loadPage(page?: number): Promise<ApiResponsePlural<User>>;
    /**
     * Get the sort map for the user directory.
     *
     * Permissioned sorts are only included when the forum reports that the actor
     * may use them, so a sort the API would reject can never be selected, sent,
     * or restored from a URL — see issue #66.
     *
     * **Note for extension developers**: Do NOT extend this method.
     * Instead, extend the `SortMap` class from `common/utils/SortMap`:
     *
     * @example
     * import { extend } from 'flarum/common/extend';
     * import SortMap from 'ext:fof/user-directory/common/utils/SortMap';
     *
     * extend(SortMap.prototype, 'sortMap', function (map) {
     *   map.my_custom_sort = '-customField';
     * });
     */
    sortMap(): SortMapType;
    /**
     * Update parameters and refresh the list.
     * Handles qBuilder logic for building query strings from filters.
     */
    refreshParams(newParams: UserDirectoryParams, page?: number): Promise<void>;
}
