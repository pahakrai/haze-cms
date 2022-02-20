import { createActions } from 'reduxsauce';

export const { Types: PriceTypes, Creators: PriceActions } = createActions(
  {
    getPrices: ['opts'],
    getAllPrice: ['opts'],
    getPriceById: ['id'],
    createPrice: ['price', 'files'],
    updatePrice: ['id', 'price', 'files'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm']
  },
  { prefix: 'PriceTypes/' }
);
