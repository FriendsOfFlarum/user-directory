import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('fof-user-directory', app => {
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('fof-user-directory', {
            icon: 'far fa-address-book',
            label: app.translator.trans('fof-user-directory.admin.permissions.view_user_directory'),
            permission: 'fof.user-directory.view',
            allowGuest: true,
        });
    });
});
