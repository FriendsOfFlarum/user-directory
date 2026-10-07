import bootstrapForum from '@flarum/jest-config/src/bootstrap/forum';
import app from 'flarum/forum/app';

import { extractGroupIds, gambitFor } from '../../../../src/forum/utils/groupGambit';

beforeAll(() => {
  bootstrapForum();
  app.boot();
});

describe('gambitFor', () => {
  it('builds a group gambit from the localized key', () => {
    expect(gambitFor('5')).toBe('group:5');
  });
});

describe('extractGroupIds', () => {
  it('returns nothing for an empty query', () => {
    expect(extractGroupIds('')).toEqual([]);
  });

  it('reads the ids of every group gambit', () => {
    expect(extractGroupIds('group:4 group:5')).toEqual(['4', '5']);
  });

  it('reads a comma-separated list, dropping duplicates', () => {
    expect(extractGroupIds('group:4,5 group:4')).toEqual(['4', '5']);
  });

  it('ignores negated gambits, groups named rather than numbered, and free text', () => {
    expect(extractGroupIds('-group:3 group:Mods alice group:7')).toEqual(['7']);
  });

  it('round-trips with gambitFor', () => {
    expect(extractGroupIds(['4', '9'].map(gambitFor).join(' '))).toEqual(['4', '9']);
  });
});
