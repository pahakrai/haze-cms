import { createActions } from 'reduxsauce';

export const { Types: HolidayTypes, Creators: HolidayActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getHolidays: ['opts'],
    createHoliday: ['formValues'],
    updateHoliday: ['formValues'],
    deleteHoliday: ['id'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Holiday/' }
);
