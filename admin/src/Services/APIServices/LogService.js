import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getLogs = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get('/logs?' + queryString)
  return response
}

export default {
  self: hazeApi,
  getLogs
}
