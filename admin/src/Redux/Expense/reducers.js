import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ExpenseTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  created: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [ExpenseTypes.SET_CREATED]: setField('created', 'id'),
  [ExpenseTypes.SET_RESULTS]: setField('results', 'results'),
  [ExpenseTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [ExpenseTypes.SET_SELECTED]: setField('selected', 'id')
});
