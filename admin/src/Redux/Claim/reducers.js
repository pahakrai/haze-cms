import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ClaimTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [ClaimTypes.SET_RESULTS]: setField('results', 'results'),
  [ClaimTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ClaimTypes.SET_SELECTED]: setField('selected', 'id'),
  [ClaimTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
