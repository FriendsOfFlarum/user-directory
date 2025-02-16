import app from 'flarum/forum/app';
import extendCommentPost from './extenders/extendCommentPost';
import extendUsersSearchSource from './extenders/extendUsersSearchSource';
import extendIndexPage from './extenders/extendIndexPage';

export { default as extend } from './extend';

app.initializers.add('fof-user-directory', function () {
  extendCommentPost();
  extendUsersSearchSource();
  extendIndexPage();
});
