import { createActions } from 'reduxsauce';

export const { Types: ServiceTypes, Creators: ServiceActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getServices: ['opts'],
    getAllService: ['opts'],
    getServiceById: ['id'],
    createService: ['service', 'files'],
    updateService: ['id', 'service', 'files'],

    setResults: ['results'],
    setAllResults: ['allResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm']
  },
  { prefix: 'Service/' }
);
