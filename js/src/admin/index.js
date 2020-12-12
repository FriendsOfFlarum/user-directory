import app from 'flarum/app';
import SortMap from '../common/utils/SortMap';

export { SortMap };

app.initializers.add('fof-user-directory', (app) => {
    const sortOptions = {
        '': app.translator.trans('fof-user-directory.lib.sort.not_specified'),
    };

    Object.keys(new SortMap().sortMap()).forEach((sort) => {
        sortOptions[sort] = app.translator.trans('fof-user-directory.lib.sort.' + sort);
    });

    app.extensionData.for('fof-user-directory')
        .registerSetting(
            {
                setting: 'fof-user-directory-link',
                label: app.translator.trans('fof-user-directory.admin.settings.link'),
                type: 'boolean',
            }
        )
        .registerSetting(
            {
                setting: 'fof-user-directory.default-sort',
                label: app.translator.trans('fof-user-directory.admin.settings.default-sort'),
                options: sortOptions,
                type: 'select',
                default: '',
            }
        )
        .registerPermission(
            {
                icon: 'far fa-address-book',
                label: app.translator.trans('fof-user-directory.admin.permissions.view_user_directory'),
                permission: 'fof.user-directory.view',
                allowGuest: true,
            },
            'view'
        );
});
