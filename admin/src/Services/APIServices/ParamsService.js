import { hazeApi } from '../APIs'

const getParamAvatar = () => hazeApi.get('params/by-type/user_avatar')
const getParamMobileURINavigation = () =>
  hazeApi.get('params/?type=MobileURINavigation')

const getEdmTemplates = () => hazeApi.get('params/?type=EdmTemplate')

const getPreferenceLanguage = () =>
  hazeApi.get(`/params/?type=PreferenceLanguage`)

export default {
  getParamAvatar,
  getParamMobileURINavigation,
  getEdmTemplates,
  getPreferenceLanguage
}
