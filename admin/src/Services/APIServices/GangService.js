import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getGangs = opts => ecommApi.get(`gangs?` + serialize(opts));
const createGang = gang => ecommApi.post('gangs', gang);
const updateGang = gang => {
  return ecommApi.put(`/gangs/` + gang._id, gang);
};

const getGangById = (id, opts) =>
  ecommApi.get('gangs/' + id + '?' + serialize(opts));

const importDriver = (id, files, onUploadProgress) => {
  const data = new FormData();
  if (files) files.forEach(f => data.append(`file`, f));
  return ecommApi.post(`gangs/${id}/imports`, data, {
    onUploadProgress
  });
};

export default {
  getGangs,
  createGang,
  updateGang,
  getGangById,
  importDriver
};
