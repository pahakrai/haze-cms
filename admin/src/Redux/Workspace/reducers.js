import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WorkspaceTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  created: null,
  allResults: []
});

export default createReducer(INITIAL_STATE, {
  [WorkspaceTypes.SET_CREATED]: setField('created', 'id'),
  [WorkspaceTypes.SET_RESULTS]: setField('results', 'results'),
  [WorkspaceTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  // [WorkspaceTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [WorkspaceTypes.SET_SELECTED]: setField('selected', 'id'),
  [WorkspaceTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults')
});
