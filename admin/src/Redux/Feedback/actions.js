import { createActions } from 'reduxsauce';

export const {
  Types: FeedbackTypes,
  Creators: FeedbackActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getFeedbacks: ['opts'],
    getFeedbackById: ['id', 'query'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Feedback/' }
);
