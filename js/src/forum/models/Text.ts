import Model from 'flarum/common/Model';

/**
 * Client-side only model holding a free text search value in the search field.
 */
export default class Text extends Model {
  text() {
    return Model.attribute<string>('text').call(this);
  }
}
