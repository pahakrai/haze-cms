import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PaymentTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PaymentTypes.SET_RESULTS]: setField('results', 'results'),
  [PaymentTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PaymentTypes.SET_SELECTED]: setField('selected', 'id'),
  [PaymentTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
