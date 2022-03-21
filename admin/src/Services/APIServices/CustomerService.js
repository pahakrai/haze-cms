import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getCustomers = (opts) => {
  return hazeApi.get('/customers?' + serialize(opts))
}

const getCustomerById = (id) => {
  return hazeApi.get('/customers/' + id)
}

const createCustomer = (formValues) => {
  return hazeApi.post(`/customers`, formValues)
}

const updateCustomer = (formValues) => {
  return hazeApi.put(`/customers/` + formValues._id, formValues)
}

export default {
  self: hazeApi,
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer
}
