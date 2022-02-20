import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUserSchedulePermissions = async query => {
  const queryString = serialize(query);
  const response = await ecommApi.get(
    '/user-schedule-permissions?' + queryString
  );
  return response;
};

const changeUserScheduleStatus = async value => {
  const response = await ecommApi.put(
    `user-schedule-permissions/${value.id}/`,
    { status: value.status }
  );
  return response;
};

const getUserSchedulePermissionById = (id, query) => {
  return ecommApi.get(`user-schedule-permissions/${id}?` + serialize(query));
};

export default {
  getUserSchedulePermissions,
  changeUserScheduleStatus,
  getUserSchedulePermissionById
};
