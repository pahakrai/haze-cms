import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ExpenseTypeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  allResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [ExpenseTypeTypes.SET_RESULTS]: setField('results', 'results'),
  [ExpenseTypeTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [ExpenseTypeTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
