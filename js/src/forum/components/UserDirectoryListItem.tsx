import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Mithril from 'mithril';
import type User from 'flarum/common/models/User';
import SmallUserCard from './SmallUserCard';
import UserDirectoryUserCard from './UserDirectoryUserCard';

export interface IUserDirectoryListItemAttrs extends ComponentAttrs {
  user: User;
  useSmallCards?: boolean;
}

export default class UserDirectoryListItem<
  CustomAttrs extends IUserDirectoryListItemAttrs = IUserDirectoryListItemAttrs,
> extends Component<CustomAttrs> {
  view(): Mithril.Children {
    const { user, useSmallCards } = this.attrs;

    const attrs = {
      user,
      className: `UserCard--directory${useSmallCards ? ' UserCard--small' : ''}`,
      controlsButtonClassName: 'Button Button--icon Button--flat',
    };

    return <div className="User">{useSmallCards ? <SmallUserCard {...attrs} /> : <UserDirectoryUserCard {...attrs} />}</div>;
  }
}
