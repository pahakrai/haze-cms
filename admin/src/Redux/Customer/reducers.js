import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CustomerTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchResults: [],
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [CustomerTypes.SET_RESULTS]: setField('results', 'results'),
  [CustomerTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [CustomerTypes.SET_SELECTED]: setField('selected', 'id'),
  [CustomerTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [CustomerTypes.SET_SEARCH_RESULTS]: setField(
    'searchResults',
    'searchResults'
  ),
  [CustomerTypes.MERGE_SEARCH_RESULTS]: setField(
    'searchResults',
    'searchResults'
  )
});
