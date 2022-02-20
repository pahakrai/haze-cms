import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WorkspacePaymentMethodTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  allResults: [],
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [WorkspacePaymentMethodTypes.SET_RESULTS]: setField('results', 'results'),
  [WorkspacePaymentMethodTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [WorkspacePaymentMethodTypes.SET_SELECTED]: setField('selected', 'id'),
  [WorkspacePaymentMethodTypes.SET_SEARCH_TERM]: setField(
    'searchTerm',
    'searchTerm'
  ),
  [WorkspacePaymentMethodTypes.SET_ALL_RESULTS]: setField(
    'allResults',
    'allResults'
  )
});
