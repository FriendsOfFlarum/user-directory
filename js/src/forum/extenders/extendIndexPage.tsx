import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';

export default function extendIndexPage() {
  extend(IndexSidebar.prototype, 'navItems', (items) => {
    if (app.forum.attribute<boolean>('canSeeUserDirectoryLink') && app.forum.attribute<boolean>('canSearchUsers')) {
      items.add(
        'fof-user-directory',
        <LinkButton href={app.route('fof_user_directory')} icon="far fa-address-book">
          {app.translator.trans('fof-user-directory.forum.page.nav')}
        </LinkButton>,
        85
      );
    }
  });
}
