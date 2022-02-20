import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

// const { UserType } = ChangeCommon.type;

export const findUserById = (_id, search) =>
  ecommApi.get(`users/${_id}?` + serialize(search));
export const getUsers = (search, userType) => {
  const apiUrl = 'users';
  // {
  //   [UserType.PROVIDER]: 'provider',
  //   [UserType.USER]: 'merchants',
  //   [UserType.MEMBER]: 'members'
  // }[userType] || 'users';

  return ecommApi.get(apiUrl + '/?' + serialize(search));
};
export const searchUsers = ({ q, query }) =>
  ecommApi.get('users?q=' + q + '&' + serialize(query));
export const updateUser = values => {
  return ecommApi.patch('users/' + values._id, values);
};
export const deleteUser = id => ecommApi.delete('users/' + id);
export const createUser = values => {
  return ecommApi.post('users/', values);
};
export const getUserType = () => ecommApi.get('users/user-type');
export const getUserGroups = opts => ecommApi.get('groups?' + serialize(opts));
export const updateUserAvatar = (userId, files, userType, onUploadProgress) => {
  const apiUrl = 'user-profiles';
  // {
  //   [UserType.MEMBER]: 'members',
  //   [UserType.USER]: 'merchants',
  //   [UserType.PROVIDER]: 'providers'
  // }[userType];
  const data = new FormData();
  if (files) files.forEach(f => data.append(`files`, f));
  return ecommApi.put(`${apiUrl}/${userId}/avatar`, data, { onUploadProgress });
};
/**
 * checkUserExist
 * @param {*} opts
 *  userId @string no-Require
 *  username @string no-Require
 */
export const checkUserExist = (opts = {}) =>
  ecommApi.get('users/exist?' + serialize(opts));

// wait workspace code getter, default now
export const isDuplicateEmail = (email, userId) =>
  ecommApi.post('users/is-duplicate-email', {
    email,
    userId
  });
export const isDuplicateUsername = (username, userId) =>
  ecommApi.post('users/is-duplicate-username', {
    username,
    userId
  });
export const isDuplicatePhone = (phone, userId) =>
  ecommApi.post('users/is-duplicate-phone', {
    phone,
    userId
  });

export const addReason = value =>
  ecommApi.post(
    'users/' + value.userId + '/add-activation-issues',
    value.value
  );

export const updateReason = value =>
  ecommApi.patch('users/' + value.userId + '/update-activation-issues', [
    value.value
  ]);

export const getUserProfile = id => {
  return ecommApi.get(`user-profiles/${id}`);
};
export const updateUserProfile = ({
  user,
  driver,
  vehicle,
  merchant,
  member
}) => {
  const data = { user, driver, vehicle, merchant, member };

  if (!driver) {
    delete data.driver;
  }
  if (!vehicle) {
    delete data.vehicle;
  }
  if (!merchant) {
    delete data.merchant;
  }
  if (!member) {
    delete data.member;
  }

  return ecommApi.put(`user-profiles/${user._id}`, data);
};
export const sendVerifyPassCode = ({ data }) => {
  ecommApi.post(`auth/send-passcode`, {
    input: data.userId,
    contactMethod: 'signUp'
    // email: data.email,
    // phone: data.phone,
    // phoneRegionCode: data.phoneRegionCode,
    // userType: data.userType
  });
};
export const changeUserStatus = ({ value, body }) =>
  ecommApi.patch(`users/${value.userId}/status/${value.userStatus}`, body);

export const getUserRequirements = (type, userType) =>
  ecommApi.get(`user-profiles/user-requirements/${type}/user-type/${userType}`);

export const getUserPasscode = id =>
  ecommApi.get(`/auth/passcode?` + serialize(id));

export const self = ecommApi;

export default {
  self: ecommApi,
  updateUserProfile,
  getUserProfile,
  findUserById,
  getUsers,
  searchUsers,
  updateUser,
  deleteUser,
  createUser,
  getUserType,
  getUserGroups,
  updateUserAvatar,
  checkUserExist,
  isDuplicateEmail,
  isDuplicateUsername,
  isDuplicatePhone,
  addReason,
  updateReason,
  sendVerifyPassCode,
  changeUserStatus,
  getUserRequirements,
  getUserPasscode
};
