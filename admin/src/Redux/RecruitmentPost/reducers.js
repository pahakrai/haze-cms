import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { RecruitmentPostTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: ''
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [RecruitmentPostTypes.SET_RESULTS]: setField('results', 'results'),
  [RecruitmentPostTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [RecruitmentPostTypes.SET_SELECTED]: setField('selected', 'id'),
  [RecruitmentPostTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
