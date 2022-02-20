import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getCustomers = opts => {
  return ecommApi.get('/customers?' + serialize(opts));
};

const getCustomerById = id => {
  return ecommApi.get('/customers/' + id);
};

const createCustomer = formValues => {
  return ecommApi.post(`/customers`, formValues);
};

const updateCustomer = formValues => {
  return ecommApi.put(`/customers/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer
};
