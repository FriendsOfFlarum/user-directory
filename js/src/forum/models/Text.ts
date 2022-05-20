import Model from 'flarum/common/Model';

/**
 * Special model used only client-side to hold a free text search value in the search field
 */
export default class Text extends Model {
  text = Model.attribute('text');
}
