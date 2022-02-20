import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WorkspaceSubscriptionTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [WorkspaceSubscriptionTypes.SET_RESULTS]: setField('results', 'results'),
  [WorkspaceSubscriptionTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [WorkspaceSubscriptionTypes.SET_SELECTED]: setField('selected', 'id'),
  [WorkspaceSubscriptionTypes.SET_SEARCH_TERM]: setField(
    'searchTerm',
    'searchTerm'
  )
});
