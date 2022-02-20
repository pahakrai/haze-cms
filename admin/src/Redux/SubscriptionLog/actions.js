import { createActions } from 'reduxsauce';

export const {
  Types: SubscriptionLogTypes,
  Creators: SubscriptionLogActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getSubscriptionLogs: ['opts'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResults: ['allResults']
  },
  { prefix: 'SubscriptionLog/' }
);
