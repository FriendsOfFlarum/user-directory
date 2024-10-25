import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';
import SortMap from '../common/utils/SortMap';

export default [
    new Extend.Admin()
        .setting(() => ({
            setting: 'fof-user-directory-link',
            label: app.translator.trans('fof-user-directory.admin.settings.link'),
            type: 'boolean',
        }))
        .setting(() => ({
            setting: 'fof-user-directory.use-small-cards',
            label: app.translator.trans('fof-user-directory.admin.settings.use-small-cards'),
            type: 'boolean',
        }))
        .setting(() => ({
            setting: 'fof-user-directory.disable-global-search-source',
            label: app.translator.trans('fof-user-directory.admin.settings.disable-global-search-source'),
            type: 'boolean',
        }))
        .setting(() => ({
            setting: 'fof-user-directory.link-group-mentions',
            label: app.translator.trans('fof-user-directory.admin.settings.link-group-mentions'),
            type: 'boolean',
        }))
        .setting(() => {
            const sortOptions = {
                '': app.translator.trans('fof-user-directory.lib.sort.not_specified'),
            };

            Object.keys(new SortMap().sortMap()).forEach((sort) => {
                sortOptions[sort] = app.translator.trans('fof-user-directory.lib.sort.' + sort);
            });

            return ({
                setting: 'fof-user-directory.default-sort',
                label: app.translator.trans('fof-user-directory.admin.settings.default-sort'),
                options: sortOptions,
                type: 'select',
                default: '',
            })
        })
        .permission(() => (
            {
                icon: 'far fa-address-book',
                label: app.translator.trans('fof-user-directory.admin.permissions.view_user_directory'),
                permission: 'fof.user-directory.view',
                allowGuest: true,
            }),
            'view'
        ),
];
