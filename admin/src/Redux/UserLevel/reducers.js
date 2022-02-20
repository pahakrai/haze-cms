import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UserLevelTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

export default createReducer(INITIAL_STATE, {
  [UserLevelTypes.SET_RESULTS]: setField('results', 'results'),
  [UserLevelTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [UserLevelTypes.SET_SELECTED]: setField('selected', 'id'),
  [UserLevelTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
