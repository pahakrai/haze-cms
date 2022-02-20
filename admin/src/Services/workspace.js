import { Interceptors } from '../Lib/Api'
import Parser from '../Lib/workspace'
const workspaceParserConfig = {
  defaultWorkspace: 'golpasal'
}
const workspaceParser = new Parser(workspaceParserConfig)

export class ApiWorkspaceInterceptor extends Interceptors.BaseInterceptor {
  constructor(config) {
    super(config)
    this._setConfig(config)
  }
  intercept(data) {
    if (
      process.env.REACT_APP_MULTI_WORKSPACE &&
      !data.headers['Authorization']
    ) {
      data.params = Object.assign({}, data.params, {
        workspace_code: workspaceParser.getWorkspaceParser().getWorkspaceCode()
      })
    }
    return data
  }
  whenError(error) {
    return Promise.reject(error)
  }
}
export default workspaceParser.getWorkspaceParser()
