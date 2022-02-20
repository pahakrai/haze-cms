import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PageSectionTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PageSectionTypes.SET_RESULTS]: setField('results', 'results'),
  [PageSectionTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PageSectionTypes.SET_SELECTED]: setField('selected', 'id'),
  [PageSectionTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
