import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { StoreTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [StoreTypes.SET_RESULTS]: setField('results', 'results'),
  [StoreTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [StoreTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
