import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import { makeUser } from '@flarum/jest-config/factory';
import app from 'flarum/forum/app';
import UserCard from 'flarum/forum/components/UserCard';
import type User from 'flarum/common/models/User';
import mq from 'mithril-query';

import UserDirectoryUserCard from '../../../../src/forum/components/UserDirectoryUserCard';
import SmallUserCard from '../../../../src/forum/components/SmallUserCard';

beforeAll(() => {
  bootstrapForum();
  app.boot();
});

function user(attributes: Record<string, unknown> = {}): User {
  return app.store.pushPayload<User>({ data: makeUser({ id: '2', attributes: { discussionCount: 2, commentCount: 5, ...attributes } }) } as any);
}

const attrs = (u: User) => ({ user: u, className: 'UserCard--directory', controlsButtonClassName: 'Button Button--icon Button--flat' });

describe('directory user cards', () => {
  // Phones pin `App-primaryControl` into the header, which is what put every
  // card's menu on top of the "start discussion" button.
  it("core's card marks its controls as the header's primary control", () => {
    expect(mq(UserCard, attrs(user({ canEdit: true })))).toHaveElement('.UserCard-controls .App-primaryControl');
  });

  it.each([
    ['UserDirectoryUserCard', UserDirectoryUserCard],
    ['SmallUserCard', SmallUserCard],
  ])('%s keeps its controls inside the card', (_name, Card) => {
    const card = mq(Card, attrs(user({ canEdit: true })));

    expect(card).toHaveElement('.UserCard-controls .Dropdown.UserCard-controlsDropdown');
    expect(card).toHaveElement('.UserCard-controls .Dropdown-toggle.Button--icon');
    expect(card).not.toHaveElement('.App-primaryControl');
  });

  it('renders no controls for a user the actor cannot act on', () => {
    const card = mq(UserDirectoryUserCard, attrs(user({ canEdit: false })));

    expect(card).not.toHaveElement('.UserCard-controls .Dropdown');
  });

  it('adds the discussion and post counts to the full-size card', () => {
    const card = mq(UserDirectoryUserCard, attrs(user()));

    expect(card).toHaveElement('.UserCard-info .item-discussion-count');
    expect(card).toHaveElement('.UserCard-info .item-comment-count');
  });

  it('keeps the small card to the join date', () => {
    const card = mq(SmallUserCard, attrs(user()));

    expect(card).toHaveElement('.UserCard-info .item-joined');
    expect(card).not.toHaveElement('.UserCard-info .item-discussion-count');
  });
});
