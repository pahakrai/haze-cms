import { hazeApi } from '../APIs'

const getMenus = async () => await hazeApi.get('/web-menus?types[]=admin')

export default {
  getMenus
}
