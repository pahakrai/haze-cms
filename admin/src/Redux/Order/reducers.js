import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { OrderTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [OrderTypes.SET_RESULTS]: setField('results', 'results'),
  [OrderTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [OrderTypes.SET_SELECTED]: setField('selected', 'id'),
  [OrderTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
