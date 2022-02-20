import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspaceHooks = query =>
  ecommApi.get(`workspace-hooks?` + serialize(query));
const createWorkspaceHook = workspaceHook =>
  ecommApi.post('workspace-hooks', workspaceHook);
const updateWorkspaceHook = workspaceHook =>
  ecommApi.put('workspace-hooks/' + workspaceHook._id, workspaceHook);

export const getAllWorkspaceHooks = search =>
  ecommApi.get('workspace-hooks?' + serialize(search));

export const getWorkspaceHookById = (_id, search) =>
  ecommApi.get(`workspace-hooks?/${_id}?` + serialize(search));
export const searchWorkspaceHooks = ({ q, query }) =>
  ecommApi.get('workspace-hooks?q=' + q + '&' + serialize(query));

const getWorkspaceHookByCode = code =>
  ecommApi.get(`workspace-hooks/code/${code}`);

const duplicateCode = (code, _id) =>
  ecommApi.post('workspace-hooks/duplicate-code-value', { code, _id });

export default {
  getWorkspaceHooks,
  createWorkspaceHook,
  getAllWorkspaceHooks,
  updateWorkspaceHook,
  getWorkspaceHookById,
  searchWorkspaceHooks,
  getWorkspaceHookByCode,
  duplicateCode
};
