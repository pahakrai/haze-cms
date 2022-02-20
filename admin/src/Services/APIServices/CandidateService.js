import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getCandidates = query => ecommApi.get(`/candidates?${serialize(query)}`);

export const getCandidateById = id => ecommApi.get('candidates/' + id);

const createCandidate = candidate => ecommApi.post(`candidates`, candidate);

const updateCandidate = candidate =>
  ecommApi.put(`candidates/${candidate._id}`, candidate);

export default {
  getCandidates,
  createCandidate,
  updateCandidate,
  getCandidateById
};
