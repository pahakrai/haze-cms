import { createActions } from 'reduxsauce';

export const { Types: PaymentTypes, Creators: PaymentActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getPayments: ['opts'],
    getPaymentById: ['id'],
    updatePayment: ['formValues'],
    createPayment: ['formValues', 'files'],
    createTransaction: ['opts', 'formValues', 'files'],
    updateTransaction: ['opts', 'formValues', 'files'],
    getPaymentByOrderId: ['orderId'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Payment/' }
);
