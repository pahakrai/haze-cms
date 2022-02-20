import { createActions } from 'reduxsauce';

export const {
  Types: SalesVolumeTypes,
  Creators: SalesVolumeActions
} = createActions(
  {
    getSalesVolumes: ['opts'],
    getSalesVolumesByYear: ['query'],
    getSalesVolumesByMonth: ['query'],
    getSalesVolumeById: ['id', 'query'],
    createSalesVolume: ['formValues'],
    updateSalesVolume: ['formValues'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm']
  },
  { prefix: 'SalesVolumeTypes/' }
);
