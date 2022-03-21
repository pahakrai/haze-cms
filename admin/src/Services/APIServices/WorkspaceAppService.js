import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspaceApps = (query) =>
  hazeApi.get(`/workspace-apps?${serialize(query)}`)

const getWorkspaceAppById = (id, query) => {
  return hazeApi.get('/workspace-apps/' + id + '?' + serialize(query))
}
const createWorkspaceApp = (workspaceApp) =>
  hazeApi.post(`workspace-apps`, workspaceApp)

const updateWorkspaceApp = (workspaceApp) =>
  hazeApi.put(`workspace-apps/${workspaceApp._id}`, workspaceApp)

const deleteWorkspaceApp = (id) => hazeApi.delete(`workspace-apps/${id}`)

const releaseNewVersion = (id, platformType) => {
  return hazeApi.put(
    `workspace-apps/${id}/launch-workspace-app/${platformType}`
  )
}
const createNewVersion = (id, platformType, values) => {
  return hazeApi.put(
    `workspace-apps/${id}/release-workspace-app/${platformType}`,
    values
  )
}

export default {
  getWorkspaceApps,
  getWorkspaceAppById,
  createWorkspaceApp,
  updateWorkspaceApp,
  deleteWorkspaceApp,
  releaseNewVersion,
  createNewVersion
}
