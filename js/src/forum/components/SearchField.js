import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import withAttr from 'flarum/common/utils/withAttr';

export default class SearchField extends Component {
    oninit(vnode) {
        super.oninit(vnode);
    }

    view() {
        return (
            <div className="Form-group Usersearchbox">
                <input
                    className="FormControl"
                    placeholder={app.translator.trans('fof-user-directory.forum.search.field.placeholder')}
                    value={this.filter}
                    oninput={withAttr('value', (value) => {
                        this.filter = value;
                        this.performNewSearch();
                    })}
                />
            </div>
        );
    }

    performNewSearch() {
        this.attrs.state.refreshParams({ ...this.attrs.state.getParams(), qBuilder: { filter: this.filter } });
    }
}
