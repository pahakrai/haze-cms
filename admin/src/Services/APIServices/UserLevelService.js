import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getUserLevels = (opts) => {
  return hazeApi.get('/user-levels?' + serialize(opts))
}

const getUserLevelById = (id, opts) => {
  return hazeApi.get(`/user-levels/${id}?` + serialize(opts))
}

const createUserLevel = (userLevel) => {
  return hazeApi.post(`user-levels`, userLevel)
}
const updateUserLevel = (userLevel) => {
  return hazeApi.put(`user-levels/${userLevel._id}`, userLevel)
}

export default {
  self: hazeApi,
  createUserLevel,
  getUserLevelById,
  getUserLevels,
  updateUserLevel
}
