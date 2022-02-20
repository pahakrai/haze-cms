import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { EmployeeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  searchResults: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [EmployeeTypes.SET_RESULTS]: setField('results', 'results'),
  [EmployeeTypes.SET_SEARCH_RESULTS]: setField(
    'searchResults',
    'searchResults'
  ),
  [EmployeeTypes.MERGE_SEARCH_RESULTS]: setField(
    'searchResults',
    'searchResults'
  ),
  [EmployeeTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [EmployeeTypes.SET_SELECTED]: setField('selected', 'id'),
  [EmployeeTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
