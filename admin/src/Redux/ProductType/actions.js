import { createActions } from 'reduxsauce';

export const {
  Types: ProductTypeTypes,
  Creators: ProductTypeActions
} = createActions(
  {
    getProductTypes: ['opts'],
    getAllProductTypes: ['query'],
    getProductTypeById: ['id', 'query'],
    createProductType: ['formValues'],
    updateProductType: ['formValues'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResults: ['allResults']
  },
  { prefix: 'ProductType/' }
);
