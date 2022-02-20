import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { VehicleCapabilityTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [VehicleCapabilityTypes.SET_ALL_RESULTS]: setField(
    'allResults',
    'allResults'
  ),
  [VehicleCapabilityTypes.SET_RESULTS]: setField('results', 'results'),
  [VehicleCapabilityTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
