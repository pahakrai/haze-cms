import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { LogTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: []
});

export default createReducer(INITIAL_STATE, {
  [LogTypes.SET_RESULTS]: setField('results', 'results'),
  [LogTypes.SET_SELECTED]: setField('selected', 'id'),
  [LogTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
