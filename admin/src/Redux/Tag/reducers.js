import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { TagTypes } from './actions';
import { setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  distinctResults: [],
  allDistinctResults: [],
  textResults: [],
  resultsByPostId: null,
  resultsByProductId: null,
  selected: null
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [TagTypes.SET_RESULTS]: setField('results', 'results'),
  [TagTypes.SET_DISTINCT_RESULTS]: setField(
    'distinctResults',
    'distinctResults'
  ),
  [TagTypes.SET_ALL_DISTINCT_RESULTS]: setField(
    'allDistinctResults',
    'allDistinctResults'
  ),
  [TagTypes.SET_TEXT_RESULTS]: setField('textResults', 'textResults'),
  [TagTypes.SET_RESULTS_BY_POST_ID]: setField('resultsByPostId', 'results'),
  [TagTypes.SET_RESULTS_BY_PRODUCT_ID]: setField(
    'resultsByProductId',
    'results'
  ),
  [TagTypes.SET_SELECTED]: setField('selected', 'id')
});
