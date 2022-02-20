import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { AppHookTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  nameResults: [],
  created: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */
/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [AppHookTypes.SET_CREATED]: setField('created', 'id'),
  [AppHookTypes.SET_RESULTS]: setField('results', 'results'),
  [AppHookTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [AppHookTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [AppHookTypes.SET_NAME_RESULTS]: setField('nameResults', 'nameResults'),
  [AppHookTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults'),
  [AppHookTypes.SET_SELECTED]: setField('selected', 'id')
});
