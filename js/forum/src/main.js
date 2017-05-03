import UserDirectoryPage from 'flagrow/user-directory/components/UserDirectoryPage';

app.initializers.add('flagrow-user-directory', function(app) {
    app.routes.user_directory = {path: '/user-directory', component: UserDirectoryPage.component()};
});
