import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ServiceTypeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [ServiceTypeTypes.SET_RESULTS]: setField('results', 'results'),
  [ServiceTypeTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
