import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ServiceTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */
/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [ServiceTypes.SET_CREATED]: setField('created', 'id'),
  [ServiceTypes.SET_RESULTS]: setField('results', 'results'),
  [ServiceTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ServiceTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [ServiceTypes.SET_SELECTED]: setField('selected', 'id')
});
