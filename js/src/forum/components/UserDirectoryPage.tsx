import app from 'flarum/forum/app';
import Page, { type IPageAttrs } from 'flarum/common/components/Page';
import IndexSidebar from 'flarum/forum/components/IndexSidebar';
import PageStructure from 'flarum/forum/components/PageStructure';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import Select from 'flarum/common/components/Select';
import Button from 'flarum/common/components/Button';
import Dropdown from 'flarum/common/components/Dropdown';
import Separator from 'flarum/common/components/Separator';
import extractText from 'flarum/common/utils/extractText';
import setRouteWithForcedRefresh from 'flarum/common/utils/setRouteWithForcedRefresh';
import Group from 'flarum/common/models/Group';
import type Mithril from 'mithril';
import UserDirectoryList from './UserDirectoryList';
import UserDirectoryListState, { type UserDirectoryParams } from '../states/UserDirectoryListState';
import CheckableButton from './CheckableButton';
import SearchField from './SearchField';
import UserDirectoryHero from './UserDirectoryHero';
import { extractGroupIds, gambitFor } from '../utils/groupGambit';

export interface IUserDirectoryPageAttrs extends IPageAttrs {}

/**
 * This page re-uses Flarum's IndexPage CSS classes.
 */
export default class UserDirectoryPage<CustomAttrs extends IUserDirectoryPageAttrs = IUserDirectoryPageAttrs> extends Page<
  CustomAttrs,
  UserDirectoryListState
