import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { MemberTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [MemberTypes.SET_RESULTS]: setField('results', 'results'),
  [MemberTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [MemberTypes.SET_SELECTED]: setField('selected', 'id'),
  [MemberTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
