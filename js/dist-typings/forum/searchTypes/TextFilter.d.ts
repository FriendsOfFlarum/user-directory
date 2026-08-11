import type Mithril from 'mithril';
import AbstractType, { type FilterParams } from './AbstractType';
import type Text from '../models/Text';
/**
 * Matches free text, i.e. anything that is not a recognised gambit.
 */
export default class TextFilter extends AbstractType<Text> {
    resourceType(): string;
    search(query: string): void;
    renderKind(): Mithril.Children;
    renderLabel(resource: Text): Mithril.Children;
    applyFilter(params: FilterParams, resource: Text): void;
    initializeFromParams(params: FilterParams): Promise<Text[]>;
    private createRecord;
}
