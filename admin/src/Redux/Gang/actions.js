import { createActions } from 'reduxsauce';

export const { Types: GangTypes, Creators: GangActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getGangs: ['opts'],
    getGangById: ['id'],
    updateGang: ['formValues'],
    createGang: ['formValues'],
    importDriver: ['id', 'files'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Gang/' }
);
