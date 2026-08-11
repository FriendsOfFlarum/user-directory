import Group from 'flarum/common/models/Group';
import type Mithril from 'mithril';
import AbstractType, { type FilterParams } from './AbstractType';
/**
 * Matches groups by name, filtering the directory with a `group:` gambit.
 */
export default class GroupFilter extends AbstractType<Group> {
    resourceType(): string;
    search(query: string): void;
    renderKind(): Mithril.Children;
    renderLabel(group: Group): Mithril.Children;
    applyFilter(params: FilterParams, group: Group): void;
    initializeFromParams(params: FilterParams): Promise<Group[]>;
}
