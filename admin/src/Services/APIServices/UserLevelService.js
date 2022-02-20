import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUserLevels = opts => {
  return ecommApi.get('/user-levels?' + serialize(opts));
};

const getUserLevelById = (id, opts) => {
  return ecommApi.get(`/user-levels/${id}?` + serialize(opts));
};

const createUserLevel = userLevel => {
  return ecommApi.post(`user-levels`, userLevel);
};
const updateUserLevel = userLevel => {
  return ecommApi.put(`user-levels/${userLevel._id}`, userLevel);
};

export default {
  self: ecommApi,
  createUserLevel,
  getUserLevelById,
  getUserLevels,
  updateUserLevel
};
