import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import UsersSearchSource from 'flarum/forum/components/UsersSearchSource';
import LinkButton from 'flarum/common/components/LinkButton';
import CommentPost from 'flarum/forum/components/CommentPost';
import UserDirectoryPage from './components/UserDirectoryPage';
import Text from './models/Text';

export const linkGroupMentions = function () {
  if (app.forum.attribute('canSeeUserDirectoryLink') && app.forum.attribute('userDirectoryLinkGroupMentions')) {
    this.$('.GroupMention').each(function () {
      if ($(this).hasClass('GroupMention--linked')) return;

      const name = $(this).find('.GroupMention-name').text();
      const group = app.store.getBy('groups', 'namePlural', name.slice(1));

      if (group) {
        const link = $(`<a class="GroupMention-link" href="${app.route('fof_user_directory', { q: `group:${group.id()}` })}"></a>`);

        link.on('click', function (e) {
          m.route.set(this.getAttribute('href'));
          e.preventDefault();
        });

        $(this).addClass('GroupMention--linked').wrap(link);
      }
    });
  }
};

app.initializers.add('fof-user-directory', (app) => {
  app.routes.fof_user_directory = {
    path: '/users',
    component: UserDirectoryPage,
  };

  app.store.models['fof-user-directory-text'] = Text;

  extend(UsersSearchSource.prototype, 'view', function (view, query) {
    if (!view || !app.forum.attribute('canSeeUserDirectoryLink') || app.forum.attribute('userDirectoryDisableGlobalSearchSource')) {
      return;
    }

    query = query.toLowerCase();

    view.splice(
      1,
      0,
      m(
        'li',
        LinkButton.component(
          {
            href: app.route('fof_user_directory', { q: query }),
            icon: 'fas fa-search',
          },
          app.translator.trans('fof-user-directory.forum.search.users_heading', { query })
        )
      )
    );
  });

  extend(IndexSidebar.prototype, 'navItems', (items) => {
    if (app.forum.attribute('canSeeUserDirectoryLink') && app.forum.attribute('canSearchUsers')) {
      items.add(
        'fof-user-directory',
        LinkButton.component(
          {
            href: app.route('fof_user_directory'),
            icon: 'far fa-address-book',
          },
          app.translator.trans('fof-user-directory.forum.page.nav')
        ),
        85
      );
    }
  });

  extend(CommentPost.prototype, 'oncreate', linkGroupMentions);
  extend(CommentPost.prototype, 'onupdate', linkGroupMentions);
});
