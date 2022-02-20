import { ecommApi } from '../APIs';

const getMenus = async () => await ecommApi.get('/web-menus?types[]=admin');

export default {
  getMenus
};
