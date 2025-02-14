import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import CommentPost from 'flarum/forum/components/CommentPost';
import Group from 'flarum/common/models/Group';

export const linkGroupMentions = function () {
  if (app.forum.attribute<boolean>('canSeeUserDirectoryLink') && app.forum.attribute<boolean>('userDirectoryLinkGroupMentions')) {
    // @ts-ignore
    this.$('.GroupMention').each(function () {
      // @ts-ignore
      if ($(this).hasClass('GroupMention--linked')) return;

      // @ts-ignore
      const name = $(this).find('.GroupMention-name').text();
      const group = app.store.getBy<Group>('groups', 'namePlural', name.slice(1));

      if (group) {
        const link = $(`<a class="GroupMention-link" href="${app.route('fof_user_directory', { q: `group:${group.id()}` })}"></a>`);

        link.on('click', function (e) {
          // @ts-ignore
          m.route.set(this.getAttribute('href'));
          e.preventDefault();
        });

        // @ts-ignore
        $(this).addClass('GroupMention--linked').wrap(link);
      }
    });
  }
};

export default function extendCommentPost() {
  extend(CommentPost.prototype, 'oncreate', linkGroupMentions);
  extend(CommentPost.prototype, 'onupdate', linkGroupMentions);
}
