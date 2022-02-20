class BaseStrategy {
  /**
   * @param {object} config
   * @param {string} [config.workspaceName = 'defaultWorkspaceName'] name of defaultWorkspaceName
   * @param {string} [config.workspaceExpire = 15] default workspaceExpire time (day)
   */
  constructor(config) {
    this._setConfig({ ...this._getDefaultConfig(), ...config });
  }
  _setConfig(config) {
    this._config = config;
  }
  _getConfig() {
    return this._config;
  }
  _getWorkspace() {
    this.getWorkspace();
  }
  getWorkspace() {}
  _setWorkspace(workspace_code) {
    this.setWorkspace(workspace_code);
  }
  setWorkspace() {}
  _getDefaultConfig() {
    return {
      workspaceName: 'defaultWorkspaceName',
      workspaceExpire: 15
    };
  }
}
export default BaseStrategy;
