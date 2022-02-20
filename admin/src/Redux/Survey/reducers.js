import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SurveyTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [SurveyTypes.SET_RESULTS]: setField('results', 'results'),
  [SurveyTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [SurveyTypes.SET_SELECTED]: setField('selected', 'id'),
  [SurveyTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
