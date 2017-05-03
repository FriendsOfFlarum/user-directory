"use strict";

System.register("flagrow/user-directory/main", ["flarum/extend", "flarum/app", "flarum/components/PermissionGrid"], function (_export, _context) {
    "use strict";

    var extend, app, PermissionGrid;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsPermissionGrid) {
            PermissionGrid = _flarumComponentsPermissionGrid.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-user-directory', function (app) {
                // add the permission option to the relative pane
                extend(PermissionGrid.prototype, 'viewItems', function (items) {
                    items.add('user-directory', {
                        icon: 'address-book-o',
                        label: app.translator.trans('flagrow-user-directory.admin.permissions.view_user_directory'),
                        permission: 'flagrow.user-directory.view',
                        allowGuest: true
                    });
                });
            });
        }
    };
});