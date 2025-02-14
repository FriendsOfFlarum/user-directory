import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import LinkButton from 'flarum/common/components/LinkButton';
import UserDirectoryHero from '../components/UserDirectoryHero';

export default function extendIndexPage() {
  extend(IndexPage.prototype, 'navItems', (items) => {
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

  override(IndexPage.prototype, 'hero', function (original: any) {
    if (app.current.get('routeName') === 'fof_user_directory') {
      return <UserDirectoryHero />;
    }

    return original();
  });
}
