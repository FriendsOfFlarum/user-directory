import UserCard from 'flarum/forum/components/UserCard';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
import type User from 'flarum/common/models/User';
export interface SmallUserCardAttrs extends Mithril.Attributes {
    user: User;
    className?: string;
    editable?: boolean;
    controlsButtonClassName?: string;
}
export default class SmallUserCard extends UserCard {
    attrs: SmallUserCardAttrs;
    infoItems(): ItemList<Mithril.Children>;
}
