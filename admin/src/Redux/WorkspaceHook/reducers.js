import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WorkspaceHookTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  allResults: [],
  results: [],
  searchResults: [],
  selected: null,
  created: null
});

export default createReducer(INITIAL_STATE, {
  [WorkspaceHookTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [WorkspaceHookTypes.SET_RESULTS]: setField('results', 'results'),
  [WorkspaceHookTypes.SET_SEARCH_RESULTS]: setField(
    'searchResults',
    'searchResults'
  ),
  [WorkspaceHookTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
