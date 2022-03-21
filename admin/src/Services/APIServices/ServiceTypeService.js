import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getServiceTypesByWorkspaceType = (search) =>
  hazeApi.get('workspace-types/service-type-display?' + serialize(search))

export default {
  getServiceTypesByWorkspaceType
}
