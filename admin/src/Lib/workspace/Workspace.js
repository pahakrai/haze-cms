import Parser from './perseStrategies/DomainParser';
import Persistor from './persistStrategies/Client';
class Workspace {
  /**
   *
   * @param {object} config
   * @param {string} [config.url] url we parse it
   * @param {string} [config.defaultWorkspace] defaultWorkspaceCode
   * @param {boolean} [config.serverSide] is that server side ?
   */
  constructor(config) {
    this._setConfig({ ...this._getDefaultConfig(), ...config });
    this._parser = new Parser(this._getConfig());
    this._persistor = new Persistor(
      this._parser.getWorkspaceCode(),
      this._getConfig()
    );
  }
  getWorkspaceCode = () => {
    return this._persistor.getWorkspace();
  };
  setWorkspaceCode = workspace_code => {
    this._persistor.setWorkspace(workspace_code);
  };
  clearWorkspaceCode = () => {
    this._persistor.setWorkspace(null);
  };
  _setConfig(config) {
    this._config = config;
  }
  _getConfig() {
    return this._config;
  }
  _getDefaultConfig() {
    return {};
  }
}
export default Workspace;
