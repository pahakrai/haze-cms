import { createActions } from 'reduxsauce';

export const {
  Types: IntervalsTypes,
  Creators: IntervalsActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getIntervals: ['opts', 'bookTypes', 'isholiday'],
    getIntervalsById: ['id', 'query'],
    updateIntervals: ['value'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setAllResults: ['allResults'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Intervals/' }
);
