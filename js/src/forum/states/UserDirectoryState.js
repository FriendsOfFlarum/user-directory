/**
 * Based on Flarum's DiscussionListState
 */
export default class UserDirectoryState {
    constructor(params = {}, app = window.app) {
        this.params = params;

        this.app = app;

        this.users = [];

        this.moreResults = false;

        this.loading = false;
    }

    requestParams() {
        const params = { include: [], filter: {} };

        params.sort = this.sortMap()[this.params.sort];

        if (this.params.q) {
            params.filter.q = this.params.q;
        }

        return params;
    }

    sortMap() {
        const map = {};

        map.default = '';
        map.username_az = 'username';
        map.username_za = '-username';
        map.newest = '-joinedAt';
        map.oldest = 'joinedAt';
        map.seen_recent = '-lastSeenAt';
        map.seen_oldest = 'lastSeenAt';
        map.most_discussions = '-discussionCount';
        map.least_discussions = 'discussionCount';

        return map;
    }

    getParams() {
        return this.params;
    }

    clear() {
        this.users = [];
        m.redraw();
    }

    refreshParams(newParams) {
        if (!this.hasUsers() || Object.keys(newParams).some((key) => this.getParams()[key] !== newParams[key])) {
            this.params = newParams;

            this.refresh();
        }
    }

    refresh() {
        this.loading = true;

        this.clear();

        return this.loadResults().then(
            (results) => {
                this.parseResults(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadResults(offset) {
        const preloadedUsers = this.app.preloadedApiDocument();

        if (preloadedUsers) {
            return Promise.resolve(preloadedUsers);
        }

        const params = this.requestParams();
        params.page = { offset };
        params.include = params.include.join(',');

        return this.app.store.find('users', params);
    }

    loadMore() {
        this.loading = true;

        this.loadResults(this.users.length).then(this.parseResults.bind(this));
    }

    parseResults(results) {
        this.users.push(...results);

        this.loading = false;
        this.moreResults = !!results.payload.links && !!results.payload.links.next;

        m.redraw();

        return results;
    }

    hasUsers() {
        return this.users.length > 0;
    }

    isLoading() {
        return this.loading;
    }

    isSearchResults() {
        return !!this.params.q;
    }

    empty() {
        return !this.hasUsers() && !this.isLoading();
    }
}
