import { ecommApi } from '../APIs';

const getWebMenus = async () => await ecommApi.get('/web-menus?types[]=admin');

const allowAccess = async body =>
  await ecommApi.post('/web-menus/allow-access', body, {
    notRetry: true,
    notRefreshToken: true
  });

export default {
  self: ecommApi,
  getWebMenus,
  allowAccess
};
