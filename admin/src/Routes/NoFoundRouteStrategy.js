import { RouteStrategy } from '../Lib/route';
import { store } from '../Redux';

import AccountService from '../Services/APIServices/AccountService';

export default class extends RouteStrategy {
  unAuthRedirect = '/login';
  forbiddenRedirect = '/login';
  notFoundRedirect = '/login';

  async authenticate() {
    const currentState = store.getState();
    const { userId: loggedUserId } = currentState.app;
    // login user
    const user = loggedUserId && currentState.resources.users[loggedUserId];
    if (user) {
      return true;
    } else {
      const loginedUserResponse = await AccountService.getAccountUser(
        {},
        { notRetry: true, notRefreshToken: true }
      );
      // if request user fail , return false
      if (!loginedUserResponse.ok) {
        return false;
      }
    }
    return true;
  }
}
