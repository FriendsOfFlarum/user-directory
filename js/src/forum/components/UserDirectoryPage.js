import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import PageStructure from 'flarum/forum/components/PageStructure';
import app from 'flarum/forum/app';
import Page from 'flarum/common/components/Page';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import Select from 'flarum/common/components/Select';
import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import extractText from 'flarum/common/utils/extractText';
import UserDirectoryList from './UserDirectoryList';
import UserDirectoryListState from '../states/UserDirectoryListState';
import CheckableButton from './CheckableButton';
import SearchField from './SearchField';
import Separator from 'flarum/common/components/Separator';
import UserDirectoryHero from './UserDirectoryHero';

/**
 * This page re-uses Flarum's IndexPage CSS classes
 */
export default class UserDirectoryPage extends Page {
  oninit(vnode) {
    super.oninit(vnode);

    this.state = new UserDirectoryListState({}, 1);

    // Initialize the group filters before refreshing params
    this.enabledGroupFilters = [];
    this.enabledSpecialGroupFilters = {};

    // Extract group IDs from the query parameter
    // First check if we have preloaded data from the server
    const preloadedApiDocument = app.preloadedApiDocument();
    const preloadedData = preloadedApiDocument && preloadedApiDocument.payload && preloadedApiDocument.payload.fofUserDirectory;

    // Get query from preloaded data or URL parameter
    const q = preloadedData ? preloadedData.q : m.route.param('q') || '';

    if (q) {
      // Extract group filters
      const groupMatches = q.match(/\bgroup:(\d+)\b/g);
      if (groupMatches) {
        this.enabledGroupFilters = groupMatches.map((match) => match.replace('group:', ''));
      }

      // Extract special group filters
      if (app.initializers.has('flarum-suspend') && app.forum.attribute('hasSuspendPermission')) {
        if (q.includes('is:suspended')) {
          this.enabledSpecialGroupFilters['flarum-suspend'] = 'is:suspended';
        }
      }
    }

    // Now refresh params with the current URL parameters or preloaded data
    const params = {
      q: q,
      sort: preloadedData ? preloadedData.sort : m.route.param('sort'),
    };

    this.state.refreshParams(params, 1);

    this.bodyClass = 'User--directory';

    app.history.push('users', app.translator.trans('fof-user-directory.forum.header.back_to_user_directory_tooltip'));
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    app.setTitle(extractText(app.translator.trans('fof-user-directory.forum.page.nav')));
  }

  view() {
    return (
      <PageStructure className="UserDirectoryPage" hero={() => <UserDirectoryHero />} sidebar={() => <IndexSidebar />}>
        <div className="IndexPage-toolbar">
          <ul className="IndexPage-toolbar-view">{listItems(this.viewItems().toArray())}</ul>
          <ul className="IndexPage-toolbar-action">{listItems(this.actionItems().toArray())}</ul>
        </div>
        <UserDirectoryList state={this.state} />
      </PageStructure>
    );
  }

  viewItems() {
    const items = new ItemList();
    const sortMap = this.state.sortMap();

    const sortOptions = {};
    for (const i in sortMap) {
      sortOptions[i] = app.translator.trans('fof-user-directory.lib.sort.' + i);
    }

    items.add(
      'sort',
      Select.component({
        options: sortOptions,
        value: this.state.getParams().sort || app.forum.attribute('userDirectoryDefaultSort'),
        onchange: this.changeParams.bind(this),
      }),
      100
    );

    items.add(
      'filterGroups',
      Dropdown.component(
        {
          caretIcon: 'fas fa-filter',
          label: app.translator.trans('fof-user-directory.forum.page.filter_button'),
          buttonClassName: 'Button',
          className: 'GroupFilterDropdown',
        },
        this.groupItems().toArray()
      ),
      80
    );

    items.add(
      'search',
      SearchField.component({
        state: this.state,
      }),
      60
    );

    return items;
  }

  groupItems() {
    const items = new ItemList();

    app.store
      .all('groups')
      .filter((group) => group.id() !== '2' && group.id() !== '3')
      .forEach((group) => {
        items.add(
          group.namePlural(),
          CheckableButton.component(
            {
              className: 'GroupFilterButton',
              icon: group.icon(),
              checked: this.enabledGroupFilters.includes(group.id()),
              onclick: () => {
                const id = group.id();
                if (this.enabledGroupFilters.includes(id)) {
                  this.enabledGroupFilters = this.enabledGroupFilters.filter((e) => e != id);
                } else {
                  this.enabledGroupFilters.push(id);
                  // Empty the special group filters
                  this.enabledSpecialGroupFilters = [];
                }

                this.changeParams(this.params().sort);
              },
            },
            group.namePlural()
          )
        );
      });

    if (app.initializers.has('flarum-suspend') && app.forum.attribute('hasSuspendPermission')) {
      items.add(
        'suspend',
        CheckableButton.component(
          {
            className: 'GroupFilterButton',
            icon: 'fas fa-ban',
            checked: this.enabledSpecialGroupFilters['flarum-suspend'] === 'is:suspended',
            onclick: () => {
              const id = 'flarum-suspend';
              if (this.enabledSpecialGroupFilters[id] === 'is:suspended') {
                this.enabledSpecialGroupFilters[id] = '';
              } else {
                this.enabledSpecialGroupFilters[id] = 'is:suspended';
                // Empty the group filters
                this.enabledGroupFilters = [];
              }

              this.changeParams(this.params().sort);
            },
          },
          app.translator.trans('flarum-suspend.forum.user_badge.suspended_tooltip')
        ),
        90
      );

      items.add('seperator', Separator.component(), 50);
    }

    return items;
  }

  actionItems() {
    const items = new ItemList();

    items.add(
      'refresh',
      Button.component({
        title: app.translator.trans('fof-user-directory.forum.page.refresh_tooltip'),
        icon: 'fas fa-sync',
        className: 'Button Button--icon',
        onclick: () => {
          this.state.refresh();
          if (app.session.user) {
            app.store.find('users', app.session.user.id());
            m.redraw();
          }
        },
      })
    );

    return items;
  }

  /**
   * Redirect to the index page using the given sort parameter.
   *
   * @param {String} sort
   */
  changeParams(sort) {
    const params = this.params();

    if (sort === app.forum.attribute('userDirectoryDefaultSort')) {
      delete params.sort;
    } else {
      params.sort = sort;
    }

    // Build the query parameter
    let q = '';

    // Add special group filters
    for (const filter in this.enabledSpecialGroupFilters) {
      if (this.enabledSpecialGroupFilters[filter]) {
        q += this.enabledSpecialGroupFilters[filter] + ' ';
      }
    }

    // Add group filters
    if (this.enabledGroupFilters.length > 0) {
      this.enabledGroupFilters.forEach((groupId) => {
        q += `group:${groupId} `;
      });
    }

    // Set the query parameter
    params.q = q.trim();

    // Remove qBuilder to avoid confusion
    delete params.qBuilder;

    // Update the state
    this.state.refreshParams(params, 1);

    // Update the URL
    m.route.set(app.route('fof_user_directory', params));
  }

  stickyParams() {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q'),
    };
  }

  params() {
    return this.stickyParams();
  }
}
