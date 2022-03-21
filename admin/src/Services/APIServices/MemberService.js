import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getMembers = (opts) => {
  return hazeApi.get('/members?' + serialize(opts))
}

const getMemberById = (id) => {
  return hazeApi.get('/members/' + id)
}

const createMember = (formValues) => {
  return hazeApi.post(`/members`, formValues)
}

const updateMember = (formValues) => {
  return hazeApi.put(`/members/` + formValues._id, formValues)
}

export default {
  self: hazeApi,
  createMember,
  getMemberById,
  getMembers,
  updateMember
}
