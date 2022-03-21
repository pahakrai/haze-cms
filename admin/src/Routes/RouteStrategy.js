import { isAuthenticated } from '../Lib/Ac'
import { RouteStrategy } from '../Lib/route'
import { store } from '../Redux'
import { AccountActions } from '../Redux/Account/actions'
import hazeApi from '../Services/APIs/ecomm'
import AccountService from '../Services/APIServices/AccountService'

export default class extends RouteStrategy {
  unAuthRedirect = '/login'

  async authenticate(
    policies: Array<string>,
    { workspaceTypes, workspaceAccess, route }
  ): boolean {
    // if groups userType not specified, automatically pass
    // if (!policies && !userType) {
    if (!policies) {
      return true
    }
    // get current state
    const currentState = store.getState()
    const { token: currentToken, userId: loggedUserId } = currentState.app
    // login user
    const user = loggedUserId && currentState.resources.users[loggedUserId]
    // !token
    if (!currentToken) {
      // user not exist
      // if ((policies || userType) && !user) return false;
      if (policies && !user) return false
    } // token && !user
    else if (currentToken && !user) {
      // get user
      return await this._handleUser((responseUser) =>
        // this._handleAuth(policies, userType, responseUser)
        this._handleAuth(
          policies,
          workspaceTypes,
          workspaceAccess,
          responseUser
        )
      )
    } // token && user => token !Expired
    else if (currentToken && user) {
      // user and token form state , so need check token isAuthenticated,
      // if not isAuthenticated, need refetch token , by get me , refetch
      // _handleAuthUser
      const userTokenAuthenticated = hazeApi.getTokenManager().isAuthenticated()
      if (!userTokenAuthenticated) {
        // get user
        return await this._handleUser((responseUser) =>
          // this._handleAuth(policies, userType, responseUser)
          this._handleAuth(
            policies,
            workspaceTypes,
            workspaceAccess,
            responseUser
          )
        )
      }
      // return this._handleAuth(policies, userType, user);
      return this._handleAuth(policies, workspaceTypes, workspaceAccess, user)
    }
    return false
  }

  async _handleUser(getUserCallBack = (user) => false): Promise {
    const response = await AccountService.getAccountUser()
    if (response.status === 200 && !!response.data) {
      const responseUser = response.data
      // handle user
      store.dispatch(AccountActions.setUser(responseUser))
      // handle auth
      return getUserCallBack(responseUser)
    } else {
      return this._handleNoAuth()
    }
  }

  // _handleAuth(requestPolicies, requestUserType, user): boolean {
  _handleAuth(requestActions, workspaceTypes, workspaceAccess, user): boolean {
    return isAuthenticated(user, {
      requestActions,
      workspaceTypes,
      workspaceAccess
    })
  }

  // no auth handle function
  _handleNoAuth(): boolean {
    // TODO: should it be handled here?
    store.dispatch(AccountActions.logout())
    return false
  }

  // matched return true, else false
  // _userTypeMatcher(types, currentType): boolean {
  //   if (!types) return true; // default return true
  //   return find(types, item => item === currentType) ? true : false; // if types provide, just match is that container current user type
  // }
}
