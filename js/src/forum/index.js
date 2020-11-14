import { extend } from 'flarum/extend';
import app from 'flarum/app';
import UsersSearchSource from 'flarum/components/UsersSearchSource';
import LinkButton from 'flarum/components/LinkButton';
import IndexPage from 'flarum/components/IndexPage';
import UserDirectoryPage from './components/UserDirectoryPage';
import UserDirectoryList from './components/UserDirectoryList';
import UserDirectoryListItem from './components/UserDirectoryListItem';
import UserDirectoryState from './states/UserDirectoryState';
import SortMap from '../common/utils/SortMap';

// Allow other extensions to extend the page
export { UserDirectoryPage, UserDirectoryList, UserDirectoryListItem, UserDirectoryState, SortMap };

app.initializers.add('fof-user-directory', (app) => {
    app.routes.fof_user_directory = {
        path: '/users',
        component: UserDirectoryPage,
    };

    extend(UsersSearchSource.prototype, 'view', function (view, query) {
        if (!view) {
            return;
        }

        query = query.toLowerCase();

        view.splice(
            1,
            0,
            m(
                'li',
                LinkButton.component(
                    {
                        href: app.route('fof_user_directory', { q: query }),
                        icon: 'fas fa-search',
                    },
                    app.translator.trans('fof-user-directory.forum.search.users_heading', { query })
                )
            )
        );
    });

    extend(IndexPage.prototype, 'navItems', (items) => {
        if (app.forum.attribute('canSeeUserDirectoryLink')) {
            items.add(
                'fof-user-directory',
                LinkButton.component(
                    {
                        href: app.route('fof_user_directory'),
                        icon: 'far fa-address-book',
                    },
                    app.translator.trans('fof-user-directory.forum.page.nav')
                ),
                85
            );
        }
    });
});
