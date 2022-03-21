import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspaces = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get('/workspaces?' + queryString)
  return response
}

const createWorkspace = (workspace, files = [], onUploadProgress) => {
  const data = new FormData()
  if (files[0]) {
    data.append(`files`, files[0])
  }
  const stringtifyBody = JSON.stringify(workspace)
  data.append('workspace', stringtifyBody)
  return hazeApi.post(`workspaces`, data, { onUploadProgress })
}

const getWorkspaceById = (id, query) => {
  return hazeApi.get('/workspaces/' + id + '?' + serialize(query))
}

const getWorkspaceByCode = (code) => hazeApi.get(`workspaces/code/${code}`)

const updateWorkspace = (workspace, files, onUploadProgress) => {
  // const data = new FormData();
  // if (files[0]) {
  //   data.append(`files`, files[0]);
  // }
  // const stringtifyBody = JSON.stringify(workspace);
  // data.append('workspace', stringtifyBody);
  return hazeApi.put(`workspaces/${workspace._id}`, workspace)
}

const duplicateName = (name, _id) =>
  hazeApi.post('workspaces/duplicate-name', { name, _id })

const duplicateCode = (code, _id) =>
  hazeApi.post('workspaces/duplicate-code', { code, _id })

const toggleActive = (_id, active) =>
  hazeApi.put(`workspaces/${_id}/toggle-active?active=${active}`)

const createWorkspaceContact = (workspaceId, contact) => {
  return hazeApi.post(`workspaces/contacts/${workspaceId}`, contact)
}

const updateWorkspaceContact = (workspaceId, contact) => {
  return hazeApi.put(
    `workspaces/contacts/${workspaceId}/${contact._id}`,
    contact
  )
}

const deleteWorkspaceContact = (workspaceId, contactId) => {
  return hazeApi.delete(`workspaces/contacts/${workspaceId}/${contactId}`)
}

const getWorkspaceContact = (id) => hazeApi.get(`workspaces/contacts/${id}`)

const getWorkspaceContactId = (workspaceId, contactId) =>
  hazeApi.get(`workspaces/contacts/${workspaceId}/${contactId}`)

const updateWorkspaceContactIsPrimary = (workspaceId, contactId, isPrimary) =>
  hazeApi.put(
    `workspaces/contacts/isPrimary/${workspaceId}/${contactId}?isPrimary=${isPrimary}`
  )

const currentWorkspace = () => hazeApi.get('workspaces/current-workspace')
const getWorkspaceSafeKey = (id) => hazeApi.get(`/workspaces/${id}/safe-key`)

export const getAllWorkspace = (search) =>
  hazeApi.get('workspaces?' + serialize(search))

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
}
