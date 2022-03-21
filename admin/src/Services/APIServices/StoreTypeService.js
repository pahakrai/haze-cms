import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

export const getStoreTypes = (search) =>
  hazeApi.get('store-types?' + serialize(search))

export const getStoreTypeById = (id, search) =>
  hazeApi.get('store-types/' + id + '?' + serialize(search))

const createStoreType = (expenseType) => {
  return hazeApi.post(`store-types`, expenseType)
}

const updateStoreType = (id, expenseType) => {
  return hazeApi.put(`store-types/${id}`, expenseType)
}

const isDuplicateCode = (code, _id) => {
  return hazeApi.get(
    `/store-types/duplicate-code-value/${code}` + (_id ? `/${_id}` : '')
  )
}

export const self = hazeApi

export default {
  self: hazeApi,
  getStoreTypes,
  getStoreTypeById,
  updateStoreType,
  createStoreType,
  isDuplicateCode
}
