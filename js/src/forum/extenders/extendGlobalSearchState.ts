import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import GlobalSearchState from 'flarum/forum/states/GlobalSearchState';

/**
 * Stops the directory's `sort` and `q` leaking onto links that point away from
 * it.
 *
 * Core keeps those two params "sticky" so a filter survives moving between
 * discussion listings, and it does that by reading them straight off the
 * current route. On the directory they mean something different — `sort` holds
 * a directory sort key like `username_za`, and `q` holds group gambits — so
 * every link built from them, including "All Discussions" and each tag, came
 * out carrying a sort the discussion list cannot use.
 *
 * The directory's params are only meaningful on the directory, so nothing is
 * sticky while it is the current page.
 *
 * The page is matched by path rather than by class: it is lazy loaded, so the
 * module may not exist yet, and `matches()` resolves the path against the
 * registry itself (returning false when it is not loaded — which is correct
 * here, since an unloaded page cannot be the current one).
 */
export default function extendGlobalSearchState() {
  override(GlobalSearchState.prototype, 'stickyParams', function (original) {
    if (app.current?.matches('ext:fof/user-directory/forum/components/UserDirectoryPage')) {
      return {};
    }

    return original();
  });
}
