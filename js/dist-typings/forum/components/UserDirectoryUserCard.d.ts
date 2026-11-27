import UserCard, { type IUserCardAttrs } from 'flarum/forum/components/UserCard';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
export interface UserDirectoryUserCardAttrs extends IUserCardAttrs {
}
/**
 * The full-size user card shown in the directory, adding the discussion and
 * post counts alongside core's own info items.
 */
export default class UserDirectoryUserCard<CustomAttrs extends UserDirectoryUserCardAttrs = UserDirectoryUserCardAttrs> extends UserCard<CustomAttrs> {
    /**
     * Allows other extensions to add items unique to the user directory.
     */
    infoItems(): ItemList<Mithril.Children>;
    controlsItems(): ItemList<Mithril.Children>;
}
