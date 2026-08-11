import type Mithril from 'mithril';
import type Model from 'flarum/common/Model';

/**
 * Parameters a filter can read from, and write filtering into, when building a
 * directory request.
 */
export interface FilterParams {
  q?: string;
  sort?: string;
  [key: string]: unknown;
}

/**
 * A kind of value the directory search field can suggest and filter by.
 *
 * Note this predates core's gambit system (`common/query/IGambit`), which is
 * where this should eventually move — core now ships a `GroupGambit` covering
 * most of what `GroupFilter` does here.
 */
export default abstract class AbstractType<T extends Model = Model> {
  /**
   * Suggestions matching the current query, updated by `search()`.
   */
  suggestions: T[] = [];

  /**
   * Whether an asynchronous search is in flight.
   */
  loading = false;

  /**
   * The `type` of the models used in suggestions and applied filters.
   */
  abstract resourceType(): string;

  /**
   * Update `suggestions` for the given query.
   *
   * Set `loading` while any asynchronous work is in progress.
   */
  abstract search(query: string): void;

  /**
   * Render the "kind" label shown next to a suggestion, indicating what sort of
   * value it is. Usually just translated text.
   */
  abstract renderKind(resource?: T): Mithril.Children;

  /**
   * Render the label containing a suggestion's value.
   */
  abstract renderLabel(resource: T): Mithril.Children;

  /**
   * Apply this resource as a filter on the params used for the page request.
   */
  abstract applyFilter(params: FilterParams, resource: T): void;

  /**
   * Populate the search field from the query string on page load.
   */
  abstract initializeFromParams(params: FilterParams): Promise<T[]>;
}
