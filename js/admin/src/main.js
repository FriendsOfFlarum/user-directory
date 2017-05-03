import {extend} from "flarum/extend";
import app from "flarum/app";
import PermissionGrid from "flarum/components/PermissionGrid";

app.initializers.add('flagrow-user-directory', app => {
    // add the permission option to the relative pane
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('user-directory', {
            icon: 'address-book-o',
            label: app.translator.trans('flagrow-user-directory.admin.permissions.view_user_directory'),
            permission: 'flagrow.user-directory.view',
            allowGuest: true
        });
    });
});
