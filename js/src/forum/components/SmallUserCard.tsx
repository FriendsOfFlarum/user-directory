import app from 'flarum/forum/app';
import UserCard, { type IUserCardAttrs } from 'flarum/forum/components/UserCard';
import ItemList from 'flarum/common/utils/ItemList';
import humanTime from 'flarum/common/utils/humanTime';
import type Mithril from 'mithril';
import keepControlsInCard from '../utils/keepControlsInCard';

export interface SmallUserCardAttrs extends IUserCardAttrs {}

export default class SmallUserCard<CustomAttrs extends SmallUserCardAttrs = SmallUserCardAttrs> extends UserCard<CustomAttrs> {
  //Overriding infoItems so that other extensions can separately add items to small cards
  infoItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const user = this.attrs.user;

    items.add('joined', app.translator.trans('core.forum.user.joined_date_text', { ago: humanTime(user.joinTime()) }));

    return items;
  }

  controlsItems(): ItemList<Mithril.Children> {
    return keepControlsInCard(super.controlsItems());
  }
}
