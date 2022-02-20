import { ecommApi } from '../APIs';

const getThemeById = themeId => ecommApi.get('themes/' + themeId);

const getMyTheme = () => ecommApi.get('/themes/my-themes?scope=admin');

const getAllTheme = () => ecommApi.get('/themes');

export default {
  self: ecommApi,
  getThemeById,
  getMyTheme,
  getAllTheme
};
