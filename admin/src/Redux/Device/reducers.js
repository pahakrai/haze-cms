import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { DeviceTypes } from './actions';
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
  [DeviceTypes.SET_CREATED]: setField('created', 'id'),
  [DeviceTypes.SET_RESULTS]: setField('results', 'results'),
  [DeviceTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [DeviceTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [DeviceTypes.MERGE_ALL_RESULTS]: mergeIds('allResults', 'allResults'),
  [DeviceTypes.SET_SELECTED]: setField('selected', 'id')
});
