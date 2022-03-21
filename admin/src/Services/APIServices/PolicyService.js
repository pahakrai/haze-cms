import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPolicies = (query) => {
  return hazeApi.get('/policies?' + serialize(query))
}

const getPolicyById = (id, query) => {
  return hazeApi.get(`/policies/${id}?${serialize(query)}`)
}

const createPolicy = (formValues) => {
  return hazeApi.post(`/policies`, formValues)
}

const updatePolicy = (formValues) => {
  return hazeApi.put(`/policies/` + formValues._id, formValues)
}

export default {
  self: hazeApi,
  createPolicy,
  getPolicyById,
  getPolicies,
  updatePolicy
}
