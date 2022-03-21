import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspaceHooks = (query) =>
  hazeApi.get(`workspace-hooks?` + serialize(query))
const createWorkspaceHook = (workspaceHook) =>
  hazeApi.post('workspace-hooks', workspaceHook)
const updateWorkspaceHook = (workspaceHook) =>
  hazeApi.put('workspace-hooks/' + workspaceHook._id, workspaceHook)

export const getAllWorkspaceHooks = (search) =>
  hazeApi.get('workspace-hooks?' + serialize(search))

export const getWorkspaceHookById = (_id, search) =>
  hazeApi.get(`workspace-hooks?/${_id}?` + serialize(search))
export const searchWorkspaceHooks = ({ q, query }) =>
  hazeApi.get('workspace-hooks?q=' + q + '&' + serialize(query))

const getWorkspaceHookByCode = (code) =>
  hazeApi.get(`workspace-hooks/code/${code}`)

const duplicateCode = (code, _id) =>
  hazeApi.post('workspace-hooks/duplicate-code-value', { code, _id })

export default {
  getWorkspaceHooks,
  createWorkspaceHook,
  getAllWorkspaceHooks,
  updateWorkspaceHook,
  getWorkspaceHookById,
  searchWorkspaceHooks,
  getWorkspaceHookByCode,
  duplicateCode
}
