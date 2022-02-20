import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ProductTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  searchResults: [],
  selected: null,
  searchTerm: '',
  imported: false
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [ProductTypes.SET_RESULTS]: setField('results', 'results'),
  [ProductTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ProductTypes.SET_SELECTED]: setField('selected', 'id'),
  [ProductTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [ProductTypes.SET_SEARCH_RESULTS]: setField('searchResults', 'searchResults'),
  [ProductTypes.SET_IMPORTED]: setField('imported', 'import')
});
