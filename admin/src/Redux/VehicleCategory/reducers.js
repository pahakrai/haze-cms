import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { VehicleCategoryTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [VehicleCategoryTypes.SET_CREATED]: setField('created', 'id'),
  [VehicleCategoryTypes.SET_RESULTS]: setField('results', 'results'),
  [VehicleCategoryTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  // [VehicleCategoryTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [VehicleCategoryTypes.SET_SELECTED]: setField('selected', 'id')
});
