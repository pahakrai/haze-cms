import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { EventAttendanceTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  allResult: [],
  selected: null,
  searchTerm: '',
  snapshot: null
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [EventAttendanceTypes.SET_RESULTS]: setField('results', 'results'),
  [EventAttendanceTypes.SET_ALL_RESULT]: setField('allResult', 'allResult'),
  [EventAttendanceTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [EventAttendanceTypes.SET_EVENT_SNAPSHOT]: setField('snapshot', 'data'),
  [EventAttendanceTypes.SET_SELECTED]: setField('selected', 'id'),
  [EventAttendanceTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
