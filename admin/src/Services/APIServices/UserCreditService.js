import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getUserCredits = (query) =>
  hazeApi.get(`/user-credits?${serialize(query)}`)

const createUserCredit = (transaction) =>
  hazeApi.post(`/user-credits`, transaction)

const getUserCreditByUId = (uid) => hazeApi.get('user-credits/' + uid)

const getUserAllCreditByUId = (uid) => hazeApi.get(`/user-credits/${uid}/all`)

export default {
  createUserCredit,
  getUserCreditByUId,
  getUserCredits,
  getUserAllCreditByUId
}
