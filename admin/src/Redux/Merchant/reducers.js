import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { MerchantTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: '',
  searchResults: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [MerchantTypes.SET_RESULTS]: setField('results', 'results'),
  [MerchantTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [MerchantTypes.SET_SELECTED]: setField('selected', 'id'),
  [MerchantTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [MerchantTypes.SET_SEARCH_RESULTS]: setField('searchResults', 'results')
});
