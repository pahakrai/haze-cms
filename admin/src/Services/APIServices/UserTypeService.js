import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getUserTypes = (search) =>
  hazeApi.get('workspace-types/user-type-display?' + serialize(search))

export default {
  getUserTypes
}
