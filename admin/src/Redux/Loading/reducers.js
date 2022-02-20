import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { LoadingTypes } from './actions';

export const INITIAL_STATE = Immutable({
  partners: false,
  partnerForm: false,
  userList: false,
  getSubscriptionByWorkspaceId: false,
  searchWorkspaceBranchs: false,
  webMenus: false,
  accountWorkspace: false
});

const setLoading = (state, { field, isLoading }) => state.set(field, isLoading);

export default createReducer(INITIAL_STATE, {
  [LoadingTypes.SET_LOADING]: setLoading
});
