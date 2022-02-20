import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ProductSkuTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  searchResults: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [ProductSkuTypes.SET_RESULTS]: setField('results', 'results'),
  [ProductSkuTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ProductSkuTypes.SET_SELECTED]: setField('selected', 'id'),
  [ProductSkuTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [ProductSkuTypes.SET_SEARCH_RESULTS]: setField(
    'searchResults',
    'searchResults'
  )
});
