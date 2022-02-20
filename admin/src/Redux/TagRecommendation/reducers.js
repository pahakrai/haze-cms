import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { TagRecommendationTypes } from './actions';
import { setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [TagRecommendationTypes.SET_RESULTS]: setField('results', 'results')
});
