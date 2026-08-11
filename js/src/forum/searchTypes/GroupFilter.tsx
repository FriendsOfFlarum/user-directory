import app from 'flarum/forum/app';
import Group from 'flarum/common/models/Group';
import Icon from 'flarum/common/components/Icon';
import type Mithril from 'mithril';
import AbstractType, { type FilterParams } from './AbstractType';
import { extractGroupIds, gambitFor } from '../utils/groupGambit';

/**
 * Matches groups by name, filtering the directory with a `group:` gambit.
 */
export default class GroupFilter extends AbstractType<Group> {
  resourceType(): string {
    return 'groups';
  }

  search(query: string): void {
    this.suggestions = [];

    if (!query) {
      return;
    }

    const needle = query.toLowerCase();

    this.suggestions = app.store.all<Group>('groups').filter((group) => {
      // The guest group would never match a real user.
      if (group.id() === Group.GUEST_ID) {
        return false;
      }

      return [group.nameSingular(), group.namePlural()].some((name) => name.toLowerCase().includes(needle));
    });
  }

  renderKind(): Mithril.Children {
    return app.translator.trans('fof-user-directory.forum.search.kinds.group');
  }

  renderLabel(group: Group): Mithril.Children {
    const color = group.color();
    const icon = group.icon();

    return (
      <div className={`UserDirectorySearchLabel${color ? ' colored' : ''}`} style={color ? { backgroundColor: color } : undefined}>
        {icon ? <Icon name={icon} /> : null}
        {icon ? ' ' : null}
        {group.namePlural()}
      </div>
    );
  }

  applyFilter(params: FilterParams, group: Group): void {
    params.q = params.q ? `${params.q} ` : '';
    params.q += gambitFor(group.id()!);
  }

  initializeFromParams(params: FilterParams): Promise<Group[]> {
    const ids = extractGroupIds(params.q ?? '');

    if (!ids.length) {
      return Promise.resolve([]);
    }

    return Promise.all(
      ids.map(
        (id): Promise<Group | null> =>
          app.store
            .find<Group>('groups', id)
            // A group referenced in the URL may since have been deleted; drop
            // it rather than failing the whole field.
            .catch(() => null)
      )
    ).then((groups) => groups.filter((group): group is Group => group !== null));
  }
}
