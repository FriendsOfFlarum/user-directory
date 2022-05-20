import UserCard from 'flarum/forum/components/UserCard';
import ItemList from 'flarum/common/utils/ItemList';
import humanTime from 'flarum/common/utils/humanTime';
import icon from 'flarum/common/helpers/icon';
import app from 'flarum/forum/app';

export default class UserDirectoryUserCard extends UserCard {
  /**
   * Allowing to add additonal items unique to the user directory.
   *
   * @return {ItemList<import('mithril').Children>}
   */
  infoItems() {
    const items = super.infoItems();
    const user = this.attrs.user;

    if (items.has('lastSeen')) items.setPriority('lastSeen', 100);
    if (items.has('joined')) items.setPriority('joined', 95);
    if (items.has('points')) items.setPriority('points', 60);
    if (items.has('best-answer-count')) items.setPriority('best-answer-count', 68);
    if (items.has('masquerade-bio')) items.setPriority('masquerade-bio', 50);

    items.add(
      'discussion-count',
      <div className="userStat">
        {icon('fas fa-comment')}
        {app.translator.trans('fof-user-directory.forum.page.usercard.discussion-count', {
          count: user.discussionCount(),
        })}
      </div>,
      70
    );

    items.add(
      'comment-count',
      <div className="userStat">
        {icon('fas fa-comments')}
        {app.translator.trans('fof-user-directory.forum.page.usercard.post-count', {
          count: user.commentCount(),
        })}
      </div>,
      69
    );

    return items;
  }
}
