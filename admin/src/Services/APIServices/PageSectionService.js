import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getPageSection = opts => {
  return ecommApi.get('/pages?' + serialize(opts));
};

const getPageSectionById = (id, opts) => {
  return ecommApi.get(`/pages/${id}?${serialize(opts)}`);
};

const createPageSection = (formValues, files) => {
  const data = new FormData();
  files.forEach(f => data.append(`files`, f));
  const stringtifyBody = JSON.stringify(formValues);
  data.append('pageSection', stringtifyBody);
  return ecommApi.post(`/pages`, data);
};

const updatePageSection = (formValues, files) => {
  const data = new FormData();
  files.forEach(f => data.append(`files`, f));
  const stringtifyBody = JSON.stringify(formValues);
  data.append('pageSection', stringtifyBody);
  return ecommApi.put(`/pages/` + formValues._id, data);
};

export default {
  self: ecommApi,
  createPageSection,
  getPageSectionById,
  getPageSection,
  updatePageSection
};
