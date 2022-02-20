import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getSubjects = query => ecommApi.get(`/subjects?${serialize(query)}`);

export const getSubjectById = id => ecommApi.get('subjects/' + id);

const createSubject = subject => ecommApi.post(`subjects`, subject);

const updateSubject = subject =>
  ecommApi.put(`subjects/${subject._id}`, subject);

export default {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject
};
