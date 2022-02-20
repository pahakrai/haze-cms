import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UserGroupTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [UserGroupTypes.SET_RESULTS]: setField('results', 'results'),
  [UserGroupTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
