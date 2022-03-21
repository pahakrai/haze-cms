import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getDashboardCount = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get(
    '/analytics/dashboard-count?' + queryString
  )
  return response
}

const getDashboardData = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get(`/dashboards?${queryString}`)
  return response
}
const getDashboardWidgetData = async (url, query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get(`${url}?${queryString}`)
  return response
}

export default {
  getDashboardCount,
  getDashboardData,
  getDashboardWidgetData
}
