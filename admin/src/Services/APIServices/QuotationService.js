import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getQuotations = (opts) => {
  return hazeApi.get('/quotations?' + serialize(opts))
}

const getQuotationById = (id, query) => {
  return hazeApi.get('/quotations/' + id + '?' + serialize(query))
}

const createQuotation = (formValues) => {
  return hazeApi.post(`/quotations`, formValues)
}

const updateQuotation = (formValues) => {
  return hazeApi.put(`/quotations/` + formValues._id, formValues)
}

const quotationCharge = (body) => {
  return hazeApi.post(`/quotations/charge`, body)
}

const orderCharge = (body) => {
  return hazeApi.post(`/orders/charge`, body)
}

const convertToOrder = (id, body) => {
  return hazeApi.post(`/quotations/toOrder/` + id, body)
}

export default {
  self: hazeApi,
  createQuotation,
  getQuotationById,
  getQuotations,
  updateQuotation,
  quotationCharge,
  orderCharge,
  convertToOrder
}
