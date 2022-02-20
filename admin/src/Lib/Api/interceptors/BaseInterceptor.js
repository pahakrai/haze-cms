class BaseInterceptor {
  constructor(config) {
    this._setConfig(config);
  }
  _setConfig(config) {
    this._config = config;
  }
  _getConfig() {
    return this._config;
  }
  intercept(config) {
    return config;
  }
  whenError(error) {
    return Promise.reject(error);
  }
}
export default BaseInterceptor;
