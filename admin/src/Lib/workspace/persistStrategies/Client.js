import BaseStrategy from './BaseStrategy';
import Cookies from 'js-cookie';
/**
 * client side we should save workspace in cookies
 */
class Client extends BaseStrategy {
  constructor(workspaceCode, config) {
    super(config);
    if (this.getWorkspace() !== workspaceCode) {
      this.setWorkspace(workspaceCode);
    }
  }
  setWorkspace(workspace_code) {
    this._workspace_code = workspace_code;
    Cookies.set(this._getConfig().workspaceName, workspace_code, {
      expires: this._getConfig().workspaceExpire
    });
  }
  getWorkspace() {
    if (this._workspace_code) return this._workspace_code;
    return Cookies.get(this._getConfig().workspaceName);
  }
}
export default Client;
