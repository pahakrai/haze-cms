import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const checkout = (body) => {
  const opts = {
    finalize: false
  }
  return hazeApi.post(`/checkouts?${serialize(opts)}`, body)
}

export default {
  self: hazeApi,
  checkout
}
