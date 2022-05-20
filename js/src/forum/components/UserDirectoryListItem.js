import Component from 'flarum/common/Component';
import UserCard from 'flarum/forum/components/UserCard';
import SmallUserCard from './SmallUserCard';
import UserDirectoryUserCard from './UserDirectoryUserCard';

export default class UserDirectoryListItem extends Component {
  view(vnode) {
    const { user, useSmallCards } = this.attrs;

    const attributes = {
      user,
      className: `UserCard--directory${useSmallCards ? ' UserCard--small' : ''}`,
      controlsButtonClassName: 'Button Button--icon Button--flat',
    };

    return <div className="User">{useSmallCards ? SmallUserCard.component(attributes) : UserDirectoryUserCard.component(attributes)}</div>;
  }
}
