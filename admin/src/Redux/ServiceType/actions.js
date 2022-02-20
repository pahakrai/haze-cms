import { createActions } from 'reduxsauce';

export const {
  Types: ServiceTypeTypes,
  Creators: ServiceTypeActions
} = createActions(
  {
    // sage
    getServiceTypesByWorkspaceType: ['opts'],

    // reducers
    setResults: ['results'],
    setSearchSelectResults: ['searchSelectResults'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setSearchTerm: ['searchTerm'],
    reset: null
  },
  { prefix: 'ServiceType/' }
);
