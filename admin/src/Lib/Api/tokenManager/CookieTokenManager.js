import Cookies from 'js-cookie';
import BaseTokenManager from './BaseTokenManager';
export default class CookieTokenManager extends BaseTokenManager {
  /**
   *
   * @param {string} token  token
   * @param {string} [config.cookieName = 'httpeaceTokenCookie'] Use cookie name
   * @param {number} [config.cookieExpire = 365] cookie expire date
   * @memberof AuthManager
   */
  _start() {
    this.token = this.getToken();
  }

  /**
   *
   * @param {string} token token
   */
  setToken(tokenObj) {
    if (!tokenObj) {
      this.notifyUnAuthenticate();
    } else {
      const config = this._getConfig();
      // timestamp to days
      const expireDays = 365;
      // set Token to cookie
      Cookies.set(config.cookieName, tokenObj, {
        expires: expireDays
      });
      // save token and expireAt to local variable
      this.token = tokenObj;
      this.notifyAuthenticated();
    }
  }
  /**
   * Get token from cookie
   */
  getToken() {
    const config = this._getConfig();
    if (this.token) return this.token;
    // get token from cookie
    const cookieToken = Cookies.get(config.cookieName);
    // return cookie object or undefined
    return cookieToken ? JSON.parse(cookieToken) : undefined;
  }

  hasToken() {
    return Boolean(this.getToken());
  }

  getAccessToken() {
    const token = this.getToken();
    return token ? token.access_token : '';
  }

  clearToken() {
    const config = this._getConfig();
    Cookies.remove(config.cookieName);
    this.token = null;
    this.notifyUnAuthenticate();
  }
  isAuthenticated() {
    // ensure: token exists, access_token exists and expires_on has not expire yet
    return (
      this.token &&
      this.token.access_token &&
      // timestamp expires_on
      this.token.expires_on * 1000 > new Date().valueOf()
    );
  }
}
