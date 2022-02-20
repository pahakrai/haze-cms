import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UserTypes } from './actions';
import { setField, mergeArray, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  allResults: [],
  results: [],
  searchResults: [],
  searchListResults: [],
  searchFilters: {},
  userTypes: [],
  userGroups: [],
  selected: null,
  deleted: null,
  created: null
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [UserTypes.SET_RESULTS]: setField('results', 'results'),
  [UserTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [UserTypes.MERGE_ALL_RESULTS]: mergeArray('allResults'),
  [UserTypes.SET_SEARCH_RESULTS]: setField('searchResults', 'results'),
  [UserTypes.SET_SEARCH_LIST_RESULTS]: setField('searchListResults', 'results'),
  [UserTypes.SET_SEARCH_FILTERS]: setField('searchFilters', 'searchFilters'),
  [UserTypes.SET_CREATED]: setField('created', 'id'),
  [UserTypes.SET_SELECTED]: setField('selected', 'id'),
  [UserTypes.SET_DELETED]: setField('deleted', 'id'),
  [UserTypes.SET_USER_TYPE]: setField('userType', 'userType'),
  [UserTypes.SET_USER_GROUPS]: setField('userGroups', 'userGroups')
});
