import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ProductTypeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  allResults: [],
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [ProductTypeTypes.SET_RESULTS]: setField('results', 'results'),
  [ProductTypeTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ProductTypeTypes.SET_SELECTED]: setField('selected', 'id'),
  [ProductTypeTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [ProductTypeTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults')
});
