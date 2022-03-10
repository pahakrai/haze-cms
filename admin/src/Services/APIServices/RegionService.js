import { ecommApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getRegions = (query) => {
  return ecommApi.get('/regions?' + serialize(query))
}
const getAllDistrict = async (query) =>
  await ecommApi.get(
    '/regions?isActive=true&subTypes[]=neighborhood&&' + serialize(query)
  )
const getRegionById = (id) => {
  return ecommApi.get('/regions/' + id)
}
const getRegionPins = async (query) => {
  return await ecommApi.get('/region-pins')
}

const getAllWithChildren = async (query) => {
  return await ecommApi.get(
    '/regions?isActive=true&parent=null&recursive=true&&localize=true&&' +
      serialize(query)
  )
}

const createRegionPin = (regionPin) => ecommApi.post('region-pins', regionPin)

const updateRegionPin = (regionPin) =>
  ecommApi.patch('region-pins/' + regionPin._id, regionPin)

const deleteRegionPin = (_id) => ecommApi.delete('region-pins/' + _id)

const createRegion = (region, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(region)
  data.append('form', stringtifyBody)
  return ecommApi.post('regions', data, onUploadProgress)
}

const updateRegion = (formValues, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(formValues)
  data.append('form', stringtifyBody)
  return ecommApi.put(
    `regions/${formValues._id}`,
    data,
    files,
    onUploadProgress
  )
}

const deleteRegion = (_id) => ecommApi.delete('regions/' + _id)
const getDistrictByCoordinates = (coordinates) =>
  ecommApi.get(
    'regions/get-by-coordinates?lat=' +
      coordinates[0] +
      '&lng=' +
      coordinates[1] +
      '&type=district'
  )

const getRegionCoverLagLng = (lag, lng) =>
  ecommApi.delete('regions/' + lag, lng)

const getRegionsByCoordinates = (lat, lng, opts = {}) =>
  ecommApi.get('regions/get-by-coordinates', { lat, lng, ...opts })

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
