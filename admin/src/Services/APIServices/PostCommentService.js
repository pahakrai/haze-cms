import { hazeApi } from '../APIs'
import queryString from 'query-string'

const getCommentsByPostId = (postId, query) =>
  hazeApi.get(`post-comments/posts/${postId}?${queryString.stringify(query)}`)

const deleteComment = (_id) => hazeApi.delete(`post-comments/posts/${_id}`)

const findByPost = (_id) => hazeApi.get(`post-comments/posts/${_id}`)
export default {
  self: hazeApi,
  getCommentsByPostId,
  deleteComment,
  findByPost
}
