/**
 * Helpers for the `group:` gambit used to filter the directory.
 *
 * The key is localizable — core reads it from
 * `core.lib.gambits.users.group.key` — so it must never be hardcoded. Core's
 * `GambitManager` does the parsing; these wrap it so the page and the search
 * field cannot drift apart in how they read and write the query.
 *
 * Note the API request itself needs no help here: `Store.find()` runs
 * `gambits.apply()` over any filter containing `q`, turning the gambit into the
 * structured `filter[group]` the backend expects.
 */
/**
 * Build the gambit text for a group id, e.g. `group:5`.
 */
export declare function gambitFor(id: string): string;
/**
 * Pull the unique group ids out of a query string.
 *
 * Values that are not numeric ids — a group referenced by name, say — are
 * ignored, because the directory's filter chips are keyed by id.
 */
export declare function extractGroupIds(query: string): string[];
