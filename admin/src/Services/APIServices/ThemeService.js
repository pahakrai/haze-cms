import { hazeApi } from '../APIs'

const getThemeById = (themeId) => hazeApi.get('themes/' + themeId)

const getMyTheme = () => hazeApi.get('/themes/my-themes?scope=admin')

const getAllTheme = () => hazeApi.get('/themes')

export default {
  self: hazeApi,
  getThemeById,
  getMyTheme,
  getAllTheme
}
