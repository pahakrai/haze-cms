import { ecommApi } from '../APIs';

const getParamAvatar = () => ecommApi.get('params/by-type/user_avatar');
const getParamMobileURINavigation = () =>
  ecommApi.get('params/?type=MobileURINavigation');

const getEdmTemplates = () => ecommApi.get('params/?type=EdmTemplate');

const getPreferenceLanguage = () =>
  ecommApi.get(`/params/?type=PreferenceLanguage`);

export default {
  getParamAvatar,
  getParamMobileURINavigation,
  getEdmTemplates,
  getPreferenceLanguage
};
