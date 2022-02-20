import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { TunnelTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [TunnelTypes.SET_CREATED]: setField('created', 'id'),
  [TunnelTypes.SET_RESULTS]: setField('results', 'results'),
  [TunnelTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [TunnelTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [TunnelTypes.SET_SELECTED]: setField('selected', 'id')
});
