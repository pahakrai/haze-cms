import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PriceTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [PriceTypes.SET_CREATED]: setField('created', 'id'),
  [PriceTypes.SET_RESULTS]: setField('results', 'results'),
  [PriceTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PriceTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  // [VehicleCategoryTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [PriceTypes.SET_SELECTED]: setField('selected', 'id')
});
