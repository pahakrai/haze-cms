import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getQuotations = opts => {
  return ecommApi.get('/quotations?' + serialize(opts));
};

const getQuotationById = (id, query) => {
  return ecommApi.get('/quotations/' + id + '?' + serialize(query));
};

const createQuotation = formValues => {
  return ecommApi.post(`/quotations`, formValues);
};

const updateQuotation = formValues => {
  return ecommApi.put(`/quotations/` + formValues._id, formValues);
};

const quotationCharge = body => {
  return ecommApi.post(`/quotations/charge`, body);
};

const orderCharge = body => {
  return ecommApi.post(`/orders/charge`, body);
};

const convertToOrder = (id, body) => {
  return ecommApi.post(`/quotations/toOrder/` + id, body);
};

export default {
  self: ecommApi,
  createQuotation,
  getQuotationById,
  getQuotations,
  updateQuotation,
  quotationCharge,
  orderCharge,
  convertToOrder
};
