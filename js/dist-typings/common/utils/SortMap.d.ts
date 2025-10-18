/**
 * The sort options.
 * We use a class and not just a POJO/function because we want extensions to be able to extend it
 */
export default class SortMap {
    sortMap(): {
        username_az: string;
        username_za: string;
        newest: string;
        oldest: string;
        most_discussions: string;
        least_discussions: string;
    };
}
