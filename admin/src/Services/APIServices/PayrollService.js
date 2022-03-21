import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPayroll = (opts) => hazeApi.get('payrolls?' + serialize(opts))

const getPayeeUserType = () => hazeApi.get('payrolls/my-payee-usertype')

const getPayrollById = (id, query) => {
  return hazeApi.get('payrolls/' + id + '?' + serialize(query))
}

const createPayroll = (formValues) => {
  return hazeApi.post(`payrolls`, formValues)
}

const updatePayrollById = (formValues) =>
  hazeApi.put(`payrolls/${formValues.id}`, formValues.value)
const changeStatus = (id, status) =>
  hazeApi.put(`payrolls/${id}/status/${status}`)

const calculateAmount = (formValues) =>
  hazeApi.get('payrolls/calculate-amount?' + serialize(formValues))

const approvePayroll = (id, status) =>
  hazeApi.put(`payrolls/${id}/status/${status}`)
export default {
  getPayroll,
  getPayrollById,
  createPayroll,
  updatePayrollById,
  changeStatus,
  approvePayroll,
  getPayeeUserType,
  calculateAmount
}
