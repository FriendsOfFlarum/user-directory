import app from 'flarum/forum/app';
import Group from 'flarum/common/models/Group';
import icon from 'flarum/common/helpers/icon';
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
      [group.icon() ? [icon(group.icon()), ' '] : null, group.namePlural()]
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

    app.store.all('groups').forEach((group) => {
      if (qWithSpacesAround.indexOf('group:' + group.id()) !== -1) {
        groups.push(group);
      }
    });

    return Promise.resolve(groups);
  }
}
