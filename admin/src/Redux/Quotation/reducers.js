import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { QuotationTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [QuotationTypes.SET_RESULTS]: setField('results', 'results'),
  [QuotationTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [QuotationTypes.SET_SELECTED]: setField('selected', 'id'),
  [QuotationTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
