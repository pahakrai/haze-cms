import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PaymentMethodTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  allResults: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PaymentMethodTypes.SET_RESULTS]: setField('results', 'results'),
  [PaymentMethodTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [PaymentMethodTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PaymentMethodTypes.SET_SELECTED]: setField('selected', 'id'),
  [PaymentMethodTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
