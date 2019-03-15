import app from 'flarum/app';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Placeholder from 'flarum/components/Placeholder';
import UserDirectoryListItem from './UserDirectoryListItem';

/**
 * The `DiscussionList` component displays a list of discussions.
 *
 * ### Props
 *
 * - `params` A map of parameters used to construct a refined parameter object
 *   to send along in the API request to get discussion results.
 */
export default class UserDirectoryList extends Component {
  init() {
    /**
     * Whether or not discussion results are loading.
     *
     * @type {Boolean}
     */
    this.loading = true;

    /**
     * Whether or not there are more results that can be loaded.
     *
     * @type {Boolean}
     */
    this.moreResults = false;

    /**
     * The users in the user directory list.
     *
     * @type {User[]}
     */
    this.users = [];

    this.refresh();
  }

  view() {
    const params = this.props.params;
    let loading;

    if (this.loading) {
      loading = LoadingIndicator.component();
    } else if (this.moreResults) {
      loading = Button.component({
        children: app.translator.trans('core.forum.discussion_list.load_more_button'),
        className: 'Button',
        onclick: this.loadMore.bind(this)
      });
    }

    if (this.users.length === 0 && !this.loading) {
      const text = app.translator.trans('core.forum.discussion_list.empty_text');
      return (
        <div className="DiscussionList">
          {Placeholder.component({text})}
        </div>
      );
    }

    return (
      <div className="UserDirectoryList">
          {this.users.map(user => {
            return (
              <div key={user.username()} data-id={user.username()}>
                {UserDirectoryListItem.component({user, params})}
              </div>
            );
          })}
        <div className="UserDirectoryList-loadMore">
          {loading}
        </div>
      </div>
    );
  }

  /**
   * Get the parameters that should be passed in the API request to get
   * discussion results.
   *
   * @return {Object}
   * @api
   */
  requestParams() {
    const params = {include: [], filter: {}};

    params.sort = this.sortMap()[this.props.params.sort];

    if (this.props.params.q) {
      params.filter.q = this.props.params.q;
    }

    return params;
  }

  /**
   * Get a map of sort keys (which appear in the URL, and are used for
   * translation) to the API sort value that they represent.
   *
   * @return {Object}
   */
  sortMap() {
    const map = {};

    if (this.props.params.q) {
      map.relevance = '';
    } else {
        map.default = '';
    }
    map.username_az = 'username';
    map.username_za = '-username';
    map.newest = '-joinedAt';
    map.oldest = 'joinedAt';
    map.seen_recent = '-lastSeenAt';
    map.seen_oldest = 'lastSeenAt';
    map.most_discussions = '-discussionCount';
    map.least_discussions = 'discussionCount';

    return map;
  }

  /**
   * Clear and reload the discussion list.
   *
   * @public
   */
  refresh(clear = true) {
    if (clear) {
      this.loading = true;
      this.users = [];
    }

    return this.loadResults(0).then(
      results => {
        this.users = [];
        this.parseResults(results);
      },
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }

  /**
   * Load a new page of discussion results.
   *
   * @param {Integer} offset The index to start the page at.
   * @return {Promise}
   */
  loadResults(offset) {
    const preloadedUsers = app.preloadedApiDocument();

    if (preloadedUsers) {
      return m.deferred().resolve(preloadedUsers).promise;
    }

    const params = this.requestParams();
    params.page = {offset};
    params.include = params.include.join(',');

    return app.store.find('users', params);
  }

  /**
   * Load the next page of discussion results.
   *
   * @public
   */
  loadMore() {
    this.loading = true;

    this.loadResults(this.users.length)
      .then(this.parseResults.bind(this));
  }

  /**
   * Parse results and append them to the discussion list.
   *
   * @param {Discussion[]} results
   * @return {Discussion[]}
   */
  parseResults(results) {
    [].push.apply(this.users, results);

    this.loading = false;
    this.moreResults = !!results.payload.links.next;

    m.lazyRedraw();

    return results;
  }

  /**
   * Remove a discussion from the list if it is present.
   *
   * @param {Discussion} discussion
   * @public
   */
  removeUser(user) {
    const index = this.users.indexOf(user);

    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  /**
   * Add a discussion to the top of the list.
   *
   * @param {Discussion} discussion
   * @public
   */
  addUser(user) {
    this.users.unshift(user);
  }
}
