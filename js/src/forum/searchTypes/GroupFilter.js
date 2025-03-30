import app from 'flarum/forum/app';
import Group from 'flarum/common/models/Group';
import Icon from 'flarum/common/components/Icon';
import AbstractType from './AbstractType';

/* global m */

export default class GroupFilter extends AbstractType {
  resourceType() {
    return 'groups';
  }

  search(query) {
    this.suggestions = [];

    if (!query) {
      return;
    }

    query = query.toLowerCase();

    app.store.all('groups').forEach((group) => {
      // Do not allow Guest group as it wouldn't do anything
      if (group.id() === Group.GUEST_ID) {
        return;
      }

      if (group.nameSingular().toLowerCase().indexOf(query) !== -1 || group.namePlural().toLowerCase().indexOf(query) !== -1) {
        this.suggestions.push(group);
      }
    });
  }

  renderKind() {
    return app.translator.trans('fof-user-directory.forum.search.kinds.group');
  }

  renderLabel(group) {
    return m(
      '.UserDirectorySearchLabel',
      group.color()
        ? {
            className: 'colored',
            style: {
              backgroundColor: group.color(),
            },
          }
        : {},
      [
        group.icon()
          ? [
              Icon.component({
                name: group.icon(),
              }),
              ' ',
            ]
          : null,
        group.namePlural(),
      ]
    );
  }

  applyFilter(params, group) {
    params.q = params.q ? params.q + ' ' : '';
    params.q += 'group:' + group.id();
  }

  initializeFromParams(params) {
    if (!params.q) {
      return Promise.resolve([]);
    }

    const groups = [];

    // Extract all group: parameters from the query string
    const groupMatches = params.q.match(/\bgroup:(\d+)\b/g);

    if (!groupMatches || !groupMatches.length) {
      return Promise.resolve([]);
    }

    // Get all unique group IDs from all group: parameters
    const allGroupIds = [];
    groupMatches.forEach((match) => {
      const id = match.replace('group:', '');
      allGroupIds.push(id);
    });

    // Deduplicate group IDs
    const uniqueGroupIds = [...new Set(allGroupIds)];

    // Load all group models
    const promises = uniqueGroupIds.map((id) => {
      return app.store
        .find('groups', id)
        .then((group) => {
          if (group) groups.push(group);
          return group;
        })
        .catch((error) => {
          console.error('Error loading group:', id, error);
          return null;
        });
    });

    return Promise.all(promises).then(() => groups);
  }
}
