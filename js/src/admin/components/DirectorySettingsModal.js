import SettingsModal from 'flarum/components/SettingsModal';
import { settings } from '@fof-components';
import SortMap from '../../common/utils/SortMap';

const {
    items: { BooleanItem, SelectItem },
} = settings;

export default class AuthSettingsModal extends SettingsModal {
    title() {
        return app.translator.trans('fof-user-directory.admin.settings.title');
    }

    className() {
        return 'UserDirectorySettingsModal Modal Modal--medium';
    }

    form() {
        const sortOptions = {
            '': app.translator.trans('fof-user-directory.lib.sort.not_specified'),
        };

        Object.keys(new SortMap().sortMap()).forEach((sort) => {
            sortOptions[sort] = app.translator.trans('fof-user-directory.lib.sort.' + sort);
        });

        return [
            <div className="Form-group">
                {BooleanItem.component(
                    {
                        name: 'fof-user-directory-link',
                        setting: this.setting.bind(this),
                    },
                    app.translator.trans('fof-user-directory.admin.settings.link')
                )}
            </div>,
            <div className="Form-group">
                <label>{app.translator.trans('fof-user-directory.admin.settings.default-sort')}</label>

                {SelectItem.component({
                    options: sortOptions,
                    name: 'fof-user-directory.default-sort',
                    setting: this.setting.bind(this),
                    default: '',
                })}
            </div>,
        ];
    }
}
