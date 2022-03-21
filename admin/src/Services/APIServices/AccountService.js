import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const token = async (input, password, userTypes, _query) => {
  const query = { ..._query }
  const headers = {}

  if (query.headerWorkspace) {
    headers.workspace = query.headerWorkspace
  }
  delete query.headerWorkspace

  return hazeApi.post(
    `auth/token?${userTypes.map((ut) => `userTypes[]=${ut}`).join('&')}${
      Object.keys(query).length > 0 ? '&' + serialize(query) : ''
    }`,
    {
      input,
      password
    },
    { headers }
  )
}

const workspace = async (query, params = {}, config = {}) => {
  return hazeApi.get(
    `workspaces/current-workspace?${serialize(query)}`,
    params,
    config
  )
}

const workspaceByCode = async (code, query) => {
  return hazeApi.get(`workspaces/code/${code}?${serialize(query)}`)
}

const changeWorkspace = async (workspaceId) => {
  return hazeApi.patch(`/users/change-workspace/${workspaceId}`)
}

export const getWorkspaceById = (_id, search) =>
  hazeApi.get(`workspaces/${_id}?` + serialize(search))

const signUp = async (user) => {
  return hazeApi.post('auth', user)
}

const inviteUsers = async (contactsModel, userType) => {
  return hazeApi.post(`auth/invite-users/${userType}`, contactsModel)
}

const login = async (email, password) => {
  return hazeApi.post('auth/login?userTypes[]=user&userTypes[]=provider', {
    email,
    password
  })
}
const logout = async () => {
  return {
    ok: true
  }
}

const verifyResetPasswordToken = () => {
  // replace all '+' in query to %2B, it will not be replace to ' ' when http request for safe
  const formatString = window.location.search.replace(/\+/g, '%2B')
  return hazeApi.post(`auth/verify-forget-password${formatString}`)
}

const resetPassword = (formBody) => {
  // replace all '+' in query to %2B, it will not be replace to ' ' when http request for safe
  return hazeApi.post(`auth/reset-password`, formBody)
}
const setPassword = (formBody) => {
  // replace all '+' in query to %2B, it will not be replace to ' ' when http request for safe
  return hazeApi.post(`auth/set-password`, formBody)
}

const sendResetPasswordEmail = (email) =>
  hazeApi.post('auth/forgot-password', { email })

const forgotPassword = (_formBody) => {
  const formBody = { ..._formBody }
  const headers = {}

  if (formBody.headerWorkspace) {
    headers.workspace = formBody.headerWorkspace
    delete formBody.headerWorkspace
  }
  return hazeApi.post('auth/forgot-password', formBody, { headers })
}

const changePassword = (formBody, userId) =>
  hazeApi.patch(`auth/me/set-password`, formBody)

const validateUserByToken = (query) => {
  const formatString = window.location.search.replace(/\+/g, '%2B')
  return hazeApi.get(`auth/validate-user-by-token${formatString}`)
}

const getOneTimePassword = async (email) => {
  return hazeApi.post(
    'auth/send-onetime-password-notification?userTypes[]=user&userTypes[]=provider',
    {
      email
    }
  )
}

// Resend verification email
// auth/resend-validate-user-notification/:userType
const resendValidateUserNotification = (query) => {
  return hazeApi.post(`auth/resend-validate-user-notification/user`, {
    query
  })
}

export const getAccountUser = (params = {}, config = {}) =>
  hazeApi.get('users/me', params, config)

export const verifyPasscodeToken = (query, config) => {
  const headers = {}
  if (config.workspace) {
    headers.workspace = config.workspace
  }
  return hazeApi.get(
    '/auth/validate-passcode-token?' + serialize(query),
    {},
    { headers }
  )
}

export const signUpWorkspaceVerifyToken = (token) =>
  hazeApi.get('/providers/validate-passcode-token?token=' + token)

export const providerSignUp = async (email) => {
  return hazeApi.post(`providers/signUp`, email)
}

export const signUpConfirm = async (token, formValues) => {
  return hazeApi.put(`/providers/workspace/confirm${token}`, formValues)
}

export const refreshToken = async (params) => {
  return hazeApi.get('auth/refresh-token', params)
}

export default {
  self: hazeApi,
  logout,
  token,
  workspace,
  changeWorkspace,
  workspaceByCode,
  getWorkspaceById,
  login,
  getAccountUser,
  verifyPasscodeToken,
  signUpWorkspaceVerifyToken,
  verifyResetPasswordToken,
  resetPassword,
  setPassword,
  sendResetPasswordEmail,
  forgotPassword,
  changePassword,
  validateUserByToken,
  resendValidateUserNotification,
  getOneTimePassword,
  signUp,
  inviteUsers,
  providerSignUp,
  signUpConfirm,
  refreshToken
}
