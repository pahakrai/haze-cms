import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getUserVehicleList = async (opts) => {
  const response = await hazeApi.get('/user-vehicles?' + serialize(opts))
  return response
}

export default {
  getUserVehicleList
}
