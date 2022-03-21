import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getPrices = (search) =>
  hazeApi.get('pricings?' + serialize(search))

export const self = hazeApi

export default {
  self: hazeApi,
  getPrices
}
