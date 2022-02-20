import { createActions } from 'reduxsauce';

export const {
  Types: CustomerEnquiryTypes,
  Creators: CustomerEnquiryActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getCustomerEnquiries: ['opts'],
    getCustomerEnquiryById: ['id'],
    createCustomerEnquiry: ['formValues'],
    updateCustomerEnquiry: ['id', 'formValues'],
    updateToFollow: ['id'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm']
  },
  { prefix: 'CustomerEnquiry/' }
);
