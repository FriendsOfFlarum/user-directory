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
 */
export default class SortMap {
    /**
     * Get the sort map. Extensions can use `extend` to add custom sort options.
     * @returns A map of sort keys to API sort parameters
     */
    sortMap(): Record<string, string>;
}
