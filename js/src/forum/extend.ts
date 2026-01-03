import Extend from 'flarum/common/extenders';
import Text from './models/Text';

export default [
  new Extend.Store() //
    .add('fof-user-directory-text', Text),

  new Extend.Routes() //
    .add('fof_user_directory', '/users', () => import('./components/UserDirectoryPage')),
];
