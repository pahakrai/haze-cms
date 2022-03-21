import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getWorkspacePriceTypes = (query) =>
  hazeApi.get(`/workspace-price-types?${serialize(query)}`)

export default {
  getWorkspacePriceTypes
}
