import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WorkspaceSubscriptionPlanTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  allResults: [],
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [WorkspaceSubscriptionPlanTypes.SET_RESULTS]: setField('results', 'results'),
  [WorkspaceSubscriptionPlanTypes.MERGE_RESULTS]: mergeIds(
    'results',
    'results'
  ),
  [WorkspaceSubscriptionPlanTypes.SET_ALL_RESULTS]: setField(
    'allResults',
    'allResults'
  ),

  [WorkspaceSubscriptionPlanTypes.SET_SELECTED]: setField('selected', 'id'),
  [WorkspaceSubscriptionPlanTypes.SET_SEARCH_TERM]: setField(
    'searchTerm',
    'searchTerm'
  )
});
