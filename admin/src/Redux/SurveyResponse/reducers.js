import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SurveyResponseTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [SurveyResponseTypes.SET_RESULTS]: setField('results', 'results'),
  [SurveyResponseTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [SurveyResponseTypes.SET_SELECTED]: setField('selected', 'id'),
  [SurveyResponseTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
