import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { VehicleTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  searchSelectResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [VehicleTypes.SET_CREATED]: setField('created', 'id'),
  [VehicleTypes.SET_RESULTS]: setField('results', 'results'),
  [VehicleTypes.SET_SEARCH_SELECT_RESULTS]: setField(
    'searchSelectResults',
    'searchSelectResults'
  ),
  [VehicleTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [VehicleTypes.SET_SELECTED]: setField('selected', 'id')
});
