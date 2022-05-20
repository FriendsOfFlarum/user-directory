import UserCard from 'flarum/forum/components/UserCard';
import ItemList from 'flarum/common/utils/ItemList';
import humanTime from 'flarum/common/utils/humanTime';

export default class SmallUserCard extends UserCard {
  //Overriding infoItems so that other extensions can separately add items to small cards
  infoItems() {
    const items = new ItemList();
    const user = this.attrs.user;

    items.add('joined', app.translator.trans('core.forum.user.joined_date_text', { ago: humanTime(user.joinTime()) }));

    return items;
  }
}
