import { createActions } from 'reduxsauce';

export const {
  Types: PostCommentTypes,
  Creators: PostCommentActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getCommentsByPostId: ['opts', 'postId'],
    deleteComment: ['id'],
    findByPost: ['id'],

    /* ------------- Reducers ------------- */
    setResultIds: ['_ids'],
    mergeResultIds: ['_ids'],
    deleteResultId: ['id'],
    reset: null
  },
  { prefix: 'PostComment/' }
);
