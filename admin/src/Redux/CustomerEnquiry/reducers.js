import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CustomerEnquiryTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */
/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [CustomerEnquiryTypes.SET_CREATED]: setField('created', 'id'),
  [CustomerEnquiryTypes.SET_RESULTS]: setField('results', 'results'),
  [CustomerEnquiryTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [CustomerEnquiryTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [CustomerEnquiryTypes.SET_SELECTED]: setField('selected', 'id')
});
