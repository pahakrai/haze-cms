import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getOrders = opts => {
  return ecommApi.get('/orders?' + serialize(opts));
};

const getOrderById = (id, query) => {
  return ecommApi.get('/orders/' + id + '?' + serialize(query));
};

const createOrder = formValues => {
  return ecommApi.post(`/orders`, formValues);
};

const updateOrder = formValues => {
  return ecommApi.put(`/orders/` + formValues._id, formValues);
};
const cancelOrder = id => {
  return ecommApi.put(`/orders/${id}/cancel`);
};
const updateOrderStatus = (id, status) => {
  return ecommApi.patch(`/orders/${id}/status/${status}`);
};
const releaseOrder = id => {
  return ecommApi.put(`/orders/${id}/release`);
};
const orderCharge = body => {
  return ecommApi.post(`/orders/charge`, body);
};

const getOrderByQuotationId = quotationId => {
  return ecommApi.get(`/orders/quotation/${quotationId}`);
};

const getOrderLogs = query => {
  return ecommApi.get(`/order-logs?` + serialize(query));
};

const updatePeopleInCharge = (isOrderIds, body) => {
  return ecommApi.put(`/orders/logistic/people-in-charge/${isOrderIds}`, body);
};

const getCbmAndRt = body => {
  return ecommApi.post(`/order-logistic-items/cbm/rt`, body);
};

const importOrder = (files, onUploadProgress) => {
  const data = new FormData();
  if (files?.values) files.values.forEach(f => data.append(`file`, f));
  return ecommApi.post(`orders/imports`, data, {
    onUploadProgress
  });
};

export default {
  self: ecommApi,
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
};
