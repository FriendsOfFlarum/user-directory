export default class GroupFilter extends AbstractType {
    search(query: any): void;
    renderKind(): string | any[];
    renderLabel(group: any): any;
    applyFilter(params: any, group: any): void;
    initializeFromParams(params: any): Promise<any[]>;
}
import AbstractType from "./AbstractType";
