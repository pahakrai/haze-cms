import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UnitOfMeasureTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  allResults: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [UnitOfMeasureTypes.SET_RESULTS]: setField('results', 'results'),
  [UnitOfMeasureTypes.SET_ALL_RESULTS]: setField('allResults', 'results'),
  [UnitOfMeasureTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [UnitOfMeasureTypes.SET_SELECTED]: setField('selected', 'id'),
  [UnitOfMeasureTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
