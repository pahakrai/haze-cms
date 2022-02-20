import { createActions } from 'reduxsauce';

export const { Types: PostTypes, Creators: PostActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getPosts: ['opts'],
    getPostById: ['id'],
    updatePost: ['postForm', 'files'],
    createPost: ['postForm', 'files'],
    deleteFileMeta: ['postId', 'fileMetaId'],

    /* ------------- Reducers ------------- */
    mergeResults: ['results'],
    setResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setEditForm: ['post'],
    setSearchTerm: ['searchTerm']
  },
  { prefix: 'Post/' }
);
