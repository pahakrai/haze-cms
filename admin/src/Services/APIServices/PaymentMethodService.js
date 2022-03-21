import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPaymentMethods = (opts) => {
  return hazeApi.get('/payment-methods?' + serialize(opts))
}

const getPaymentMethodById = (id) => {
  return hazeApi.get('/payment-methods/' + id)
}

const createPaymentMethod = (formValues) => {
  return hazeApi.post(`/payment-methods`, formValues)
}

const updatePaymentMethod = (formValues) => {
  return hazeApi.put(`/payment-methods/` + formValues._id, formValues)
}

export default {
  self: hazeApi,
  createPaymentMethod,
  getPaymentMethodById,
  getPaymentMethods,
  updatePaymentMethod
}
