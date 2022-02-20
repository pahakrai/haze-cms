import { ecommApi } from '../APIs';
import queryString from 'query-string';

const getCommentsByPostId = (postId, query) =>
  ecommApi.get(`post-comments/posts/${postId}?${queryString.stringify(query)}`);

const deleteComment = _id => ecommApi.delete(`post-comments/posts/${_id}`);

const findByPost = _id => ecommApi.get(`post-comments/posts/${_id}`);
export default {
  self: ecommApi,
  getCommentsByPostId,
  deleteComment,
  findByPost
};
