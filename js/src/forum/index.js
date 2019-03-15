import {extend} from 'flarum/extend';
import app from 'flarum/app';
import UsersSearchSource from 'flarum/components/UsersSearchSource';
import LinkButton from 'flarum/components/LinkButton';
import UserDirectoryPage from './components/UserDirectoryPage';

app.initializers.add('flagrow-user-directory', app => {
    app.routes.flagrow_user_directory = {path: '/users', component: UserDirectoryPage.component()};

    extend(UsersSearchSource.prototype, 'view', function (view, query) {
        if (!view) {
            return;
        }

        query = query.toLowerCase();

        view.splice(1, 0, <li>
            {LinkButton.component({
                icon: 'fas fa-search',
                children: app.translator.trans('flagrow-user-directory.forum.search.users_heading', {query}),
                href: app.route('flagrow_user_directory', {q: query}),
            })}
        </li>);
    })
});
