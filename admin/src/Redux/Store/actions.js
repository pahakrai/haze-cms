import { createActions } from 'reduxsauce';

export const { Types: StoreTypes, Creators: StoreActions } = createActions(
  {
    getStores: ['opts'],
    getStoreById: ['id', 'query'],
    createStore: ['formValues'],
    updateStore: ['formValues'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Store/' }
);
