import Component from 'flarum/common/Component';
import UserCard from 'flarum/forum/components/UserCard';
import SmallUserCard from './SmallUserCard';

export default class UserDirectoryListItem extends Component {
    view(vnode) {
        const { user, useSmallCards } = this.attrs;

        const attributes = {
            user,
            className: `UserCard--directory${useSmallCards ? ' UserCard--small' : ''}`,
            controlsButtonClassName: 'Button Button--icon Button--flat',
        };

        return <div className="User">{useSmallCards ? SmallUserCard.component(attributes) : UserCard.component(attributes)}</div>;
    }
}
