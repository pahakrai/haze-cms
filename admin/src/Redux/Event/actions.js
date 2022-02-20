import { createActions } from 'reduxsauce';

export const { Types: EventTypes, Creators: EventActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getEvents: ['opts'],
    getEventById: ['id'],
    updateEvent: ['formValues'],
    createEvent: ['formValues'],
    getMyEvents: ['opts'],
    getAllEvent: ['opts'],
    getCompleteEvent: ['opts'],
    updateRemarks: ['id', 'formValues'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setAllResults: ['allResults'],
    setCompleteResults: ['completeResults'],
    mergeAllResults: ['allResults']
  },
  { prefix: 'Event/' }
);
