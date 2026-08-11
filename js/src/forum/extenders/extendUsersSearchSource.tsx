import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import GlobalUsersSearchSource from 'flarum/forum/components/GlobalUsersSearchSource';
import LinkButton from 'flarum/common/components/LinkButton';
import type Mithril from 'mithril';

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
export default function extendUsersSearchSource() {
  override(GlobalUsersSearchSource.prototype, 'fullPage', function (original, query: string): Mithril.Vnode | null {
    // Gated on being able to reach the directory, not on the separate sidebar
    // link setting — an admin hiding that link should not disable search too.
    if (!app.forum.attribute<boolean>('canViewUserDirectory') || app.forum.attribute<boolean>('userDirectoryDisableGlobalSearchSource')) {
      return original(query);
    }

    return (
      <li>
        <LinkButton icon="fas fa-search" href={app.route('fof_user_directory', { q: query })}>
          {app.translator.trans('fof-user-directory.forum.search.users_heading', { query })}
        </LinkButton>
      </li>
    );
  });
}
