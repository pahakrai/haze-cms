import queryString from 'query-string';

import { store } from '../Redux';
import { RouteStrategy } from '../Lib/route';
import AccountService from '../Services/APIServices/AccountService';
export default class extends RouteStrategy {
  unAuthRedirect = '/connect-expired';

  async authenticate(policies: Array<string>, route): boolean {
    // get current state
    const currentState = store.getState();
    const { token: currentToken, userId: loggedUserId } = currentState.app;

    // if logged
    if (currentToken && loggedUserId) {
      const response = await AccountService.getAccountUser();
      if (response.status === 200 && !!response.data) {
        this.unAuthRedirect = '/logged-in-other-session';
        return false;
      }
    }

    // token
    const { token, workspace } = queryString.parse(window.location.search);
    const response = await AccountService.verifyPasscodeToken(
      { token },
      { workspace }
    );
    if (response.status === 200 && response.data === true) {
      return true;
    }
    return false;
  }
}
