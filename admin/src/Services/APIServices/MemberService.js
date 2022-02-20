import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getMembers = opts => {
  return ecommApi.get('/members?' + serialize(opts));
};

const getMemberById = id => {
  return ecommApi.get('/members/' + id);
};

const createMember = formValues => {
  return ecommApi.post(`/members`, formValues);
};

const updateMember = formValues => {
  return ecommApi.put(`/members/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createMember,
  getMemberById,
  getMembers,
  updateMember
};
