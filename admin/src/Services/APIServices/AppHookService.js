import { hazeApi } from '../APIs'

const getAppHookByName = (name) => hazeApi.get(`/app-hooks?app=${name}`)

const getAllAppHook = () => hazeApi.get('/app-hooks')

const getAllAppHookName = () => hazeApi.get('/app-hooks/app-names')

export default {
  getAppHookByName,
  getAllAppHook,
  getAllAppHookName
}
