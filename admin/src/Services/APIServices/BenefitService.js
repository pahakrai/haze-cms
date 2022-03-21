import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getBenefits = (query) => {
  return hazeApi.get('/benefits?' + serialize(query))
}

export default {
  getBenefits
}
