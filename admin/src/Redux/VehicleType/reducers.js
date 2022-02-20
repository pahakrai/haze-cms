import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { VehicleTypeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [VehicleTypeTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [VehicleTypeTypes.SET_RESULTS]: setField('results', 'results'),
  [VehicleTypeTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [VehicleTypeTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults')
});
