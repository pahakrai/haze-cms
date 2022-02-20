import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getExpenses = query => ecommApi.get(`expenses?` + serialize(query));
const getExpenseById = (id, query) =>
  ecommApi.get(`expenses/` + id + '?' + serialize(query));
const createExpense = (expense, files = []) => {
  const data = new FormData();
  if (files[0]) {
    data.append(`files`, files[0]);
  }
  const stringtifyBody = JSON.stringify(expense);
  data.append('expense', stringtifyBody);
  return ecommApi.post(`expenses`, data);
};

const updateExpense = (expense, files = []) => {
  const data = new FormData();
  if (files[0]) {
    data.append(`files`, files[0]);
  }
  const stringtifyBody = JSON.stringify(expense);
  data.append('expense', stringtifyBody);
  return ecommApi.put('expenses/' + expense._id, data);
};

const claimExpense = id => ecommApi.patch(`expenses/${id}/approve`);
const rejectExpense = (id, options) =>
  ecommApi.patch(`expenses/${id}/decline`, options);
const appealExpense = id => ecommApi.patch(`expenses/${id}/appeal`);

const deleteExpense = expenseId => ecommApi.delete(`expenses/${expenseId}`);

const updateStatus = (id, status) =>
  ecommApi.patch(`expenses/${id}/${status}/status`);

const getUnClaimExpenses = query =>
  ecommApi.get(`expenses/find/unClaim?` + serialize(query));

export default {
  self: ecommApi,
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  rejectExpense,
  claimExpense,
  appealExpense,
  deleteExpense,
  updateStatus,
  getUnClaimExpenses
};
