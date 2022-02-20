import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUserFollowCount = async userId => {
  return await ecommApi.get(`followers/${userId}/count`);
};

const getUserFollowers = async (userId, query) => {
  return await ecommApi.get(
    `followers/${userId}/followers?` + serialize(query)
  );
};

const getUserFollowings = async (userId, query) => {
  return await ecommApi.get(
    `followers/${userId}/followings?` + serialize(query)
  );
};
export default {
  self: ecommApi,
  getUserFollowCount,
  getUserFollowers,
  getUserFollowings
};
