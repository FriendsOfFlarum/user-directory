export default class UserDirectoryUserCard extends UserCard {
    /**
     * Allowing to add additonal items unique to the user directory.
     *
     * @return {ItemList<import('mithril').Children>}
     */
    infoItems(): ItemList<import('mithril').Children>;
}
import UserCard from "flarum/forum/components/UserCard";
import ItemList from "flarum/common/utils/ItemList";
