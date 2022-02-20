import { createActions } from 'reduxsauce';

export const {
  Types: MerchantTypes,
  Creators: MerchantActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getMerchants: ['opts'],
    getMerchantById: ['id'],
    updateMerchant: ['formValues'],
    createMerchant: ['formValues'],
    searchMerchants: ['q', 'query'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setSearchResults: ['results']
  },
  { prefix: 'Merchant/' }
);
