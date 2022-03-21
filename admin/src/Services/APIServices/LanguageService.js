import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getLanguages = (query) => {
  return hazeApi.get('/languages?' + serialize(query))
}

export default {
  getLanguages
}
