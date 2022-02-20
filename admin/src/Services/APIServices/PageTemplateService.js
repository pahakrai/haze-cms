import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getPageTemplates = opts => {
  return ecommApi.get('/page-templates?' + serialize(opts));
};

const getPageTemplateById = (id, opts) => {
  return ecommApi.get(`/page-templates/${id}?${serialize(opts)}`);
};

const createPageTemplate = (formValues, files) => {
  const data = new FormData();
  files.forEach(f => data.append(`files`, f));
  const stringtifyBody = JSON.stringify(formValues);
  data.append('pageTemplate', stringtifyBody);
  return ecommApi.post(`/page-templates`, data);
};

const updatePageTemplate = (formValues, files) => {
  const data = new FormData();
  files.forEach(f => data.append(`files`, f));
  const stringtifyBody = JSON.stringify(formValues);
  data.append('pageTemplate', stringtifyBody);
  return ecommApi.put(`/page-templates/` + formValues._id, data);
};

export default {
  self: ecommApi,
  createPageTemplate,
  getPageTemplateById,
  getPageTemplates,
  updatePageTemplate
};
