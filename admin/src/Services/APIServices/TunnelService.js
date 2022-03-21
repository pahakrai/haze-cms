import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getTunnels = (search) =>
  hazeApi.get('tunnels?' + serialize(search))

export const getTunnelById = (id) => hazeApi.get('tunnels/' + id)

const createTunnel = (
  tunnel,
  iconFiles = [],
  iconActiveFiles = [],
  onUploadProgress
) => {
  const data = new FormData()
  if (iconFiles[0]) {
    data.append(`icon`, iconFiles[0])
  }
  if (iconActiveFiles[0]) {
    data.append(`activeIcon`, iconActiveFiles[0])
  }
  const stringtifyBody = JSON.stringify(tunnel)
  data.append('form', stringtifyBody)
  return hazeApi.post(`tunnels`, data, onUploadProgress)
}
const updateTunnel = (
  tunnel,
  iconFiles = [],
  iconActiveFiles = [],
  onUploadProgress
) => {
  const data = new FormData()
  if (iconFiles[0]) {
    data.append(`icon`, iconFiles[0])
  }
  if (iconActiveFiles[0]) {
    data.append(`activeIcon`, iconActiveFiles[0])
  }
  const stringtifyBody = JSON.stringify(tunnel)
  data.append('form', stringtifyBody)
  return hazeApi.put(`tunnels/${tunnel.id}`, data, onUploadProgress)
}

export const self = hazeApi

export default {
  self: hazeApi,
  getTunnels,
  getTunnelById,
  updateTunnel,
  createTunnel
}