> {
  state!: UserDirectoryListState;

  /**
   * Ids of the groups currently being filtered on.
   */
  enabledGroupFilters: string[] = [];

  /**
   * Gambits contributed by other extensions, keyed by extension id.
   */
  enabledSpecialGroupFilters: Record<string, string> = {};

  oninit(vnode: Mithril.Vnode<CustomAttrs, this>) {
    super.oninit(vnode);

    // On the initial page load, prefer the server-rendered params so the first
    // paint matches what the page was rendered with.
    //
    // Read straight from `app.data`: calling preloadedApiDocument() here would
    // consume the preloaded document — it nulls itself after the first call —
    // leaving the list state to refetch over the network on every page load.
    //
    // Unlike that document, this payload is never cleared, so it must only be
    // trusted while the URL still matches the one the server rendered. After
    // any navigation the URL is the source of truth, otherwise sorting and
    // filtering would keep being overridden by the original request's params.
    const preloaded =
      window.location.href === app.initialRoute ? (app.data.fofUserDirectory as { q?: string; sort?: string } | undefined) : undefined;

    const q: string = (preloaded ? preloaded.q : m.route.param('q')) || '';

    if (q) {
      this.enabledGroupFilters = extractGroupIds(q);

      if (this.canFilterSuspended() && q.includes('is:suspended')) {
        this.enabledSpecialGroupFilters['flarum-suspend'] = 'is:suspended';
      }
    }

    this.state = new UserDirectoryListState({}, 1);

    this.state.refreshParams(
      {
        q,
        sort: preloaded ? preloaded.sort : m.route.param('sort'),
      },
      1
    );

    this.bodyClass = 'User--directory';

    app.history.push('users', extractText(app.translator.trans('fof-user-directory.forum.header.back_to_user_directory_tooltip')));
  }

  oncreate(vnode: Mithril.VnodeDOM<CustomAttrs, this>) {
    super.oncreate(vnode);

    this.setTitle();
  }

  setTitle(): void {
    app.setTitle(extractText(app.translator.trans('fof-user-directory.forum.page.nav')));
    app.setTitleCount(0);
  }

  view(): Mithril.Children {
    // `loading` is deliberately not passed to PageStructure: it replaces the
    // whole main area, hiding the hero and toolbar with it. UserDirectoryList
    // renders its own spinner in place of the list instead, so the controls
    // stay put and the page does not jump once results arrive.
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

  viewItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    const sortOptions: Record<string, string> = {};

    for (const key of Object.keys(this.state.sortMap())) {
      sortOptions[key] = extractText(app.translator.trans(`fof-user-directory.lib.sort.${key}`));
    }

    items.add(
      'sort',
      <Select
        options={sortOptions}
        value={this.state.getParams().sort || app.forum.attribute<string>('userDirectoryDefaultSort')}
        onchange={this.changeParams.bind(this)}
      />,
      100
    );

    items.add(
      'filterGroups',
      <Dropdown
        caretIcon="fas fa-filter"
        label={app.translator.trans('fof-user-directory.forum.page.filter_button')}
        buttonClassName="Button"
        className="GroupFilterDropdown"
      >
        {this.groupItems().toArray()}
      </Dropdown>,
      80
    );

    items.add('search', <SearchField state={this.state} />, 60);

    return items;
  }

  groupItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    app.store
      .all<Group>('groups')
      // Guests and Members match everyone, so filtering by them is meaningless.
      .filter((group) => group.id() !== Group.GUEST_ID && group.id() !== Group.MEMBER_ID)
      .forEach((group) => {
        items.add(
          group.namePlural(),
          <CheckableButton
            className="GroupFilterButton"
            icon={group.icon()}
            checked={this.enabledGroupFilters.includes(group.id()!)}
            onclick={() => this.toggleGroupFilter(group.id()!)}
          >
            {group.namePlural()}
          </CheckableButton>
        );
      });

    if (this.canFilterSuspended()) {
      items.add(
        'suspend',
        <CheckableButton
          className="GroupFilterButton"
          icon="fas fa-ban"
          checked={this.enabledSpecialGroupFilters['flarum-suspend'] === 'is:suspended'}
          onclick={() => this.toggleSuspendedFilter()}
        >
          {app.translator.trans('flarum-suspend.forum.user_badge.suspended_tooltip')}
        </CheckableButton>,
        90
      );

      items.add('separator', <Separator />, 50);
    }

    return items;
  }

  actionItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'refresh',
      <Button
        title={app.translator.trans('fof-user-directory.forum.page.refresh_tooltip')}
        // Icon-only, so it needs an accessible name of its own: a title
        // attribute alone leaves screen readers announcing just "Button".
        aria-label={app.translator.trans('fof-user-directory.forum.page.refresh_tooltip')}
        icon="fas fa-sync"
        className="Button Button--icon"
        onclick={() => {
          this.state.refresh();

          if (app.session.user) {
            app.store.find('users', app.session.user.id()!);
            m.redraw();
          }
        }}
      />
    );

    return items;
  }

  /**
   * Whether the suspended filter can be offered, which needs both the Suspend
   * extension and permission to see who is suspended.
   */
  protected canFilterSuspended(): boolean {
    return app.initializers.has('flarum-suspend') && !!app.forum.attribute<boolean>('hasSuspendPermission');
  }

  protected toggleGroupFilter(id: string): void {
    if (this.enabledGroupFilters.includes(id)) {
      this.enabledGroupFilters = this.enabledGroupFilters.filter((enabled) => enabled !== id);
    } else {
      this.enabledGroupFilters.push(id);
      // The special filters are mutually exclusive with group filters.
      this.enabledSpecialGroupFilters = {};
    }

    this.changeParams(this.params().sort);
  }

  protected toggleSuspendedFilter(): void {
    const id = 'flarum-suspend';

    if (this.enabledSpecialGroupFilters[id] === 'is:suspended') {
      this.enabledSpecialGroupFilters[id] = '';
    } else {
      this.enabledSpecialGroupFilters[id] = 'is:suspended';
      this.enabledGroupFilters = [];
    }

    this.changeParams(this.params().sort);
  }

  /**
   * Redirect to the directory using the given sort parameter.
   */
  changeParams(sort?: string): void {
    const params: UserDirectoryParams = this.params();

    if (sort === app.forum.attribute<string>('userDirectoryDefaultSort')) {
      delete params.sort;
    } else {
      params.sort = sort;
    }

    params.q = this.buildQuery();

    // Remove qBuilder to avoid confusion.
    delete params.qBuilder;

    // Only set the route: changing it remounts the page, whose oninit seeds the
    // state from the new params. Refreshing the state here as well would load
    // the same page twice. Forced so Mithril re-inits on a same-route change.
    setRouteWithForcedRefresh(app.route('fof_user_directory', params));
  }

  /**
   * Assemble the active filters back into a query string.
   */
  protected buildQuery(): string {
    const parts: string[] = [];

    for (const filter of Object.values(this.enabledSpecialGroupFilters)) {
      if (filter) {
        parts.push(filter);
      }
    }

    for (const groupId of this.enabledGroupFilters) {
      parts.push(gambitFor(groupId));
    }

    return parts.join(' ');
  }

  stickyParams(): UserDirectoryParams {
    return {
      sort: m.route.param('sort'),
      q: m.route.param('q'),
    };
  }

  params(): UserDirectoryParams {
    return this.stickyParams();
  }
}
