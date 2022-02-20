import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CourierTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [CourierTypes.SET_RESULTS]: setField('results', 'results'),
  [CourierTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [CourierTypes.SET_SELECTED]: setField('selected', 'id'),
  [CourierTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
