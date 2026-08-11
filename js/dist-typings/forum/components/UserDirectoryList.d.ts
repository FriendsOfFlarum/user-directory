import Component, { type ComponentAttrs } from 'flarum/common/Component';
import type Mithril from 'mithril';
import type UserDirectoryListState from '../states/UserDirectoryListState';
export interface IUserDirectoryListAttrs extends ComponentAttrs {
    state: UserDirectoryListState;
}
/**
 * Based on Flarum's DiscussionList.
 */
export default class UserDirectoryList<CustomAttrs extends IUserDirectoryListAttrs = IUserDirectoryListAttrs> extends Component<CustomAttrs> {
    view(): Mithril.Children;
}
