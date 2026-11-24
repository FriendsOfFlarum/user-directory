import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';
import { jest } from '@jest/globals';
import { BooleanGambit } from 'flarum/common/query/IGambit';
import type { ApiPayloadPlural } from 'flarum/common/Store';

import UserDirectoryListState from '../../../../src/forum/states/UserDirectoryListState';

class SuspendedGambit extends BooleanGambit {
  key() {
    return 'suspended';
  }

  filterKey() {
    return 'suspended';
  }
}

// Stands in for a gambit the actor may not use, such as Suspend's for members.
class UnavailableGambit extends SuspendedGambit {
  key() {
    return 'hidden';
  }

  filterKey() {
    return 'hidden';
  }

  enabled() {
    return false;
  }
}

beforeAll(() => {
  bootstrapForum();
  app.boot();
  app.search.gambits.gambits.users.push(SuspendedGambit, UnavailableGambit);
});

// Core's preloadedApiDocument() hands the document over once, on the first route.
function preload(document: ApiPayloadPlural) {
  app.initialRoute = window.location.href;
  app.data.apiDocument = document;
}

afterEach(() => {
  jest.restoreAllMocks();
});

function usersDocument(count: number, meta: ApiPayloadPlural['meta']): ApiPayloadPlural {
  return {
    data: Array.from({ length: count }, (_, i) => ({ type: 'users', id: String(i + 1), attributes: { username: `user${i + 1}` } })),
    links: { first: '/api/users', next: '/api/users?page[offset]=' + count },
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
    preload(usersDocument(10, meta));

    const find = jest.spyOn(app.store, 'find').mockResolvedValue(Object.assign([], { payload: { data: [], links: {}, meta } }) as never);

    const state = new UserDirectoryListState({ sort: 'default' });
    await state.refresh();

    expect(state.pageSize).toBe(expected);

    await state.loadNext();

    expect(find).toHaveBeenCalledTimes(1);
    expect((find.mock.calls[0][1] as any).page).toEqual({ offset: expected, limit: expected });
  });
});

// The server-rendered page applies only the group gambit; any other gambit in
// the query reached the API there as plain text.
describe('UserDirectoryListState with a gambit in the server-rendered query', () => {
  it.each([
    ['is:suspended', true],
    ['bob is:suspended', true],
    ['-is:suspended', true],
    ['group:5 is:suspended', true],
    ['group:5', false],
    ['-group:5 bob', false],
    ['bob', false],
    ['is:hidden', false],
  ])('for "%s", requests the first page again: %s', async (q, requested) => {
    preload(usersDocument(3, { page: { limit: 10, offset: 0 } }));
    const find = jest
      .spyOn(app.store, 'find')
      .mockResolvedValue(Object.assign([], { payload: { data: [], links: {}, meta: { page: { limit: 10 } } } }) as never);

    const state = new UserDirectoryListState({});
    await state.refreshParams({ q, sort: 'default' }, 1);

    expect(state.getPages()[0].items.length).toBe(requested ? 0 : 3);
    expect(find).toHaveBeenCalledTimes(requested ? 1 : 0);

    if (requested) {
      const params = find.mock.calls[0][1] as any;

      expect(params.filter.q).toBe(q);
      expect(params.page).toEqual({ offset: 0, limit: 10 });
    }
  });
});
