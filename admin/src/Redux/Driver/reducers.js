import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { DriverTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [DriverTypes.SET_CREATED]: setField('created', 'id'),
  [DriverTypes.SET_RESULTS]: setField('results', 'results'),
  [DriverTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [DriverTypes.SET_SELECTED]: setField('selected', 'id')
});
