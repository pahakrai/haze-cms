import { createActions } from 'reduxsauce';

export const { Types: TagTypes, Creators: TagActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getTag: ['code', 'locale'],
    getTagById: ['id'],
    getTagsByPostId: ['postId'],
    getTagsByProductId: ['productId'],
    getTags: null,
    getDistinctTags: ['opts'],
    getAllDistinctTags: ['opts'],
    getTagByText: ['text'],

    /* ------------- Reducers ------------- */
    setResults: ['results'],
    setTextResults: ['textResults'],
    setDistinctResults: ['distinctResults'],
    mergeDistinctResults: ['distinctResults'],
    setAllDistinctResults: ['allDistinctResults'],
    setResultsByPostId: ['results'],
    setResultsByProductId: ['results'],
    setSelected: ['id'],
    reset: null
  },
  { prefix: 'Tag/' }
);
