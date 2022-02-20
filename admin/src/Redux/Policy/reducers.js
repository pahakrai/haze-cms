import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PolicyTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PolicyTypes.SET_RESULTS]: setField('results', 'results'),
  [PolicyTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PolicyTypes.SET_SELECTED]: setField('selected', 'id'),
  [PolicyTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
