import BaseTokenManager from './BaseTokenManager';
export default class RequestTokenManager extends BaseTokenManager {
  /**
   *
   * @param {string} token  token
   * @param {string} [config.cookieName = 'httpeaceTokenCookie'] Use cookie name
   * @param {number} [config.cookieExpire = 365] cookie expiration time
   * @memberof AuthManager
   */
  constructor(token) {
    super();
    if (token) {
      this.token = token;
    }
  }
  /**
   *
   * @param {string} token token
   */
  setToken(token) {
    this.token = token;
  }
  /**
   * Get token from cookie
   */
  getToken() {
    return this.token;
  }
  clearToken() {
    this.token = null;
  }
  isAuthenticated() {
    return this.token ? true : false;
  }
}
