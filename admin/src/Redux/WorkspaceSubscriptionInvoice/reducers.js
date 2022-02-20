import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WorkspaceSubscriptionInvoiceTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [WorkspaceSubscriptionInvoiceTypes.SET_RESULTS]: setField(
    'results',
    'results'
  ),
  [WorkspaceSubscriptionInvoiceTypes.MERGE_RESULTS]: mergeIds(
    'results',
    'results'
  ),
  [WorkspaceSubscriptionInvoiceTypes.SET_SELECTED]: setField('selected', 'id'),
  [WorkspaceSubscriptionInvoiceTypes.SET_SEARCH_TERM]: setField(
    'searchTerm',
    'searchTerm'
  )
});
