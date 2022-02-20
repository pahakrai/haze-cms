import { createActions } from 'reduxsauce';

export const {
  Types: PaymentMethodTypes,
  Creators: PaymentMethodActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getPaymentMethods: ['opts'],
    getPaymentMethodById: ['id'],
    updatePaymentMethod: ['formValues'],
    createPaymentMethod: ['formValues'],
    getAllPaymentMethod: ['opts'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResults: ['allResults']
  },
  { prefix: 'PaymentMethod/' }
);
