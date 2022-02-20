import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getExpenseTypes = search =>
  ecommApi.get('expense-types?' + serialize(search));

export const getExpenseTypeById = (id, search) =>
  ecommApi.get('expense-types/' + id + '?' + serialize(search));

const createExpenseType = expenseType => {
  return ecommApi.post(`expense-types`, expenseType);
};

const updateExpenseType = (id, expenseType) => {
  return ecommApi.put(`expense-types/${id}`, expenseType);
};

export const self = ecommApi;

export default {
  self: ecommApi,
  getExpenseTypes,
  getExpenseTypeById,
  updateExpenseType,
  createExpenseType
};
