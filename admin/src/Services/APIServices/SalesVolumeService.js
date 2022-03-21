import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getSalesVolumes = (opts) =>
  hazeApi.get(`sales-volumes?` + serialize(opts))
const createSalesVolume = (formValues) =>
  hazeApi.post('sales-volumes', formValues)
const updateSalesVolume = (formValues) => {
  return hazeApi.put(`/sales-volumes/` + formValues._id, formValues)
}

const getSalesVolumesByYear = (query) => {
  return hazeApi.get(`sales-volumes/year-overview?` + serialize(query))
}
const getSalesVolumesByMonth = (query) => {
  return hazeApi.get(`sales-volumes/month-overview?` + serialize(query))
}

const getSalesVolumeById = (id, query) =>
  hazeApi.get('sales-volumes/' + id + '?' + serialize(query))

export default {
  getSalesVolumes,
  createSalesVolume,
  updateSalesVolume,
  getSalesVolumeById,
  getSalesVolumesByYear,
  getSalesVolumesByMonth
}
