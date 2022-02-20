import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { VehicleMakeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [VehicleMakeTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [VehicleMakeTypes.SET_RESULTS]: setField('results', 'results'),
  [VehicleMakeTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
