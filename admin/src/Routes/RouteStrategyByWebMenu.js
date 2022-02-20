import { RouteStrategy } from '../Lib/route';
import { isAuthenticated } from '../Lib/Ac';

import WebMenuService from '../Services/APIServices/WebMenuService';
import AccountService from '../Services/APIServices/AccountService';

export default class extends RouteStrategy {
  unAuthRedirect = '/login';

  forbiddenRedirect = '/403';

  notFoundRedirect = '/404';

  async authenticate(
    policies: Array<string>,
    { path, skipNetAuth, workspaceTypes, workspaceAccess, _id }
  ) {
    if (!path) {
      return false;
    }
    if (skipNetAuth) {
      if (policies) {
        const loginedUserResponse = await AccountService.getAccountUser(
          {},
          { notRetry: true, notRefreshToken: true }
        );
        // if request user fail , return false
        if (!loginedUserResponse.ok) {
          return false;
        }

        const currentUser = loginedUserResponse.data;
        // by ac module get isAuthenticated
        return isAuthenticated(currentUser, {
          requestActions: policies,
          workspaceTypes,
          workspaceAccess
        });
      }

      return true;
    }

    // refresh token
    this._refreshToken();

    // path allow access
    const allowAccessResponse = await WebMenuService.allowAccess({
      code: 'admin',
      to: path + window.location.hash,
      _id
    });

    if (!!allowAccessResponse.ok) return !!allowAccessResponse.data;

    return allowAccessResponse.status;
  }

  _refreshToken = async () => {
    const token = AccountService.self.tokenManager.getToken();
    let newTokenResponse = false;
    if (token) {
      try {
        newTokenResponse = await AccountService.refreshToken({
          refreshToken: token.refresh_token
        });
      } catch (e) {}
      newTokenResponse &&
        AccountService.self.tokenManager.setToken(newTokenResponse.data);
    }
  };
}
