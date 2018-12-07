import {extend} from 'flarum/extend';
import UserDirectoryPage from './components/UserDirectoryPage';
import UsersSearchSource from 'flarum/components/UsersSearchSource';
import LinkButton from 'flarum/components/LinkButton';

app.initializers.add('flagrow-user-directory', function(app) {
    app.routes.flagrow_user_directory = {path: '/users', component: UserDirectoryPage.component()};

    extend(UsersSearchSource.prototype, 'view', function (view, query) {
        query = query.toLowerCase();
        let searchUserOnPage = (
            <li>
                {LinkButton.component({
                    icon: 'search',
                    children: app.translator.trans('flagrow-user-directory.forum.search.users_heading', {query}),
                    href: app.route('flagrow_user_directory', {q: query})
                })}
            </li>
        )

        if (view) {
            view.splice(1, 0, searchUserOnPage);
        }
    })
});
