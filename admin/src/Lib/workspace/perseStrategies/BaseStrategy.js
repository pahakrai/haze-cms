class BaseStrategy {
  /**
   *
   */
  constructor(config) {
    this._setConfig({ ...this._getDefaultConfig(), ...config })
  }
  _setConfig(config) {
    this._config = config
  }
  _getConfig() {
    return this._config
  }
  _parse(url) {
    this.parse(url)
  }
  parse(url) {}
  _getDefaultConfig() {
    return {
      defaultWorkspace: 'golpasal'
    }
  }
}
export default BaseStrategy
