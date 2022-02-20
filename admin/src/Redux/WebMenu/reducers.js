import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { WebMenuTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [WebMenuTypes.SET_RESULTS]: setField('results', 'results'),
  [WebMenuTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
