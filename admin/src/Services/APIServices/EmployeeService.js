import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getEmployees = opts => {
  return ecommApi.get('/employees?' + serialize(opts));
};

const getEmployeeById = id => {
  return ecommApi.get('/employees/' + id);
};

const getEmployeeByUserId = userId => {
  return ecommApi.get('/employees/user/' + userId);
};

const createEmployee = formValues => {
  return ecommApi.post(`/employees`, formValues);
};

const updateEmployee = formValues => {
  return ecommApi.put(`/employees/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createEmployee,
  getEmployeeById,
  getEmployeeByUserId,
  getEmployees,
  updateEmployee
};
