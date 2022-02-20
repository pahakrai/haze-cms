import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getPaymentMethods = opts => {
  return ecommApi.get('/payment-methods?' + serialize(opts));
};

const getPaymentMethodById = id => {
  return ecommApi.get('/payment-methods/' + id);
};

const createPaymentMethod = formValues => {
  return ecommApi.post(`/payment-methods`, formValues);
};

const updatePaymentMethod = formValues => {
  return ecommApi.put(`/payment-methods/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createPaymentMethod,
  getPaymentMethodById,
  getPaymentMethods,
  updatePaymentMethod
};
