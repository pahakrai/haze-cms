import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CouponTypes } from './actions';
import { setField, mergeIds, mergeArray } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  created: null,
  searchTerm: '',
  editForm: null,
  searchResults: [],
  allResults: []
});

export default createReducer(INITIAL_STATE, {
  [CouponTypes.SET_CREATED]: setField('created', 'id'),
  [CouponTypes.SET_RESULTS]: setField('results', 'results'),
  [CouponTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [CouponTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [CouponTypes.SET_EDIT_FORM]: setField('editForm', 'coupon'),
  [CouponTypes.SET_SELECTED]: setField('selected', 'id'),
  [CouponTypes.MERGE_ALL_RESULTS]: mergeArray('allResults'),
  [CouponTypes.SET_SEARCH_RESULTS]: setField('searchResults', 'results')
});
