import { createActions } from 'reduxsauce';

export const { Types: ProductTypes, Creators: ProductActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getProducts: ['opts'],
    getProductById: ['id'],
    updateProduct: [
      'formValues',
      'files',
      'skuFiles',
      'mediaList1',
      'mediaList2',
      'mediaList3'
    ],
    createProduct: [
      'formValues',
      'files',
      'skuFiles',
      'mediaList1',
      'mediaList2',
      'mediaList3'
    ],
    importProduct: ['files'],
    searchProducts: ['query', 'q'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setImported: ['import'],
    setSearchResults: ['searchResults']
  },
  { prefix: 'Product/' }
);
