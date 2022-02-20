import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SubjectTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */
/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [SubjectTypes.SET_CREATED]: setField('created', 'id'),
  [SubjectTypes.SET_RESULTS]: setField('results', 'results'),
  [SubjectTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [SubjectTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [SubjectTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults'),
  [SubjectTypes.SET_SELECTED]: setField('selected', 'id')
});
