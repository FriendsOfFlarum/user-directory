import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import UsersSearchSource from 'flarum/forum/components/UsersSearchSource';
import LinkButton from 'flarum/common/components/LinkButton';

export default function extendUsersSearchSource() {
  extend(UsersSearchSource.prototype, 'view', function (view, query: string) {
    if (!view || !app.forum.attribute<boolean>('canSeeUserDirectoryLink') || app.forum.attribute<boolean>('userDirectoryDisableGlobalSearchSource')) {
      return;
    }

    query = query.toLowerCase();

    view.splice(
      1,
      0,
      <li>
        <LinkButton className="Button Button--link" href={app.route('fof_user_directory', { q: query })} icon="fas fa-search">
          {app.translator.trans('fof-user-directory.forum.search.users_heading', { query })}
        </LinkButton>
      </li>
    );
  });
}
