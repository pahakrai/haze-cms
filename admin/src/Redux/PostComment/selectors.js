import { createSelector } from 'reselect';

export const getCommentByPost = createSelector(
  state => state.resources.postComments,
  state => state.postComment.results,
  (postComments, keys) => keys && keys.map(key => postComments[key])
);
