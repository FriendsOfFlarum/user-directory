import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Mithril from 'mithril';
import type User from 'flarum/common/models/User';
export interface IUserDirectoryListItemAttrs extends ComponentAttrs {
    user: User;
    useSmallCards?: boolean;
}
export default class UserDirectoryListItem<CustomAttrs extends IUserDirectoryListItemAttrs = IUserDirectoryListItemAttrs> extends Component<CustomAttrs> {
    view(): Mithril.Children;
}
