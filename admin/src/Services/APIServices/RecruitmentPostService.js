import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getRecruitmentPosts = opts => {
  return ecommApi.get('/recruitments?' + serialize(opts));
};

const getRecruitmentPostById = (id, opts) => {
  return ecommApi.get('/recruitments/' + id + '?' + serialize(opts));
};

const createRecruitmentPost = formValues => {
  return ecommApi.post(`/recruitments`, formValues);
};

const updateRecruitmentPost = formValues => {
  return ecommApi.put(`/recruitments/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createRecruitmentPost,
  getRecruitmentPostById,
  getRecruitmentPosts,
  updateRecruitmentPost
};
