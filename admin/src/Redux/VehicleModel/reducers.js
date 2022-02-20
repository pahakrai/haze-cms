import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { VehicleModelTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [VehicleModelTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [VehicleModelTypes.SET_RESULTS]: setField('results', 'results'),
  [VehicleModelTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
