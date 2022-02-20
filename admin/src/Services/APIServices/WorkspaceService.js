import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspaces = async query => {
  const queryString = serialize(query);
  const response = await ecommApi.get('/workspaces?' + queryString);
  return response;
};

const createWorkspace = (workspace, files = [], onUploadProgress) => {
  const data = new FormData();
  if (files[0]) {
    data.append(`files`, files[0]);
  }
  const stringtifyBody = JSON.stringify(workspace);
  data.append('workspace', stringtifyBody);
  return ecommApi.post(`workspaces`, data, { onUploadProgress });
};

const getWorkspaceById = (id, query) => {
  return ecommApi.get('/workspaces/' + id + '?' + serialize(query));
};

const getWorkspaceByCode = code => ecommApi.get(`workspaces/code/${code}`);

const updateWorkspace = (workspace, files, onUploadProgress) => {
  // const data = new FormData();
  // if (files[0]) {
  //   data.append(`files`, files[0]);
  // }
  // const stringtifyBody = JSON.stringify(workspace);
  // data.append('workspace', stringtifyBody);
  return ecommApi.put(`workspaces/${workspace._id}`, workspace);
};

const duplicateName = (name, _id) =>
  ecommApi.post('workspaces/duplicate-name', { name, _id });

const duplicateCode = (code, _id) =>
  ecommApi.post('workspaces/duplicate-code', { code, _id });

const toggleActive = (_id, active) =>
  ecommApi.put(`workspaces/${_id}/toggle-active?active=${active}`);

const createWorkspaceContact = (workspaceId, contact) => {
  return ecommApi.post(`workspaces/contacts/${workspaceId}`, contact);
};

const updateWorkspaceContact = (workspaceId, contact) => {
  return ecommApi.put(
    `workspaces/contacts/${workspaceId}/${contact._id}`,
    contact
  );
};

const deleteWorkspaceContact = (workspaceId, contactId) => {
  return ecommApi.delete(`workspaces/contacts/${workspaceId}/${contactId}`);
};

const getWorkspaceContact = id => ecommApi.get(`workspaces/contacts/${id}`);

const getWorkspaceContactId = (workspaceId, contactId) =>
  ecommApi.get(`workspaces/contacts/${workspaceId}/${contactId}`);

const updateWorkspaceContactIsPrimary = (workspaceId, contactId, isPrimary) =>
  ecommApi.put(
    `workspaces/contacts/isPrimary/${workspaceId}/${contactId}?isPrimary=${isPrimary}`
  );

const currentWorkspace = () => ecommApi.get('workspaces/current-workspace');
const getWorkspaceSafeKey = id => ecommApi.get(`/workspaces/${id}/safe-key`);

export const getAllWorkspace = search =>
  ecommApi.get('workspaces?' + serialize(search));

export default {
  getWorkspaces,
  getWorkspaceById,
  getWorkspaceByCode,
  createWorkspace,
  createWorkspaceContact,
  updateWorkspace,
  updateWorkspaceContact,
  getWorkspaceContact,
  getWorkspaceContactId,
  updateWorkspaceContactIsPrimary,
  duplicateCode,
  duplicateName,
  toggleActive,
  deleteWorkspaceContact,
  currentWorkspace,
  getWorkspaceSafeKey,
  getAllWorkspace
};
