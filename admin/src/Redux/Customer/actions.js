import { createActions } from 'reduxsauce';

export const {
  Types: CustomerTypes,
  Creators: CustomerActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getCustomers: ['opts'],
    getCustomersWithAll: ['opts'],
    getCustomerById: ['id'],
    updateCustomer: ['formValues'],
    createCustomer: ['formValues'],
    searchCustomers: ['opts'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setSearchResults: ['searchResults'],
    mergeSearchResults: ['searchResults']
  },
  { prefix: 'Customer/' }
);
