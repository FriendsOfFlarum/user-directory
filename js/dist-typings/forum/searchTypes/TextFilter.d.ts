export default class TextFilter extends AbstractType {
    search(query: any): void;
    renderKind(): string | any[];
    renderLabel(resource: any): any;
    applyFilter(params: any, resource: any): void;
    initializeFromParams(params: any): Promise<any>;
}
import AbstractType from "./AbstractType";
