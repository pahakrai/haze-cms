import { hazeApi } from '../APIs'

const getWebMenus = async () => await hazeApi.get('/web-menus?types[]=admin')

const allowAccess = async (body) =>
  await hazeApi.post('/web-menus/allow-access', body, {
    notRetry: true,
    notRefreshToken: true
  })

export default {
  self: hazeApi,
  getWebMenus,
  allowAccess
}
