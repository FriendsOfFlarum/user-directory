import app from 'flarum/forum/app';
import UserCard from 'flarum/forum/components/UserCard';
import ItemList from 'flarum/common/utils/ItemList';
import humanTime from 'flarum/common/utils/humanTime';
import type Mithril from 'mithril';
import type User from 'flarum/common/models/User';

export interface SmallUserCardAttrs extends Mithril.Attributes {
  user: User;
  className?: string;
  editable?: boolean;
  controlsButtonClassName?: string;
}

export default class SmallUserCard extends UserCard {
  attrs!: SmallUserCardAttrs;

  //Overriding infoItems so that other extensions can separately add items to small cards
  infoItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();
    const user = this.attrs.user;

    items.add('joined', app.translator.trans('core.forum.user.joined_date_text', { ago: humanTime(user.joinTime()) }));

    return items;
  }
}
