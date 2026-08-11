import app from 'flarum/forum/app';
import PaginatedListState, {
  Page,
  PaginatedListParams,
  PaginatedListRequestParams,
  type SortMap as SortMapType,
} from 'flarum/common/states/PaginatedListState';
import User from 'flarum/common/models/User';
import { ApiResponsePlural } from 'flarum/common/Store';
import SortMap from '../../common/utils/SortMap';

export interface UserDirectoryParams extends PaginatedListParams {
  sort?: string;
  q?: string;
  filter?: Record<string, any>;
  qBuilder?: Record<string, any>;
}

/**
 * State class for managing the user directory list with pagination.
 * Based on Flarum's modern DiscussionListState pattern.
 */
export default class UserDirectoryListState extends PaginatedListState<User, UserDirectoryParams> {
  protected qBuilder: Record<string, any> = {};

  constructor(params: UserDirectoryParams = {}, page: number = 1) {
    super(params, page, null);
  }

  get type(): string {
    return 'users';
  }

  requestParams(): PaginatedListRequestParams {
    const params: PaginatedListRequestParams = {
      include: ['groups'],
      filter: this.params.filter || {},
    };

    const sortKey = this.params.sort || app.forum.attribute<string>('userDirectoryDefaultSort');
    // An unknown key — including a permissioned sort this actor cannot use —
    // leaves `sort` unset so the API applies its own default ordering, rather
    // than erroring the whole list out.
    const sortValue = this.sortMap()[sortKey];
    params.sort = typeof sortValue === 'string' ? sortValue : sortValue?.sort;

    if (this.params.q) {
      if (!params.filter) {
        params.filter = {};
      }
      params.filter.q = this.params.q;
    }

    return params;
  }

  protected loadPage(page: number = 1): Promise<ApiResponsePlural<User>> {
    const preloadedUsers = app.preloadedApiDocument<User[]>();

    if (preloadedUsers) {
      this.initialLoading = false;
      this.pageSize = preloadedUsers.payload.meta?.perPage || UserDirectoryListState.DEFAULT_PAGE_SIZE;

      return Promise.resolve(preloadedUsers);
    }

    return super.loadPage(page);
  }

  /**
   * Get the sort map for the user directory.
   *
   * Permissioned sorts are only included when the forum reports that the actor
   * may use them, so a sort the API would reject can never be selected, sent,
   * or restored from a URL — see issue #66.
   *
   * **Note for extension developers**: Do NOT extend this method.
   * Instead, extend the `SortMap` class from `common/utils/SortMap`:
   *
   * @example
   * import { extend } from 'flarum/common/extend';
   * import SortMap from 'ext:fof/user-directory/common/utils/SortMap';
   *
   * extend(SortMap.prototype, 'sortMap', function (map) {
   *   map.my_custom_sort = '-customField';
   * });
   */
  sortMap(): SortMapType {
    const sortMap = new SortMap();
    const permissioned: Record<string, string> = {};

    for (const [key, { sort, attribute }] of Object.entries(sortMap.permissionedSortMap())) {
      if (app.forum.attribute<boolean>(attribute)) {
        permissioned[key] = sort;
      }
    }

    return {
      default: '',
      ...sortMap.sortMap(),
      ...permissioned,
    };
  }

  /**
   * Update parameters and refresh the list.
   * Handles qBuilder logic for building query strings from filters.
   */
  public refreshParams(newParams: UserDirectoryParams, page: number = 1): Promise<void> {
    // Process qBuilder if provided
    if (newParams.qBuilder) {
      Object.assign(this.qBuilder, newParams.qBuilder || {});
      newParams.q = Object.values(this.qBuilder).join(' ').trim();
    }

    // Ensure q is a string
    if (!newParams.q) {
      newParams.q = '';
    } else if (typeof newParams.q !== 'string') {
      newParams.q = String(newParams.q);
    }

    return super.refreshParams(newParams, page);
  }
}
