import { createActions } from 'reduxsauce';

export const {
  Types: EventAttendanceTypes,
  Creators: EventAttendanceActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getEventAttendances: ['opts'],
    getAllEventAttendance: ['opts'],
    getEventAttendanceById: ['id'],
    updateEventAttendance: ['formValues'],
    createEventAttendance: ['formValues'],
    getEventAttendanceByEventId: ['id'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setEventSnapshot: ['data'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResult: ['allResult']
  },
  { prefix: 'EventAttendance/' }
);
