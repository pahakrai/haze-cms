import BaseStrategy from './BaseStrategy';
/**
 * client side we should save workspace in cookies
 */
class Server extends BaseStrategy {
  setWorkspace(workspace_code) {
    this.workspace_code = workspace_code;
  }
  getWorkspace() {
    return this.workspace_code;
  }
}
export default Server;
