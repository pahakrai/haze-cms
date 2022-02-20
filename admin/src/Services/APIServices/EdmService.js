import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getEdms = query => ecommApi.get(`edms?${serialize(query)}`);

const createEdm = edm => {
  const data = new FormData();
  if (edm.url) edm.url.forEach(f => data.append(`files`, f));
  const { url, ...edmData } = edm;
  data.append('edm', JSON.stringify(edmData));
  return ecommApi.post('edms', data);
};

const updateEdm = edm => {
  if (!edm._id) throw new Error('_id must');
  const data = new FormData();
  const { files, ...edmData } = edm;
  if (files) files.forEach(f => data.append(`files`, f));
  data.append('edm', JSON.stringify(edmData));
  return ecommApi.patch(`edms/${edm._id}`, data);
};

const sendEdms = edm => ecommApi.post('edms/send', edm);

const getEdmsPreview = edm => ecommApi.post('edms/preview', edm);

// findEdmById
const findEdmById = id => ecommApi.get(`edms/${id}`);

// delectEdm
const delectEdm = id => ecommApi.delete(`edms/${id}`);

// updateEdmStatus
const updateEdmStatus = (id, isActive) =>
  ecommApi.put(`edms/${id}/isActive`, { isActive });

export default {
  getEdmsPreview,
  getEdms,
  createEdm,
  updateEdm,
  delectEdm,
  updateEdmStatus,
  findEdmById,
  sendEdms
};
