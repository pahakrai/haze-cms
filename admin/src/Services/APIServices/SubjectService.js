import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getSubjects = (query) => hazeApi.get(`/subjects?${serialize(query)}`)

export const getSubjectById = (id) => hazeApi.get('subjects/' + id)

const createSubject = (subject) => hazeApi.post(`subjects`, subject)

const updateSubject = (subject) =>
  hazeApi.put(`subjects/${subject._id}`, subject)

export default {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject
}
