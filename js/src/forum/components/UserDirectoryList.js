import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import UserDirectoryListItem from './UserDirectoryListItem';

/**
 * Based on Flarum's DiscussionList
 */
export default class UserDirectoryList extends Component {
  view() {
    const { state } = this.attrs;

    const params = state.getParams();
    const useSmallCards = app.forum.attribute('userDirectorySmallCards');
    let loading;

    if (state.isLoadingNext()) {
      loading = LoadingIndicator.component();
    } else if (state.hasNext()) {
      loading = Button.component(
        {
          className: 'Button',
          onclick: () => state.loadNext(),
        },
        app.translator.trans('fof-user-directory.forum.page.load_more_button')
      );
    }

    if (state.isEmpty()) {
      const text = app.translator.trans('fof-user-directory.forum.page.empty_text');
      return <div className="DiscussionList">{Placeholder.component({ text })}</div>;
    }

    // Get all users from paginated pages
    const allUsers = state.getAllItems();

    return (
      <div
        className={
          'UserDirectoryList' +
          (state.isSearchResults() ? ' UserDirectoryList--searchResults' : '') +
          (useSmallCards ? ' UserDirectoryList--small-cards' : '')
        }
      >
        <ul className="UserDirectoryList-users">
          {allUsers.map((user) => {
            return (
              <li key={user.id()} data-id={user.id()}>
                {UserDirectoryListItem.component({ user, params, useSmallCards })}
              </li>
            );
          })}
        </ul>
        <div className="UserDirectoryList-loadMore">{loading}</div>
      </div>
    );
  }
}
