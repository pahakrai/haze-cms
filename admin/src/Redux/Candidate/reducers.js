import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CandidateTypes } from './actions';
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
  [CandidateTypes.SET_CREATED]: setField('created', 'id'),
  [CandidateTypes.SET_RESULTS]: setField('results', 'results'),
  [CandidateTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [CandidateTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [CandidateTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults'),
  [CandidateTypes.SET_SELECTED]: setField('selected', 'id')
});
