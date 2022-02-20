import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspaceApps = query =>
  ecommApi.get(`/workspace-apps?${serialize(query)}`);

const getWorkspaceAppById = (id, query) => {
  return ecommApi.get('/workspace-apps/' + id + '?' + serialize(query));
};
const createWorkspaceApp = workspaceApp =>
  ecommApi.post(`workspace-apps`, workspaceApp);

const updateWorkspaceApp = workspaceApp =>
  ecommApi.put(`workspace-apps/${workspaceApp._id}`, workspaceApp);

const deleteWorkspaceApp = id => ecommApi.delete(`workspace-apps/${id}`);

const releaseNewVersion = (id, platformType) => {
  return ecommApi.put(
    `workspace-apps/${id}/launch-workspace-app/${platformType}`
  );
};
const createNewVersion = (id, platformType, values) => {
  return ecommApi.put(
    `workspace-apps/${id}/release-workspace-app/${platformType}`,
    values
  );
};

export default {
  getWorkspaceApps,
  getWorkspaceAppById,
  createWorkspaceApp,
  updateWorkspaceApp,
  deleteWorkspaceApp,
  releaseNewVersion,
  createNewVersion
};
