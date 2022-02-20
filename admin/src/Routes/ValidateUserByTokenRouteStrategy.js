import Common from '@golpasal/common'

import { RouteStrategy } from '../Lib/route'

// import { AccountActions } from '../Redux/Account/actions';
import AccountService from '../Services/APIServices/AccountService'

export default class extends RouteStrategy {
  unAuthRedirect = '/user/validate/fails'

  authenticate(policies: Array<string>, route): boolean {
    // const { userId } = qs.parse(window.location.search.replace(/^\?/, ''));
    return new Promise((resolve) => {
      AccountService.validateUserByToken().then((response) => {
        if (response.status === 200 && response.ok) {
          if (response.data.status === Common.status.userStatus.ACTIVE) {
            resolve(true)
            // AccountActions.setValidateToken({ userId, status: true });
          }
        }
        resolve(false)
      })
    })
  }
}
