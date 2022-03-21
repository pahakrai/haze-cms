import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getRegions = (query) => {
  return hazeApi.get('/regions?' + serialize(query))
}
const getAllDistrict = async (query) =>
  await hazeApi.get(
    '/regions?isActive=true&subTypes[]=neighborhood&&' + serialize(query)
  )
const getRegionById = (id) => {
  return hazeApi.get('/regions/' + id)
}
const getRegionPins = async (query) => {
  return await hazeApi.get('/region-pins')
}

const getAllWithChildren = async (query) => {
  return await hazeApi.get(
    '/regions?isActive=true&parent=null&recursive=true&&localize=true&&' +
      serialize(query)
  )
}

const createRegionPin = (regionPin) => hazeApi.post('region-pins', regionPin)

const updateRegionPin = (regionPin) =>
  hazeApi.patch('region-pins/' + regionPin._id, regionPin)

const deleteRegionPin = (_id) => hazeApi.delete('region-pins/' + _id)

const createRegion = (region, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(region)
  data.append('form', stringtifyBody)
  return hazeApi.post('regions', data, onUploadProgress)
}

const updateRegion = (formValues, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(formValues)
  data.append('form', stringtifyBody)
  return hazeApi.put(`regions/${formValues._id}`, data, files, onUploadProgress)
}

const deleteRegion = (_id) => hazeApi.delete('regions/' + _id)
const getDistrictByCoordinates = (coordinates) =>
  hazeApi.get(
    'regions/get-by-coordinates?lat=' +
      coordinates[0] +
      '&lng=' +
      coordinates[1] +
      '&type=district'
  )

const getRegionCoverLagLng = (lag, lng) => hazeApi.delete('regions/' + lag, lng)

const getRegionsByCoordinates = (lat, lng, opts = {}) =>
  hazeApi.get('regions/get-by-coordinates', { lat, lng, ...opts })

export default {
  getRegions,
  createRegion,
  deleteRegion,
  getRegionPins,
  getRegionById,
  deleteRegionPin,
  createRegionPin,
  getAllWithChildren,
  getRegionCoverLagLng,
  updateRegionPin,
  updateRegion,
  getDistrictByCoordinates,
  getRegionsByCoordinates,
  getAllDistrict
}
