import queryString from 'query-string';
import { RouteStrategy } from '../Lib/route';
import AccountService from '../Services/APIServices/AccountService';
export default class extends RouteStrategy {
  unAuthRedirect = '/sign-up-connect-expired';

  authenticate(policies: Array<string>, route): boolean {
    return new Promise(resolve => {
      const { token } = queryString.parse(window.location.search);
      AccountService.signUpWorkspaceVerifyToken(token)
        .then(response => {
          if (response.status === 200 && response.data === true) {
            resolve(true);
          }
          resolve(false);
        })
        .catch(e => {
          resolve(false);
        });
    });
  }
}
