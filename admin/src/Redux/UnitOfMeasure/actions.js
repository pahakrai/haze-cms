import { createActions } from 'reduxsauce';

export const {
  Types: UnitOfMeasureTypes,
  Creators: UnitOfMeasureActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getUnitOfMeasures: ['opts'],
    getAllUnitOfMeasure: ['opts'],
    getUnitOfMeasureById: ['id'],
    updateUnitOfMeasure: ['formValues'],
    createUnitOfMeasure: ['formValues'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResults: ['results']
  },
  { prefix: 'UnitOfMeasure/' }
);
