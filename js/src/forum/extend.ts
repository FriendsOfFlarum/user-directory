import Extend from 'flarum/common/extenders';
import UserDirectoryPage from './components/UserDirectoryPage';
import Text from './models/Text';

export default [
  new Extend.Routes() //
    .add('fof_user_directory', '/users', UserDirectoryPage),

  new Extend.Store() //
    .add('fof-user-directory-text', Text),
];
