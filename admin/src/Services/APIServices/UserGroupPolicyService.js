import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getUserGroupPolicys = async (query) =>
  hazeApi.get(query ? `/policies?${serialize(query)}` : '/policies')

const getUserGroupPolicyByCode = (code) => hazeApi.get(`policies/code/${code}`)

export default {
  getUserGroupPolicys,
  getUserGroupPolicyByCode
}
