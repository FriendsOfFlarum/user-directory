import app from 'flarum/forum/app';
import type Mithril from 'mithril';
import AbstractType, { type FilterParams } from './AbstractType';
import type Text from '../models/Text';

/**
 * Matches free text, i.e. anything that is not a recognised gambit.
 */
export default class TextFilter extends AbstractType<Text> {
  resourceType(): string {
    return 'fof-user-directory-text';
  }

  search(query: string): void {
    if (!query) {
      this.suggestions = [];

      return;
    }

    this.suggestions = [this.createRecord(query)];
  }

  renderKind(): Mithril.Children {
    return app.translator.trans('fof-user-directory.forum.search.kinds.text');
  }

  renderLabel(resource: Text): Mithril.Children {
    return <div className="UserDirectorySearchLabel">{resource.text()}</div>;
  }

  applyFilter(params: FilterParams, resource: Text): void {
    params.q = params.q ? `${params.q} ` : '';
    params.q += resource.text();
  }

  initializeFromParams(params: FilterParams): Promise<Text[]> {
    if (!params.q) {
      return Promise.resolve([]);
    }

    return Promise.resolve(
      params.q
        .split(' ')
        // Words containing a colon are gambits, which other filters handle.
        .filter((word) => word !== '' && !word.includes(':'))
        .map((word) => this.createRecord(word))
    );
  }

  private createRecord(text: string): Text {
    return app.store.createRecord<Text>('fof-user-directory-text', {
      attributes: { text },
    });
  }
}
