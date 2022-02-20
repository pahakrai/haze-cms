import { createActions } from 'reduxsauce';

export const {
  Types: ProductSkuTypes,
  Creators: ProductSkuActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getProductSkus: ['opts'],
    getProductSkuById: ['id'],
    updateProductSku: ['formValues'],
    createProductSku: ['formValues'],
    searchProductSkus: ['query', 'q'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setSearchResults: ['searchResults']
  },
  { prefix: 'ProductSku/' }
);
