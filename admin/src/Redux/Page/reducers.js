import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import BaseTheme from '../../Themes/BaseTheme';
import { PageTypes } from './actions';
import { setField, mergeIds } from '../utils/reducer';

export const INITIAL_STATE = Immutable({
  results: [],
  searchResults: [],
  selected: null,
  searchTerm: '',
  loginPageData: {
    backgroundImage: null,
    loginLogo: null,
    loginLogo2: null,
    workspaceName: null,
    workspaceCode: null
  }
});

/* ------------- Reducers ------------- */

const setLoginPageData = (state, { data = {} }) => {
  const { workspace } = data;
  const theme = BaseTheme;
  const images = (workspace && workspace.setting) || {};
  const newData = {
    ...(state.loginPageData || {}),
    backgroundImage:
      (images.loginBackgroundImage && images.loginBackgroundImage.uri) ||
      theme.images.bg_img,
    loginLogo:
      (images.headerLogo && images.headerLogo.uri) || theme.images.login_logo,
    loginLogo2: (images.logo && images.logo.uri) || theme.images.login_logo2,
    workspaceName: (workspace && workspace.name) || process.env.REACT_APP_NAME,
    workspaceCode: (workspace && workspace.code) || process.env.REACT_APP_NAME
  };

  return setField('loginPageData', 'newData')(state, { newData });
};
/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(INITIAL_STATE, {
  [PageTypes.SET_RESULTS]: setField('results', 'results'),
  [PageTypes.SET_SEARCH_RESULTS]: setField('searchResults', 'searchResults'),
  [PageTypes.MERGE_RESULTS]: mergeIds('results', 'results'),
  [PageTypes.SET_SELECTED]: setField('selected', 'id'),
  [PageTypes.SET_SEARCH_TERM]: setField('searchTerm', 'searchTerm'),
  [PageTypes.SET_LOGIN_PAGE_DATA]: setLoginPageData
});
