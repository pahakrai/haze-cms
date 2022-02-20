import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PageTemplateTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PageTemplateTypes.SET_RESULTS]: setField('results', 'results'),
  [PageTemplateTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PageTemplateTypes.SET_SELECTED]: setField('selected', 'id'),
  [PageTemplateTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
