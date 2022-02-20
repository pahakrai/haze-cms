import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ResumeTypes } from './actions';
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
  [ResumeTypes.SET_RESULTS]: setField('results', 'results'),
  [ResumeTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ResumeTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [ResumeTypes.SET_SELECTED]: setField('selected', 'id')
});
