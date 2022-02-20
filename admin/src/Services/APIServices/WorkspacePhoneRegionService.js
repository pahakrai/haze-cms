import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getWorkspacePhoneRegions = query =>
  ecommApi.get(`/workspace-phone-regions?${serialize(query)}`);

const getWorkspacePhoneRegionById = (id, query) => {
  return ecommApi.get(
    '/workspace-phone-regions/' + id + '?' + serialize(query)
  );
};
const createWorkspacePhoneRegion = workspacePhoneRegion =>
  ecommApi.post(`workspace-phone-regions`, workspacePhoneRegion);

const updateWorkspacePhoneRegion = workspacePhoneRegion =>
  ecommApi.put(
    `workspace-phone-regions/${workspacePhoneRegion._id}`,
    workspacePhoneRegion
  );

const deleteWorkspacePhoneRegion = id =>
  ecommApi.delete(`workspace-phone-regions/${id}`);

const getPhoneRegion = () => ecommApi.get('phone-regions');

export default {
  getWorkspacePhoneRegions,
  getWorkspacePhoneRegionById,
  createWorkspacePhoneRegion,
  updateWorkspacePhoneRegion,
  deleteWorkspacePhoneRegion,
  getPhoneRegion
};
