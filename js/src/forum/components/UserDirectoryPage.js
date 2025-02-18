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
import UserDirectoryState from '../states/UserDirectoryState';
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

    this.state = new UserDirectoryState({});
    this.state.refreshParams(app.search.state.params());

    this.bodyClass = 'User--directory';

    let idSegments = [];
    if (this.params().q) {
      Array.from(this.params().q.matchAll(/group:([\d,]+)/g)).forEach((match) => {
        idSegments.push(match[1]);
      });
    }
    this.enabledGroupFilters = idSegments
      .join(',')
      .split(',')
      .filter((id) => id);

    this.enabledSpecialGroupFilters = [];
    if (app.initializers.has('flarum-suspend') && app.forum.attribute('hasSuspendPermission')) {
      // If there is a special group filter int the params, enable it here
      if (this.params()?.q?.includes('is:suspended')) {
        this.enabledSpecialGroupFilters['flarum-suspend'] = 'is:suspended';
      }
    }

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

    let moreQ = '';
    for (const filter in this.enabledSpecialGroupFilters) {
      moreQ += this.enabledSpecialGroupFilters[filter] + ' ';
    }

    if (this.enabledGroupFilters.length > 0) {
      const groupsQ = this.enabledGroupFilters.reduce((prev, curr) => {
        return `${prev}${prev ? ' ' : ''}group:${curr}`;
      }, '');

      params.qBuilder = { groups: groupsQ };
    } else {
      params.qBuilder = { groups: '', q: moreQ.trim() };
    }

    this.state.refreshParams(params);

    const routeParams = { ...params };
    delete routeParams.qBuilder;

    m.route.set(app.route('fof_user_directory', routeParams));
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
