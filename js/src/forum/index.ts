import app from 'flarum/forum/app';

import UserDirectoryPage from './components/UserDirectoryPage';
import UserDirectoryList from './components/UserDirectoryList';
import UserDirectoryListItem from './components/UserDirectoryListItem';
import UserDirectoryState from './states/UserDirectoryState';
import SortMap from '../common/utils/SortMap';
import CheckableButton from './components/CheckableButton';

import extendCommentPost from './extenders/extendCommentPost';
import extendUsersSearchSource from './extenders/extendUsersSearchSource';
import extendIndexPage from './extenders/extendIndexPage';

export { default as extend } from './extend';

// Allow other extensions to extend the page.
// Removing this and using the usual export ./components will break integrations using these, so they must stay for now.
// TODO: Remove in Flarum 2.0
export { UserDirectoryPage, UserDirectoryList, UserDirectoryListItem, UserDirectoryState, SortMap, CheckableButton };

app.initializers.add('fof-user-directory', function () {
  extendCommentPost();
  extendUsersSearchSource();
  extendIndexPage();
});

export * from './components';
export * from './searchTypes';
