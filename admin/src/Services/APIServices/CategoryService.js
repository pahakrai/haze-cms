import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getCategories = (query) => {
  return hazeApi.get('/categories?' + serialize(query))
}

const createCategory = (category, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(category)
  data.append('form', stringtifyBody)
  return hazeApi.post('categories', data, onUploadProgress)
}
const updateCategory = (id, category, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(category)
  data.append('form', stringtifyBody)
  return hazeApi.put(`categories/${id}`, data, files, onUploadProgress)
}

const importCategory = (file, option, onUploadProgress) => {
  const data = new FormData()
  if (file) file.forEach((f) => data.append(`file`, f))
  data.append(`overwrite`, option)
  return hazeApi.post('categories/import', data, { onUploadProgress })
}
const updateCategories = (categories) => hazeApi.put('categories', categories)

const deleteCategory = (_id) => hazeApi.delete('categories/' + _id)

const toggleActive = (_id, active) =>
  hazeApi.put(`categories/${_id}/toggle-active?active=${active}`)

export default {
  getCategories,
  createCategory,
  updateCategory,
  updateCategories,
  deleteCategory,
  toggleActive,
  importCategory
}
