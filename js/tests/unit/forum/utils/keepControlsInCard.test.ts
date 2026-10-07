import ItemList from 'flarum/common/utils/ItemList';
import m from 'mithril';
import type Mithril from 'mithril';

import keepControlsInCard from '../../../../src/forum/utils/keepControlsInCard';

const Dropdown = { view: () => null };

describe('keepControlsInCard', () => {
  it("swaps the controls' header class for a card-local one, keeping the other attrs", () => {
    const items = new ItemList<Mithril.Children>();
    items.add('controls', m(Dropdown, { className: 'App-primaryControl', icon: 'fas fa-ellipsis-v' }));

    const controls = keepControlsInCard(items).get('controls') as Mithril.Vnode<Record<string, unknown>>;

    expect(controls.attrs).toEqual({ className: 'UserCard-controlsDropdown', icon: 'fas fa-ellipsis-v' });
  });

  it('leaves a list without controls untouched', () => {
    const other = m(Dropdown, { className: 'App-primaryControl' });
    const items = new ItemList<Mithril.Children>();
    items.add('other', other);

    keepControlsInCard(items);

    expect(items.has('controls')).toBe(false);
    expect(items.get('other')).toBe(other);
    expect(other.attrs).toEqual({ className: 'App-primaryControl' });
  });
});
