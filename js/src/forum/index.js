import {extend} from 'flarum/extend';
import app from 'flarum/app';
import UsersSearchSource from 'flarum/components/UsersSearchSource';
import LinkButton from 'flarum/components/LinkButton';
import IndexPage from 'flarum/components/IndexPage';
import UserDirectoryPage from './components/UserDirectoryPage';
import Text from './models/Text';

// Allow other extensions to extend the page
export {UserDirectoryPage}; // Backward compatibility for when the component was placed at the root of the export
export * from './components';
export * from './searchTypes';

app.initializers.add('fof-user-directory', app => {
    app.routes.fof_user_directory = {path: '/users', component: UserDirectoryPage.component()};

    app.store.models['fof-user-directory-text'] = Text;

    extend(UsersSearchSource.prototype, 'view', function (view, query) {
        if (!view) {
            return;
        }

        query = query.toLowerCase();

        view.splice(1, 0, <li>
            {LinkButton.component({
                icon: 'fas fa-search',
                children: app.translator.trans('fof-user-directory.forum.search.users_heading', {query}),
                href: app.route('fof_user_directory', {q: query}),
            })}
        </li>);
    });

    extend(IndexPage.prototype, 'navItems', items => {
        if (app.forum.attribute('canSeeUserDirectoryLink')) {
            items.add('fof-user-directory',
                LinkButton.component({
                    href: app.route('fof_user_directory'),
                    children: app.translator.trans('fof-user-directory.forum.page.nav'),
                    icon: 'far fa-address-book'
                }),
                85
            );
        }
    });
});
