import app from 'flarum/forum/app';

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
export function gambitFor(id: string): string {
  return `${groupKey()}:${id}`;
}

/**
 * Pull the unique group ids out of a query string.
 *
 * Values that are not numeric ids — a group referenced by name, say — are
 * ignored, because the directory's filter chips are keyed by id.
 */
export function extractGroupIds(query: string): string[] {
  if (!query) {
    return [];
  }

  const ids: string[] = [];

  app.search.gambits.match('users', query, (gambit, matches, negate) => {
    if (negate || gambit.filterKey() !== 'group') {
      return;
    }

    // A key/value gambit may carry a comma-separated list.
    for (const value of String(matches[1]).split(',')) {
      const id = value.trim();

      if (/^\d+$/.test(id)) {
        ids.push(id);
      }
    }
  });

  return [...new Set(ids)];
}

/**
 * The localized gambit key, e.g. `group` in English.
 */
function groupKey(): string {
  return app.translator.trans('core.lib.gambits.users.group.key', {}, true) as string;
}
