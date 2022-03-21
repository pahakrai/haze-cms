import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getAddresss = (query) => {
  return hazeApi.get('/addresss?' + serialize(query))
}

export const createAddress = (formValues) => {
  return hazeApi.post('/addresss', formValues)
}

export const updateAddress = (formValues) => {
  return hazeApi.put(`/addresss/` + formValues._id, formValues)
}

export default {
  getAddresss,
  createAddress,
  updateAddress
}
