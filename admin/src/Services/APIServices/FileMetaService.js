import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getFileMetas = async (query) => {
  const response = await hazeApi.get('/blobs?' + serialize(query))
  return response
}

const getFileMetaById = async (id) => {
  const response = await hazeApi.get('/blobs/' + id)
  return response
}

const createFileMeta = async (fileMeta, files, onUploadProgress) => {
  const data = new FormData()
  if (files) files.forEach((f) => data.append(`files`, f))
  data.append('fileMeta', JSON.stringify(fileMeta))
  return hazeApi.post(`/blobs`, data, { onUploadProgress })
}

const updateFileMeta = async (fileMeta, files, onUploadProgress) => {
  const data = new FormData()
  if (files) files.forEach((f) => data.append(`files`, f))
  data.append('fileMeta', JSON.stringify(fileMeta))
  return hazeApi.put(`/blobs/` + fileMeta._id, data, {
    onUploadProgress
  })
}

const deleteFileMeta = async (id) => {
  const response = await hazeApi.delete('/blobs/' + id)
  return response
}

const findFileMetas = (search) => {
  return hazeApi.get('/filemetas?' + serialize(search))
}

export default {
  self: hazeApi,
  createFileMeta,
  getFileMetaById,
  getFileMetas,
  updateFileMeta,
  deleteFileMeta,
  findFileMetas
}
