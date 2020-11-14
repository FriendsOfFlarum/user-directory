import Component from 'flarum/Component';
import UserCard from 'flarum/components/UserCard';

export default class UserDirectoryListItem extends Component {
    view() {
        const { user } = this.attrs;

        return (
            <div className="User">
                {UserCard.component({
                    user,
                    className: 'UserCard--directory',
                    controlsButtonClassName: 'Button Button--icon Button--flat',
                })}
            </div>
        );
    }
}
