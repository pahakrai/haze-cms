import URL from 'url';
import _ from 'lodash';
import BaseStrategy from './BaseStrategy';
class DomainParser extends BaseStrategy {
  constructor(config) {
    super(config);
    this._workspaceCode = this._parse(this._getConfig().url);
  }
  _parse(url) {
    // Whether it should be judged whether it is a string
    const host = URL.parse(url).host; // get host from url
    const hostFragment = _.split(host, '.'); // parse host
    if (hostFragment.length === 3) {
      // url contain sub domain
      return hostFragment[0];
    }
    return this._getConfig().defaultWorkspace;
  }
  getWorkspaceCode() {
    return this._workspaceCode;
  }
}
export default DomainParser;
