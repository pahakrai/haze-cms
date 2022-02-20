import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { setField, mergeIds } from '../utils/reducer';
import { WorkspacePhoneRegionsTypes } from './actions';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [WorkspacePhoneRegionsTypes.SET_RESULTS]: setField('results', 'results'),
  [WorkspacePhoneRegionsTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [WorkspacePhoneRegionsTypes.SET_SELECTED]: setField('selected', 'id'),
  [WorkspacePhoneRegionsTypes.SET_SEARCH_TERM]: setField(
    'searchTerm',
    'searchTerm'
  )
});
