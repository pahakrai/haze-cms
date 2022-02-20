import requireDir from 'require-dir';

export class LocalStore {
  /**
   *
   * @param {localesBaseUrl='/locales'} config
   */

  constructor() {
    this._resources = this._loadResources();
  }
  private _supportLangs = [];
  private _localesBaseUrl = `${process.cwd()}/locales`;
  private _resources = {};

  _loadResources() {
    const result = {};
    try {
      const obj = requireDir(this._localesBaseUrl, {recurse: true});
      Object.keys(obj).forEach(oKey => {
        result[oKey] = Object.assign({}, result[oKey], obj[oKey]);
      });
    } catch (error) {
      throw new Error(error);
    }
    this._supportLangs = Object.keys(result);
    return result;
  }
  getSupportLanguages() {
    return this._supportLangs;
  }
  getParser(language) {
    return this._resources[language] || {};
  }
}
