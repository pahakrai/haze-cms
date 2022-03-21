import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getUserGroups = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get('/groups?' + queryString)
  return response
}

const createUserGroup = (invoice) => {
  return hazeApi.post(`groups`, invoice)
}

const updateUserGroup = (_id, invoice) => {
  return hazeApi.put(`groups/${_id}`, invoice)
}

const getUserGroupById = (id, query) =>
  hazeApi.get(`groups/${id}?${serialize(query)}`)

const duplicateName = (name, _id) =>
  hazeApi.get(`groups/duplicate-name/${name}/${_id}`)

const deleteUserGroup = (_id) => hazeApi.delete(`groups/${_id}`)

export default {
  createUserGroup,
  getUserGroups,
  updateUserGroup,
  getUserGroupById,
  duplicateName,
  deleteUserGroup
}
