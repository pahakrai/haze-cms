import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getUnitOfMeasures = (opts) => {
  return hazeApi.get('/unit-of-measures?' + serialize(opts))
}

const getUnitOfMeasureById = (id) => {
  return hazeApi.get('/unit-of-measures/' + id)
}

const createUnitOfMeasure = (formValues) => {
  return hazeApi.post(`/unit-of-measures`, formValues)
}

const updateUnitOfMeasure = (formValues) => {
  return hazeApi.put(`/unit-of-measures/` + formValues._id, formValues)
}

export default {
  self: hazeApi,
  createUnitOfMeasure,
  getUnitOfMeasureById,
  getUnitOfMeasures,
  updateUnitOfMeasure
}
