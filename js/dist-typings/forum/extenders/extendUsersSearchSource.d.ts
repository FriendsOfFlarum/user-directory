/**
 * Adds a "Search all users for ..." link to the users section of the global
 * search, letting people jump from the truncated preview into the full
 * directory with their query already applied.
 *
 * This hooks `GlobalUsersSearchSource`, which is what core's `GlobalSearch`
 * actually renders in 2.x. The older `UsersSearchSource` is still exported for
 * backwards compatibility but is never mounted, so extending it did nothing —
 * see issue #116.
 *
 * `fullPage()` is core's designated slot for exactly this kind of link, so the
 * link is rendered below the results rather than spliced into them.
 */
export default function extendUsersSearchSource(): void;
