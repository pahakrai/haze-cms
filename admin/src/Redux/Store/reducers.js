import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { StoreTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [StoreTypes.SET_RESULTS]: setField('results', 'results'),
  [StoreTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [StoreTypes.SET_SELECTED]: setField('selected', 'id'),
  [StoreTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
