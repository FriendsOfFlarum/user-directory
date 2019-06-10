import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Page from 'flarum/components/Page';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import LogInModal from 'flarum/components/LogInModal';
import Select from 'flarum/components/Select';
import Button from 'flarum/components/Button';
import LinkButton from 'flarum/components/LinkButton';
import SelectDropdown from 'flarum/components/SelectDropdown';
import UserDirectoryList from './UserDirectoryList';

/**
 * The `IndexPage` component displays the index page, including the welcome
 * hero, the sidebar, and the discussion list.
 */
export default class UserDirectoryPage extends Page {
    init() {
        super.init();


        // If the user is coming from the discussion list, then they have either
        // just switched one of the parameters (filter, sort, search) or they
        // probably want to refresh the results. We will clear the discussion list
        // cache so that results are reloaded.
        if (app.previous instanceof UserDirectoryPage) {
            app.cache.fofUserDirectoryList = null;
        }

        const params = this.params();

        if (app.cache.fofUserDirectoryList) {
            // Compare the requested parameters (sort, search query) to the ones that
            // are currently present in the cached discussion list. If they differ, we
            // will clear the cache and set up a new discussion list component with
            // the new parameters.
            Object.keys(params).some(key => {
                if (app.cache.fofUserDirectoryList.props.params[key] !== params[key]) {
                    app.cache.fofUserDirectoryList = null;
                    return true;
                }
            });
        }

        if (!app.cache.fofUserDirectoryList) {
            app.cache.fofUserDirectoryList = new UserDirectoryList({params});
        }

        this.bodyClass = 'User--directory';
    }

    onunload() {
        // Save the scroll position so we can restore it when we return to the
        // discussion list.
        app.cache.scrollTop = $(window).scrollTop();
    }

    view() {
        return (
            <div className="IndexPage">
                {IndexPage.prototype.hero()}
                <div className="container">
                    <div className="sideNavContainer">
                        <nav className="IndexPage-nav sideNav">
                            <ul>{listItems(this.sidebarItems().toArray())}</ul>
                        </nav>
                        <div className="IndexPage-results sideNavOffset">
                            <div className="IndexPage-toolbar">
                                <ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
                                <ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
                            </div>
                            {app.cache.fofUserDirectoryList.render()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    config(isInitialized, context) {
        super.config(...arguments);

        if (isInitialized) return;

        extend(context, 'onunload', () => $('#app').css('min-height', ''));

        app.setTitle('');
        app.setTitleCount(0);

        // Work out the difference between the height of this hero and that of the
        // previous hero. Maintain the same scroll position relative to the bottom
        // of the hero so that the sidebar doesn't jump around.
        const scrollTop = app.cache.scrollTop;

        $('#app').css('min-height', $(window).height());

        // Scroll to the remembered position. We do this after a short delay so that
        // it happens after the browser has done its own "back button" scrolling,
        // which isn't right. https://github.com/flarum/core/issues/835
        const scroll = () => $(window).scrollTop(scrollTop);
        scroll();
        setTimeout(scroll, 1);
    }

    /**
     * Build an item list for the sidebar of the index page. By default this is a
     * "New Discussion" button, and then a DropdownSelect component containing a
     * list of navigation items.
     *
     * @return {ItemList}
     */
    sidebarItems() {
        const items = IndexPage.prototype.sidebarItems();

        items.replace('nav',
            SelectDropdown.component({
                children: this.navItems(this).toArray(),
                buttonClassName: 'Button',
                className: 'App-titleControl'
            })
        );

        return items;
    }

    /**
     * Build an item list for the navigation in the sidebar of the index page. By
     * default this is just the 'All Discussions' link.
     *
     * @return {ItemList}
     */
    navItems() {
        const items = IndexPage.prototype.navItems();
        const params = this.stickyParams();

        items.add('fof-user-directory',
            LinkButton.component({
                href: app.route('fof_user_directory', params),
                children: app.translator.trans('fof-user-directory.forum.page.nav'),
                icon: 'far fa-address-book'
            }),
            85
        );

        return items;
    }

    /**
     * Build an item list for the part of the toolbar which is concerned with how
     * the results are displayed. By default this is just a select box to change
     * the way discussions are sorted.
     *
     * @return {ItemList}
     */
    viewItems() {
        const items = new ItemList();
        const sortMap = app.cache.fofUserDirectoryList.sortMap();

        const sortOptions = {};
        for (const i in sortMap) {
            sortOptions[i] = app.translator.trans('fof-user-directory.forum.page.sort.' + i);
        }

        items.add('sort',
            Select.component({
                options: sortOptions,
                value: this.params().sort || Object.keys(sortMap)[0],
                onchange: this.changeSort.bind(this)
            })
        );

        return items;
    }

    /**
     * Build an item list for the part of the toolbar which is about taking action
     * on the results. By default this is just a "mark all as read" button.
     *
     * @return {ItemList}
     */
    actionItems() {
        const items = new ItemList();

        items.add('refresh',
            Button.component({
                title: app.translator.trans('core.forum.index.refresh_tooltip'),
                icon: 'fas fa-sync',
                className: 'Button Button--icon',
                onclick: () => {
                    app.cache.fofUserDirectoryList.refresh();
                    if (app.session.user) {
                        app.store.find('users', app.session.user.id());
                        m.redraw();
                    }
                }
            })
        );

        return items;
    }

    /**
     * Return the current search query, if any. This is implemented to activate
     * the search box in the header.
     *
     * @see Search
     * @return {String}
     */
    searching() {
        return this.params().q;
    }

    /**
     * Redirect to the index page without a search filter. This is called when the
     * 'x' is clicked in the search box in the header.
     *
     * @see Search
     */
    clearSearch() {
        const params = this.params();
        delete params.q;

        m.route(app.route(this.props.routeName, params));
    }

    /**
     * Redirect to the index page using the given sort parameter.
     *
     * @param {String} sort
     */
    changeSort(sort) {
        const params = this.params();

        if (sort === Object.keys(app.cache.fofUserDirectoryList.sortMap())[0]) {
            delete params.sort;
        } else {
            params.sort = sort;
        }

        m.route(app.route(this.props.routeName, params));
    }

    /**
     * Get URL parameters that stick between filter changes.
     *
     * @return {Object}
     */
    stickyParams() {
        return {
            sort: m.route.param('sort'),
            q: m.route.param('q')
        };
    }

    /**
     * Get parameters to pass to the UserDirectoryList component.
     *
     * @return {Object}
     */
    params() {
        const params = this.stickyParams();

        params.filter = m.route.param('filter');

        return params;
    }

    /**
     * Log the user in and then open the composer for a new discussion.
     *
     * @return {Promise}
     */
    newDiscussion() {
        const deferred = m.deferred();

        if (app.session.user) {
            this.composeNewDiscussion(deferred);
        } else {
            app.modal.show(
                new LogInModal({
                    onlogin: this.composeNewDiscussion.bind(this, deferred)
                })
            );
        }

        return deferred.promise;
    }

    /**
     * Initialize the composer for a new discussion.
     *
     * @param {Deferred} deferred
     * @return {Promise}
     */
    composeNewDiscussion(deferred) {
        const component = new DiscussionComposer({user: app.session.user});

        app.composer.load(component);
        app.composer.show();

        deferred.resolve(component);

        return deferred.promise;
    }
}
