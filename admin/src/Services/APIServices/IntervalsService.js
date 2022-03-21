import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getIntervalsById = (_id, search) =>
  hazeApi.get(`pricings/intervals/${_id}?` + serialize(search))
export const getIntervals = (search) => {
  if (!search.isHoliday) {
    delete search.isHoliday
  }
  return hazeApi.get('/pricings/intervals?' + serialize(search))
}
export const self = hazeApi

export default {
  self: hazeApi,
  getIntervalsById,
  getIntervals
}
