export default class BaseTokenManager {
  constructor() {
    this.tokenAuthenticatedObserverList = [];
    this.tokenUnAuthenticateObserverList = [];
  }
  _setConfig(config) {
    this.config = config;
  }
  _getConfig() {
    return this.config;
  }
  _start() {}
  _setToken(token) {
    this.setToken(token);
  }
  on(name, callback) {
    if (
      name === 'authenticated' &&
      !this.tokenAuthenticatedObserverList.includes(callback)
    ) {
      this.tokenAuthenticatedObserverList.push(callback);
    }
    if (
      name === 'unAuthenticated' &&
      !this.tokenUnAuthenticateObserverList.includes(callback)
    ) {
      this.tokenUnAuthenticateObserverList.push(callback);
    }
  }
  remove(name, callback) {
    // TODO
  }

  notifyUnAuthenticate() {
    this.tokenUnAuthenticateObserverList.forEach(fun => fun());
  }
  notifyAuthenticated() {
    this.tokenAuthenticatedObserverList.forEach(fun => fun());
  }
  setToken(token) {}
  _getToken() {
    return this.getToken();
  }
  getToken() {}
  _clearToken() {
    this.clearToken();
  }
  clearToken() {}
  _isAuthenticated() {
    return this.isAuthenticated();
  }
  isAuthenticated() {}
}
