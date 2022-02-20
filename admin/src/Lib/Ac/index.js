import * as Common from '@golpasal/common'

/**
 *
 * @param {*} { requestActions, workspaceTypes, workspaceAccess }
 * @param {*} user => for userActions ...
 */
export const isAuthenticated = (
  user,
  { requestActions, workspaceTypes, workspaceAccess }
): boolean => {
  // empty policies = only request loggedIn
  if (requestActions.length === 0) return true
  // user.actions = {allows:[],deny:[]}
  if (
    !user ||
    !user.actions ||
    !user.actions.allows ||
    !user.actions.allows.length
  )
    return false
  // check action
  return Common.helpers.isAclActionAllow(requestActions, user.actions)
}
