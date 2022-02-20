import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { AccountTypes } from './actions';
import { reset, setField } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  // user: null,
  verifyCodeToken: null,
  loginFromMode: null,
  loginFromHeaderWorkspace: null
  // validateToken: { userId: '', status: false }
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [AccountTypes.SET_LOGIN_FROM_MODE]: setField('loginFromMode', 'mode'),
  // [AccountTypes.SET_USER]: setField('user', 'user'),
  [AccountTypes.SET_VERIFY_CODE_TOKEN]: setField('verifyCodeToken', 'token'),
  [AccountTypes.SET_LOGIN_FROM_HEADER_WORKSPACE]: setField(
    'loginFromHeaderWorkspace',
    'workspace'
  ),
  // [AccountTypes.SET_VALIDATE_TOKEN]: setField('validateToken', 'validateToken'),
  [AccountTypes.RESET]: reset(INITIAL_STATE)
});
