import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';

/**
 * Core's UserCard marks its controls dropdown `App-primaryControl`, which on
 * phones pins it to the right of the header — right for the one card on a
 * profile page, but the directory renders a card per user, so every card's
 * menu would stack on top of the header's own primary control.
 */
export default function keepControlsInCard(items: ItemList<Mithril.Children>): ItemList<Mithril.Children> {
  if (items.has('controls')) {
    const controls = items.get('controls') as Mithril.Vnode<{ className?: string }>;

    controls.attrs = { ...controls.attrs, className: 'UserCard-controlsDropdown' };
  }

  return items;
}
