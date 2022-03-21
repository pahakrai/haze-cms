import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPosts = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get('/posts?' + queryString)
  return response
}

const createPost = (post, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append(`files`, f))
  const stringtifyBody = JSON.stringify(post)
  data.append('post', stringtifyBody)
  return hazeApi.post(`posts`, data, { onUploadProgress })
}
const updatePost = (_id, post, files, onUploadProgress) => {
  const data = new FormData()
  files.forEach((f) => data.append(`files`, f))
  const stringtifyBody = JSON.stringify(post)
  data.append('post', stringtifyBody)
  return hazeApi.patch(`posts/${_id}`, data, { onUploadProgress })
}
const getPostById = (id) => hazeApi.get('posts/' + id)
const deleteFileMeta = (postId, fileMetaId) =>
  hazeApi.delete(`posts/${postId}/images/${fileMetaId}`)
export default {
  createPost,
  getPosts,
  updatePost,
  getPostById,
  deleteFileMeta
}
