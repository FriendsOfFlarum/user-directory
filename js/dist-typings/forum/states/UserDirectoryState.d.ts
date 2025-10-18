export default class UserDirectoryState {
    constructor(params?: {}, app?: any);
    params: {};
    app: any;
    users: any[];
    moreResults: boolean;
    loading: boolean;
    qBuilder: {};
    requestParams(): {
        include: string[];
        filter: {};
    };
    sortMap(): {
        username_az: string;
        username_za: string;
        newest: string;
        oldest: string;
        most_discussions: string;
        least_discussions: string;
        default: string;
    };
    getParams(): {};
    clear(): void;
    refreshParams(newParams: any): void;
    refresh(): any;
    loadResults(offset: any): any;
    loadMore(): void;
    parseResults(results: any): any;
    hasUsers(): boolean;
    isLoading(): boolean;
    isSearchResults(): boolean;
    empty(): boolean;
}
