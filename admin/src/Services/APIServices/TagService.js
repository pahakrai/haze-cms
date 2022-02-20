import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const createTag = tag => ecommApi.post(`tags/`, tag);

const deleteTag = tagId => ecommApi.delete(`tags/` + tagId);

const getTagById = tagId => ecommApi.get(`tags/${tagId}`);

const getTagByText = (tagText, query) =>
  ecommApi.get(`tags/?text=${tagText}&` + serialize(query));

const getTagsByPostId = postId =>
  ecommApi.get(`tags/?ref=${postId}&refType=Posts`);

const getTagsByProductId = id =>
  ecommApi.get(`tags/?ref=${id}&refType=Products`);

const getTags = () => ecommApi.get(`tags/`);

const getDistinctTags = query =>
  ecommApi.get(`tags/distinct?${serialize(query)}`);

const updateTagImage = async (id, tag, files) => {
  const data = new FormData();
  files.forEach(f => data.append('files', f));
  const stringtifyBody = JSON.stringify(tag);
  data.append('form', stringtifyBody);
  return ecommApi.put(`tag-images/${id}`, data, files);
};

const createTagImage = async (tag, files) => {
  const data = new FormData();
  files.forEach(f => data.append('files', f));
  const stringtifyBody = JSON.stringify(tag);
  data.append('form', stringtifyBody);
  return ecommApi.post(`tag-images`, data, files);
};
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
};
