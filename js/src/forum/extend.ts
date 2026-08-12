import Extend from 'flarum/common/extenders';
import Text from './models/Text';

export default [
  new Extend.Store() //
    .add('fof-user-directory-text', Text),

  new Extend.Routes() //
    // Loaded on demand: the directory page and everything it pulls in (the
    // cards, the search field, the filters) is only needed once someone
    // actually visits /users.
    .add('fof_user_directory', '/users', () => import('./components/UserDirectoryPage')),
];
