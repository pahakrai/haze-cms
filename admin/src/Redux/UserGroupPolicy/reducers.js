import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { UserGroupPolicyTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  accessPermissions: {}
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

const setAccessPermission = (state, { AccessKey, value }) =>
  state.setIn(['accessPermissions', AccessKey], value);

export default createReducer(INITIAL_STATE, {
  [UserGroupPolicyTypes.SET_RESULTS]: setField('results', 'results'),
  [UserGroupPolicyTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [UserGroupPolicyTypes.SET_ACCESS_PERMISSION]: setAccessPermission
});
