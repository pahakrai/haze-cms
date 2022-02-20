import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { FeedbackTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [FeedbackTypes.SET_RESULTS]: setField('results', 'results'),
  [FeedbackTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
