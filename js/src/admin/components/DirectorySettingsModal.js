import SettingsModal from 'flarum/components/SettingsModal';
import { settings } from '@fof-components';

const {
    items: { BooleanItem },
} = settings;

export default class AuthSettingsModal extends SettingsModal {
    title() {
        return app.translator.trans('fof-user-directory.admin.settings.title');
    }

    className() {
        return 'UserDirectorySettingsModal Modal Modal--medium';
    }

    form() {
        return [
            BooleanItem.component(
                {
                    name: 'fof-user-directory-link',
                    setting: this.setting.bind(this),
                },
                app.translator.trans('fof-user-directory.admin.settings.link')
            ),
        ];
    }
}
