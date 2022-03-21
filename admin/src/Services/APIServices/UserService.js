import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

// const { UserType } = ChangeCommon.type;

export const findUserById = (_id, search) =>
  hazeApi.get(`users/${_id}?` + serialize(search))
export const getUsers = (search, userType) => {
  const apiUrl = 'users'
  // {
  //   [UserType.PROVIDER]: 'provider',
  //   [UserType.USER]: 'merchants',
  //   [UserType.MEMBER]: 'members'
  // }[userType] || 'users';

  return hazeApi.get(apiUrl + '/?' + serialize(search))
}
export const searchUsers = ({ q, query }) =>
  hazeApi.get('users?q=' + q + '&' + serialize(query))
export const updateUser = (values) => {
  return hazeApi.patch('users/' + values._id, values)
}
export const deleteUser = (id) => hazeApi.delete('users/' + id)
export const createUser = (values) => {
  return hazeApi.post('users/', values)
}
export const getUserType = () => hazeApi.get('users/user-type')
export const getUserGroups = (opts) => hazeApi.get('groups?' + serialize(opts))
export const updateUserAvatar = (userId, files, userType, onUploadProgress) => {
  const apiUrl = 'user-profiles'
  // {
  //   [UserType.MEMBER]: 'members',
  //   [UserType.USER]: 'merchants',
  //   [UserType.PROVIDER]: 'providers'
  // }[userType];
  const data = new FormData()
  if (files) files.forEach((f) => data.append(`files`, f))
  return hazeApi.put(`${apiUrl}/${userId}/avatar`, data, { onUploadProgress })
}
/**
 * checkUserExist
 * @param {*} opts
 *  userId @string no-Require
 *  username @string no-Require
 */
export const checkUserExist = (opts = {}) =>
  hazeApi.get('users/exist?' + serialize(opts))

// wait workspace code getter, default now
export const isDuplicateEmail = (email, userId) =>
  hazeApi.post('users/is-duplicate-email', {
    email,
    userId
  })
export const isDuplicateUsername = (username, userId) =>
  hazeApi.post('users/is-duplicate-username', {
    username,
    userId
  })
export const isDuplicatePhone = (phone, userId) =>
  hazeApi.post('users/is-duplicate-phone', {
    phone,
    userId
  })

export const addReason = (value) =>
  hazeApi.post('users/' + value.userId + '/add-activation-issues', value.value)

export const updateReason = (value) =>
  hazeApi.patch('users/' + value.userId + '/update-activation-issues', [
    value.value
  ])

export const getUserProfile = (id) => {
  return hazeApi.get(`user-profiles/${id}`)
}
export const updateUserProfile = ({
  user,
  driver,
  vehicle,
  merchant,
  member
}) => {
  const data = { user, driver, vehicle, merchant, member }

  if (!driver) {
    delete data.driver
  }
  if (!vehicle) {
    delete data.vehicle
  }
  if (!merchant) {
    delete data.merchant
  }
  if (!member) {
    delete data.member
  }

  return hazeApi.put(`user-profiles/${user._id}`, data)
}
export const sendVerifyPassCode = ({ data }) => {
  hazeApi.post(`auth/send-passcode`, {
    input: data.userId,
    contactMethod: 'signUp'
    // email: data.email,
    // phone: data.phone,
    // phoneRegionCode: data.phoneRegionCode,
    // userType: data.userType
  })
}
export const changeUserStatus = ({ value, body }) =>
  hazeApi.patch(`users/${value.userId}/status/${value.userStatus}`, body)

export const getUserRequirements = (type, userType) =>
  hazeApi.get(`user-profiles/user-requirements/${type}/user-type/${userType}`)

export const getUserPasscode = (id) =>
  hazeApi.get(`/auth/passcode?` + serialize(id))

export const self = hazeApi

export default {
  self: hazeApi,
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
}
