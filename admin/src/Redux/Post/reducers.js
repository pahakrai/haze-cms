import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { PostTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: '',
  deleted: null,
  created: null,
  editForm: null
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PostTypes.SET_RESULTS]: setField('results', 'results'),
  [PostTypes.SET_CREATED]: setField('created', 'id'),
  [PostTypes.SET_SELECTED]: setField('selected', 'id'),
  [PostTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [PostTypes.SET_EDIT_FORM]: setField('editForm', 'post'),
  [PostTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
