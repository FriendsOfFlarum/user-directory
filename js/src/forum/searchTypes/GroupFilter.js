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

    const qWithSpacesAround = ' ' + params.q + ' ';

    const groups = [];

    const queryGroups = qWithSpacesAround.split(' ').filter((q) => q.startsWith('group:'));

    app.store.all('groups').forEach((group) => {
      queryGroups.forEach((queryGroup) => {
        const groupIds = queryGroup.replace('group:', '').split(',');
        if (groupIds.includes(group.id())) {
          groups.push(group);
        }
      });
    });

    return Promise.resolve(groups);
  }
}
