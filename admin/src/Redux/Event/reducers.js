import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { EventTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  allResults: [],
  completeResults: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [EventTypes.SET_RESULTS]: setField('results', 'results'),
  [EventTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [EventTypes.SET_SELECTED]: setField('selected', 'id'),
  [EventTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [EventTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [EventTypes.SET_COMPLETE_RESULTS]: setField(
    'completeResults',
    'completeResults'
  ),
  [EventTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults')
});
