import { createActions } from 'reduxsauce';

export const {
  Types: QuotationTypes,
  Creators: QuotationActions
} = createActions(
  {
    getQuotations: ['opts'],
    getQuotationById: ['id'],
    convertToOrder: ['id', 'formValues'],
    createQuotation: ['formValues'],
    updateQuotation: ['formValues'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Quotation/' }
);
