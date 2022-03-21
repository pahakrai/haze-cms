import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const createTag = (tag) => hazeApi.post(`tags/`, tag)

const deleteTag = (tagId) => hazeApi.delete(`tags/` + tagId)

const getTagById = (tagId) => hazeApi.get(`tags/${tagId}`)

const getTagByText = (tagText, query) =>
  hazeApi.get(`tags/?text=${tagText}&` + serialize(query))

const getTagsByPostId = (postId) =>
  hazeApi.get(`tags/?ref=${postId}&refType=Posts`)

const getTagsByProductId = (id) =>
  hazeApi.get(`tags/?ref=${id}&refType=Products`)

const getTags = () => hazeApi.get(`tags/`)

const getDistinctTags = (query) =>
  hazeApi.get(`tags/distinct?${serialize(query)}`)

const updateTagImage = async (id, tag, files) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(tag)
  data.append('form', stringtifyBody)
  return hazeApi.put(`tag-images/${id}`, data, files)
}

const createTagImage = async (tag, files) => {
  const data = new FormData()
  files.forEach((f) => data.append('files', f))
  const stringtifyBody = JSON.stringify(tag)
  data.append('form', stringtifyBody)
  return hazeApi.post(`tag-images`, data, files)
}
export default {
  createTag,
  deleteTag,
  getTagById,
  getTagByText,
  getTagsByPostId,
  getTagsByProductId,
  getTags,
  getDistinctTags,
  updateTagImage,
  createTagImage
}
