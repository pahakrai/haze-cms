import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { GangTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [GangTypes.SET_RESULTS]: setField('results', 'results'),
  [GangTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [GangTypes.SET_SELECTED]: setField('selected', 'id'),
  [GangTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
