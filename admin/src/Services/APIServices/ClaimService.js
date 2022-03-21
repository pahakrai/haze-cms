import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getClaims = (opts) => {
  return hazeApi.get('/claims?' + serialize(opts))
}

const getClaimById = (id, query) => {
  return hazeApi.get('/claims/' + id + '?' + serialize(query))
}

const createClaim = (formValues) => {
  return hazeApi.post(`/claims`, formValues)
}

const getExamineClaim = (id, examine) => {
  return hazeApi.patch(`/claims/email/${id}`, examine)
}

const updateClaim = (formValues) => {
  return hazeApi.put(`/claims/` + formValues._id, formValues)
}

const approveClaim = (id) => hazeApi.patch(`claims/${id}/approve`)
const rejectClaim = (id, formValues) =>
  hazeApi.patch(`claims/${id}/decline`, formValues)
const appealClaim = (id) => hazeApi.patch(`claims/${id}/appeal`)

const deleteExpense = (claimId, expenseId) =>
  hazeApi.delete(`claims/${claimId}/remove/${expenseId}`)

export default {
  self: hazeApi,
  createClaim,
  approveClaim,
  getClaimById,
  getExamineClaim,
  getClaims,
  rejectClaim,
  appealClaim,
  updateClaim,
  deleteExpense
}
