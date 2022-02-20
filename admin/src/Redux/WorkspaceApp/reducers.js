import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WorkspaceAppTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [WorkspaceAppTypes.SET_RESULTS]: setField('results', 'results'),
  [WorkspaceAppTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [WorkspaceAppTypes.SET_SELECTED]: setField('selected', 'id'),
  [WorkspaceAppTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
