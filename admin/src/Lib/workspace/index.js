import Workspace from './Workspace';
const isServerSide = typeof window === 'undefined';
class WorkspaceParser {
  constructor(config) {
    this._setConfig({ ...this._getDefaultConfig(), ...config });
    this._workspaceParser = null;
  }
  getWorkspaceParser() {
    const that = this;
    if (isServerSide) return createWorkspaceParser();
    if (this._workspaceParser) return this._workspaceParser;
    this._workspaceParser = createWorkspaceParser();
    return this._workspaceParser;
    function createWorkspaceParser() {
      if (isServerSide) {
        // Should get url from req
      } else {
        // Get url directly from window.location
        const url = window.location.href;
        const config = { ...that._getConfig(), url };
        return new Workspace(config);
      }
    }
  }
  _getConfig() {
    return this._config;
  }
  _setConfig(config) {
    this._config = config;
  }
  _getDefaultConfig() {
    return {};
  }
}
export default WorkspaceParser;
