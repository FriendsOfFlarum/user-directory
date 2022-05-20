/**
 * The sort options.
 * We use a class and not just a POJO/function because we want extensions to be able to extend it
 */
export default class SortMap {
  sortMap() {
    return {
      username_az: 'username',
      username_za: '-username',
      newest: '-joinedAt',
      oldest: 'joinedAt',
      most_discussions: '-discussionCount',
      least_discussions: 'discussionCount',
    };
  }
}
