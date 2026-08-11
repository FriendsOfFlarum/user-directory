import app from 'flarum/forum/app';
import UserCard from 'flarum/forum/components/UserCard';
import Icon from 'flarum/common/components/Icon';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type User from 'flarum/common/models/User';

/**
 * The full-size user card shown in the directory, adding the discussion and
 * post counts alongside core's own info items.
 */
export interface UserDirectoryUserCardAttrs extends Mithril.Attributes {
  user: User;
  className?: string;
  editable?: boolean;
  controlsButtonClassName?: string;
}

export default class UserDirectoryUserCard extends UserCard {
  attrs!: UserDirectoryUserCardAttrs;

  /**
   * Allows other extensions to add items unique to the user directory.
   */
  infoItems(): ItemList<Mithril.Children> {
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
        <Icon name="fas fa-comment" />
        {app.translator.trans('fof-user-directory.forum.page.usercard.discussion-count', {
          count: user.discussionCount(),
        })}
      </div>,
      70
    );

    items.add(
      'comment-count',
      <div className="userStat">
        <Icon name="fas fa-comments" />
        {app.translator.trans('fof-user-directory.forum.page.usercard.post-count', {
          count: user.commentCount(),
        })}
      </div>,
      69
    );

    return items;
  }
}
