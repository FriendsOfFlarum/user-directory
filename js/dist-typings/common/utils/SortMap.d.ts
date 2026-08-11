/**
 * A sort option that is only available to actors holding a given permission.
 */
export interface PermissionedSort {
    /** The API sort parameter. */
    sort: string;
    /**
     * The forum attribute that reports whether the actor may use this sort.
     * When it is not true, the option is hidden and never sent to the API.
     */
    attribute: string;
}
/**
 * The sort options for the user directory.
 *
 * Extensions can add custom sort options using the `extend` helper:
 *
 * @example
 * import { extend } from 'flarum/common/extend';
 * import SortMap from 'ext:fof/user-directory/common/utils/SortMap';
 *
 * extend(SortMap.prototype, 'sortMap', function(map) {
 *   map.most_best_answers = '-bestAnswerCount';
 *   map.least_best_answers = 'bestAnswerCount';
 * });
 *
 * Sorts that require a permission belong in `permissionedSortMap` instead, so
 * they can be hidden from actors who would only get an API error:
 *
 * @example
 * extend(SortMap.prototype, 'permissionedSortMap', function(map) {
 *   map.my_sort = { sort: '-myField', attribute: 'canUseMySort' };
 * });
 */
export default class SortMap {
    /**
     * Get the sort map. Extensions can use `extend` to add custom sort options.
     * @returns A map of sort keys to API sort parameters
     */
    sortMap(): Record<string, string>;
    /**
     * Get the sort options that are gated behind a permission.
     *
     * Core only exposes its `lastSeenAt` sort to holders of `user.viewLastSeenAt`
     * and rejects the request outright for anyone else, so these must never be
     * offered unconditionally — that was the cause of issue #66.
     *
     * @returns A map of sort keys to their API sort param and gating attribute
     */
    permissionedSortMap(): Record<string, PermissionedSort>;
}
