import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { SystemReportTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  selected: null,
  searchTerm: '',
  allResults: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [SystemReportTypes.SET_RESULTS]: setField('results', 'results'),
  [SystemReportTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [SystemReportTypes.SET_ALL_RESULTS]: setField('allResults', 'allResults'),
  [SystemReportTypes.SET_SELECTED]: setField('selected', 'id'),
  [SystemReportTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm')
});
