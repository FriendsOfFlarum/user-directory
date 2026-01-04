import Extend from 'flarum/common/extenders';
import Text from './models/Text';
import UserDirectoryPage from './components/UserDirectoryPage';

export default [
  new Extend.Store() //
    .add('fof-user-directory-text', Text),

  new Extend.Routes() //
    // We don't code split this yet because it's fiddly with commonjs to import dynamically
    // on the forum side, but normally on the admin side.
    .add('fof_user_directory', '/users', UserDirectoryPage),
];
