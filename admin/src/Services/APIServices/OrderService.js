import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getOrders = (opts) => {
  return hazeApi.get('/orders?' + serialize(opts))
}

const getOrderById = (id, query) => {
  return hazeApi.get('/orders/' + id + '?' + serialize(query))
}

const createOrder = (formValues) => {
  return hazeApi.post(`/orders`, formValues)
}

const updateOrder = (formValues) => {
  return hazeApi.put(`/orders/` + formValues._id, formValues)
}
const cancelOrder = (id) => {
  return hazeApi.put(`/orders/${id}/cancel`)
}
const updateOrderStatus = (id, status) => {
  return hazeApi.patch(`/orders/${id}/status/${status}`)
}
const releaseOrder = (id) => {
  return hazeApi.put(`/orders/${id}/release`)
}
const orderCharge = (body) => {
  return hazeApi.post(`/orders/charge`, body)
}

const getOrderByQuotationId = (quotationId) => {
  return hazeApi.get(`/orders/quotation/${quotationId}`)
}

const getOrderLogs = (query) => {
  return hazeApi.get(`/order-logs?` + serialize(query))
}

const updatePeopleInCharge = (isOrderIds, body) => {
  return hazeApi.put(`/orders/logistic/people-in-charge/${isOrderIds}`, body)
}

const getCbmAndRt = (body) => {
  return hazeApi.post(`/order-logistic-items/cbm/rt`, body)
}

const importOrder = (files, onUploadProgress) => {
  const data = new FormData()
  if (files?.values) files.values.forEach((f) => data.append(`file`, f))
  return hazeApi.post(`orders/imports`, data, {
    onUploadProgress
  })
}

export default {
  self: hazeApi,
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
  cancelOrder,
  updateOrderStatus,
  releaseOrder,
  orderCharge,
  getOrderByQuotationId,
  getOrderLogs,
  updatePeopleInCharge,
  getCbmAndRt,
  importOrder
}
