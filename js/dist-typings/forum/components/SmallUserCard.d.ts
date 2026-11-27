import UserCard, { type IUserCardAttrs } from 'flarum/forum/components/UserCard';
import ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
export interface SmallUserCardAttrs extends IUserCardAttrs {
}
export default class SmallUserCard<CustomAttrs extends SmallUserCardAttrs = SmallUserCardAttrs> extends UserCard<CustomAttrs> {
    infoItems(): ItemList<Mithril.Children>;
    controlsItems(): ItemList<Mithril.Children>;
}
