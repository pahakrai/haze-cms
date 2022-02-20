import { createActions } from 'reduxsauce';

export const { Types: StoreTypes, Creators: StoreTypeActions } = createActions(
  {
    // sagas
    getStoreTypes: ['opts'],
    getAllStoreTypes: ['opts'],
    createStoreType: ['storeType'],
    updateStoreType: ['id', 'storeType'],
    getStoreTypeById: ['id'],

    // reducers
    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'StoreType/' }
);
