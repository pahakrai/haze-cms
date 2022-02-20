import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UserTypeTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  selected: null,
  results: [],
  searchSelectResults: [],
  created: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [UserTypeTypes.SET_CREATED]: setField('created', 'id'),
  [UserTypeTypes.SET_RESULTS]: setField('results', 'results'),
  [UserTypeTypes.SET_SEARCH_SELECT_RESULTS]: setField(
    'searchSelectResults',
    'searchSelectResults'
  ),
  [UserTypeTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [UserTypeTypes.SET_SELECTED]: setField('selected', 'id')
});
