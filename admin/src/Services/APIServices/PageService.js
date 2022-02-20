import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getPages = opts => {
  return ecommApi.get('/pages?' + serialize(opts));
};

const getPageById = id => {
  return ecommApi.get('/pages/' + id);
};

const createPage = formValues => {
  return ecommApi.post(`/pages`, formValues);
};

const updatePage = formValues => {
  return ecommApi.put(`/pages/` + formValues._id, formValues);
};

const duplicatePath = (_id, path) => {
  const formatPath = path.replace('/', '%2F');
  return ecommApi.get(`pages/duplicate-path/${_id}/` + formatPath);
};

const getTemplateWhenCreatePage = () => ecommApi.get('/pages/get/template');

export default {
  self: ecommApi,
  createPage,
  getPageById,
  getPages,
  updatePage,
  duplicatePath,
  getTemplateWhenCreatePage
};
