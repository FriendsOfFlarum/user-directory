import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';
import SettingsModal from '@fof/components/admin/settings/SettingsModal';
import BooleanItem from '@fof/components/admin/settings/items/BooleanItem';

app.initializers.add('fof-user-directory', app => {
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('fof-user-directory', {
            icon: 'far fa-address-book',
            label: app.translator.trans('fof-user-directory.admin.permissions.view_user_directory'),
            permission: 'fof.user-directory.view',
            allowGuest: true,
        });
    });

    app.extensionSettings['fof-user-directory'] = () =>
        app.modal.show(
            new SettingsModal({
                title: app.translator.trans('fof-user-directory.admin.settings.title'),
                size: 'medium',
                items: [
                    <BooleanItem key="fof-user-directory-link">
                        {app.translator.trans('fof-user-directory.admin.settings.link')}
                    </BooleanItem>,
                ],
            })
        );
});
