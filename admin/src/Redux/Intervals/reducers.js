import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { IntervalsTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  allResults: [],
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [IntervalsTypes.SET_RESULTS]: setField('results', 'results'),
  [IntervalsTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [IntervalsTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
