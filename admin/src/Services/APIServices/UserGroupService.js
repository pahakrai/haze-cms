import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUserGroups = async query => {
  const queryString = serialize(query);
  const response = await ecommApi.get('/groups?' + queryString);
  return response;
};

const createUserGroup = invoice => {
  return ecommApi.post(`groups`, invoice);
};

const updateUserGroup = (_id, invoice) => {
  return ecommApi.put(`groups/${_id}`, invoice);
};

const getUserGroupById = (id, query) =>
  ecommApi.get(`groups/${id}?${serialize(query)}`);

const duplicateName = (name, _id) =>
  ecommApi.get(`groups/duplicate-name/${name}/${_id}`);

const deleteUserGroup = _id => ecommApi.delete(`groups/${_id}`);

export default {
  createUserGroup,
  getUserGroups,
  updateUserGroup,
  getUserGroupById,
  duplicateName,
  deleteUserGroup
};
