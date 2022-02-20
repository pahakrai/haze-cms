import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getPayroll = opts => ecommApi.get('payrolls?' + serialize(opts));

const getPayeeUserType = () => ecommApi.get('payrolls/my-payee-usertype');

const getPayrollById = (id, query) => {
  return ecommApi.get('payrolls/' + id + '?' + serialize(query));
};

const createPayroll = formValues => {
  return ecommApi.post(`payrolls`, formValues);
};

const updatePayrollById = formValues =>
  ecommApi.put(`payrolls/${formValues.id}`, formValues.value);
const changeStatus = (id, status) =>
  ecommApi.put(`payrolls/${id}/status/${status}`);

const calculateAmount = formValues =>
  ecommApi.get('payrolls/calculate-amount?' + serialize(formValues));

const approvePayroll = (id, status) =>
  ecommApi.put(`payrolls/${id}/status/${status}`);
export default {
  getPayroll,
  getPayrollById,
  createPayroll,
  updatePayrollById,
  changeStatus,
  approvePayroll,
  getPayeeUserType,
  calculateAmount
};
