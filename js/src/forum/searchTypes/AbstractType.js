/**
 * @abstract
 */
export default class AbstractType {
  constructor() {
    this.suggestions = [];
    this.loading = false;
  }

  /**
   * The `type` property of the Models used in suggestions and applied filters for this type
   * @return {String}
   */
  resourceType() {
    //
  }

  /**
   * Executed when the search query changes
   * The method should update this.suggestions with the new results
   * If asynchronous loading is used, this.loading should be set to true during the process
   * @param {String} query
   */
  search(query) {
    //
  }

  /**
   * Renders the "kind" label next to the value indicating what kind of information that result is
   * Should probably just be a translated text
   * @param {Model} resource
   * @return {vnode}
   */
  renderKind(resource) {
    //
  }

  /**
   * Renders the Label containing the suggestion's value
   * Should be a vdom template using the .UserDirectorySearchLabel class or similar
   * @param {Model} resource
   * @return {vnode}
   */
  renderLabel(resource) {
    //
  }

  /**
   * Applies a filter on a params object to use in the page request
   * @param {Object} params Object. Might or might not contain a `q` property or `sort` property. In the future, `filters` object might be supported
   * @param {Model} resource
   */
  applyFilter(params, resource) {
    //
  }

  /**
   * Used to populate the search field on page load with values from the querystring
   * A promise must be returned, and the UI will auto-update once the promise returns
   * @param {Object} params Object with a `q` and `sort` property. `filters` might be supported in the future
   * @return {Promise<Model[]>}
   */
  initializeFromParams(params) {
    //
  }
}
