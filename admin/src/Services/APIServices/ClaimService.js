import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getClaims = opts => {
  return ecommApi.get('/claims?' + serialize(opts));
};

const getClaimById = (id, query) => {
  return ecommApi.get('/claims/' + id + '?' + serialize(query));
};

const createClaim = formValues => {
  return ecommApi.post(`/claims`, formValues);
};

const getExamineClaim = (id, examine) => {
  return ecommApi.patch(`/claims/email/${id}`, examine);
};

const updateClaim = formValues => {
  return ecommApi.put(`/claims/` + formValues._id, formValues);
};

const approveClaim = id => ecommApi.patch(`claims/${id}/approve`);
const rejectClaim = (id, formValues) =>
  ecommApi.patch(`claims/${id}/decline`, formValues);
const appealClaim = id => ecommApi.patch(`claims/${id}/appeal`);

const deleteExpense = (claimId, expenseId) =>
  ecommApi.delete(`claims/${claimId}/remove/${expenseId}`);

export default {
  self: ecommApi,
  createClaim,
  approveClaim,
  getClaimById,
  getExamineClaim,
  getClaims,
  rejectClaim,
  appealClaim,
  updateClaim,
  deleteExpense
};
