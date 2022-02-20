import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { reset } from '../utils/reducer';
import { setField } from '../utils/reducer';
import { ErrorTypes } from './actions';

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // login: null,
  changeWorkspace: null,
  searchProductBySku: null,
  getPosts: null,
  getTags: null,
  deleteFileMeta: null,
  getUser: null,
  getProductById: null,
  reset: null
});

/* ------------- Reducers ------------- */

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  // [ErrorTypes.SET_LOGIN_ERROR]: setField("login", "errors"),
  [ErrorTypes.RESET]: reset(INITIAL_STATE),
  [ErrorTypes.SET_CHANGE_WORKSPACE_ERRORS]: setField(
    'changeWorkspace',
    'errors'
  ),
  [ErrorTypes.SET_GET_USER_ERRORS]: setField('getUser', 'errors'),
  [ErrorTypes.SET_GET_PRODUCT_ERRORS]: setField('getProductById', 'errors'),
  [ErrorTypes.SET_DELETE_FILE_META_ERRORS]: setField('deleteFileMeta', 'errors')
});
