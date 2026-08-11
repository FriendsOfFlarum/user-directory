import app from 'flarum/forum/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import classList from 'flarum/common/utils/classList';
import type Mithril from 'mithril';
import UserDirectoryListItem from './UserDirectoryListItem';
import type UserDirectoryListState from '../states/UserDirectoryListState';

export interface IUserDirectoryListAttrs extends ComponentAttrs {
  state: UserDirectoryListState;
}

/**
 * Based on Flarum's DiscussionList.
 */
export default class UserDirectoryList<CustomAttrs extends IUserDirectoryListAttrs = IUserDirectoryListAttrs> extends Component<CustomAttrs> {
  view(): Mithril.Children {
    const state = this.attrs.state;

    const useSmallCards = app.forum.attribute<boolean>('userDirectorySmallCards');
    // The initial load has to count here too, otherwise the very first render
    // shows an empty list with no indication that anything is happening.
    const isLoading = state.isInitialLoading() || state.isLoadingNext();

    let loading;

    if (isLoading) {
      loading = <LoadingIndicator />;
    } else if (state.hasNext()) {
      loading = (
        <Button className="Button" onclick={state.loadNext.bind(state)}>
          {app.translator.trans('fof-user-directory.forum.page.load_more_button')}
        </Button>
      );
    }

    if (state.isEmpty()) {
      // Previously this used core's `DiscussionList` class, which was a
      // copy-paste leftover — nothing styles the empty state through it.
      return (
        <div className="UserDirectoryList">
          <Placeholder text={app.translator.trans('fof-user-directory.forum.page.empty_text')} />
        </div>
      );
    }

    const pageSize = state.pageSize ?? 20;

    return (
      <div
        className={classList('UserDirectoryList', {
          'UserDirectoryList--searchResults': state.isSearchResults(),
          'UserDirectoryList--small-cards': useSmallCards,
        })}
      >
        <ul role="feed" aria-busy={isLoading} className="UserDirectoryList-users">
          {state.getPages().map((page, pageNum) =>
            page.items.map((user, itemNum) => (
              <li key={user.id()} data-id={user.id()} role="article" aria-setsize={-1} aria-posinset={pageNum * pageSize + itemNum + 1}>
                <UserDirectoryListItem user={user} useSmallCards={useSmallCards} />
              </li>
            ))
          )}
        </ul>
        <div className="UserDirectoryList-loadMore">{loading}</div>
      </div>
    );
  }
}
