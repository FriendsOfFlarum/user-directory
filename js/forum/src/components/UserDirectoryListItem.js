import Component from 'flarum/Component';
import avatar from 'flarum/helpers/avatar';
import UserCard from 'flarum/components/UserCard';
import username from 'flarum/helpers/username';
import userOnline from 'flarum/helpers/userOnline';
import listItems from 'flarum/helpers/listItems';
import highlight from 'flarum/helpers/highlight';
import icon from 'flarum/helpers/icon';
import humanTime from 'flarum/utils/humanTime';
import ItemList from 'flarum/utils/ItemList';
import abbreviateNumber from 'flarum/utils/abbreviateNumber';
import Dropdown from 'flarum/components/Dropdown';
import TerminalPost from 'flarum/components/TerminalPost';
import PostPreview from 'flarum/components/PostPreview';
import PostUser from 'flarum/components/PostUser';
import slidable from 'flarum/utils/slidable';
import extractText from 'flarum/utils/extractText';
import classList from 'flarum/utils/classList';

export default class UserDirectoryListItem extends Component {


    config(isInitialized) {
        if (isInitialized) return;

        let timeout;

        this.$()
            .on('mouseover', 'h3 a, .UserCard', () => {
                clearTimeout(timeout);
                timeout = setTimeout(this.showCard.bind(this), 500);
            })
            .on('mouseout', 'h3 a, .UserCard', () => {
                clearTimeout(timeout);
                timeout = setTimeout(this.hideCard.bind(this), 250);
            });
    }

    view() {
        const user = this.props.user;
        let
            card = UserCard.component({
                user,
                className: 'UserCard--popover',
                controlsButtonClassName: 'Button Button--icon Button--flat'
            });

        return (
            <div className="PostUser">
                {userOnline(user)}
                <h3>
                    <a href={app.route.user(user)} config={m.route}>
                        {avatar(user, {className: 'PostUser-avatar'})}{' '}{username(user)}
                    </a>
                </h3>
                <ul className="PostUser-badges badges">
                    {listItems(user.badges().toArray())}
                </ul>
                {card}
            </div>
        )
    }

    /**
     * Show the user card.
     */
    showCard() {
        this.cardVisible = true;

        m.redraw();

        setTimeout(() => this.$('.UserCard').addClass('in'));
    }

    /**
     * Hide the user card.
     */
    hideCard() {
        this.$('.UserCard').removeClass('in')
            .one('transitionend webkitTransitionEnd oTransitionEnd', () => {
                this.cardVisible = false;
                m.redraw();
            });
    }
}
