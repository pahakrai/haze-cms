import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getPolicies = query => {
  return ecommApi.get('/policies?' + serialize(query));
};

const getPolicyById = (id, query) => {
  return ecommApi.get(`/policies/${id}?${serialize(query)}`);
};

const createPolicy = formValues => {
  return ecommApi.post(`/policies`, formValues);
};

const updatePolicy = formValues => {
  return ecommApi.put(`/policies/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createPolicy,
  getPolicyById,
  getPolicies,
  updatePolicy
};
