import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getCandidates = (query) => hazeApi.get(`/candidates?${serialize(query)}`)

export const getCandidateById = (id) => hazeApi.get('candidates/' + id)

const createCandidate = (candidate) => hazeApi.post(`candidates`, candidate)

const updateCandidate = (candidate) =>
  hazeApi.put(`candidates/${candidate._id}`, candidate)

export default {
  getCandidates,
  createCandidate,
  updateCandidate,
  getCandidateById
}
