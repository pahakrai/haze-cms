import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspacePhoneRegions = (query) =>
  hazeApi.get(`/workspace-phone-regions?${serialize(query)}`)

const getWorkspacePhoneRegionById = (id, query) => {
  return hazeApi.get('/workspace-phone-regions/' + id + '?' + serialize(query))
}
const createWorkspacePhoneRegion = (workspacePhoneRegion) =>
  hazeApi.post(`workspace-phone-regions`, workspacePhoneRegion)

const updateWorkspacePhoneRegion = (workspacePhoneRegion) =>
  hazeApi.put(
    `workspace-phone-regions/${workspacePhoneRegion._id}`,
    workspacePhoneRegion
  )

const deleteWorkspacePhoneRegion = (id) =>
  hazeApi.delete(`workspace-phone-regions/${id}`)

const getPhoneRegion = () => hazeApi.get('phone-regions')

export default {
  getWorkspacePhoneRegions,
  getWorkspacePhoneRegionById,
  createWorkspacePhoneRegion,
  updateWorkspacePhoneRegion,
  deleteWorkspacePhoneRegion,
  getPhoneRegion
}
