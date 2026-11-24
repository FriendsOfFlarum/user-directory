import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import { jest } from '@jest/globals';

import UserDirectoryListState from '../../../../src/forum/states/UserDirectoryListState';

beforeAll(() => {
  bootstrapForum();
  app.boot();
});

afterEach(() => {
  jest.restoreAllMocks();
});

function usersDocument(count: number, meta: Record<string, any>) {
  return {
    data: Array.from({ length: count }, (_, i) => ({ type: 'users', id: String(i + 1), attributes: { username: `user${i + 1}` } })),
    links: { next: '/api/users?page[offset]=' + count },
    meta,
  };
}

describe('UserDirectoryListState with a server-rendered first page', () => {
  // The users endpoint's limit can be configured to something other than 20.
  it.each([
    ['meta.page.limit', { page: { limit: 10, offset: 0, total: 30 } }, 10],
    ['meta.perPage', { perPage: 10 }, 10],
    ['no page meta', {}, UserDirectoryListState.DEFAULT_PAGE_SIZE],
  ])('takes the page size from %s', async (_label, meta, expected) => {
    app.data.apiDocument = usersDocument(10, meta);
    jest.spyOn(app, 'preloadedApiDocument').mockImplementation(() => {
      const document = app.data.apiDocument;
      app.data.apiDocument = null;

      return document ? app.store.pushPayload(document) : null;
    });

    const find = jest.spyOn(app.store, 'find').mockResolvedValue(Object.assign([], { payload: { data: [], links: {}, meta } }) as never);

    const state = new UserDirectoryListState({ sort: 'default' });
    await state.refresh();

    expect(state.pageSize).toBe(expected);

    await state.loadNext();

    expect(find).toHaveBeenCalledTimes(1);
    expect((find.mock.calls[0][1] as any).page).toEqual({ offset: expected, limit: expected });
  });
});
