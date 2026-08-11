import UserCard from 'flarum/forum/components/UserCard';
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
    attrs: UserDirectoryUserCardAttrs;
    /**
     * Allows other extensions to add items unique to the user directory.
     */
    infoItems(): ItemList<Mithril.Children>;
}
