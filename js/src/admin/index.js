import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('flagrow-user-directory', app => {
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('flagrow-user-directory', {
            icon: 'far fa-address-book',
            label: app.translator.trans('flagrow-user-directory.admin.permissions.view_user_directory'),
            permission: 'flagrow.user-directory.view',
            allowGuest: true,
        });
    });
});
