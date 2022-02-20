import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { HolidayTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [HolidayTypes.SET_RESULTS]: setField('results', 'results'),
  [HolidayTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
