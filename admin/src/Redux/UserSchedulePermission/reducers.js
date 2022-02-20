import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UserSchedulePermissionTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: []
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [UserSchedulePermissionTypes.SET_RESULTS]: setField('results', 'results'),
  [UserSchedulePermissionTypes.MERGE_RESULTS]: mergeIds('results', 'results')
});
