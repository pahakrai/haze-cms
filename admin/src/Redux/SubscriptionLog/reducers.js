import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SubscriptionLogTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: '',
  allResults: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [SubscriptionLogTypes.SET_RESULTS]: setField('results', 'results'),
  [SubscriptionLogTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [SubscriptionLogTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults')
});
