import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SalesVolumeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [SalesVolumeTypes.SET_CREATED]: setField('created', 'id'),
  [SalesVolumeTypes.SET_RESULTS]: setField('results', 'results'),
  [SalesVolumeTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [SalesVolumeTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [SalesVolumeTypes.SET_SELECTED]: setField('selected', 'id')
});
