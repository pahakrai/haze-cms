import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getPayments = (opts) => {
  return hazeApi.get('/payments?' + serialize(opts))
}

const getPaymentById = (id) => {
  return hazeApi.get('/payments/' + id)
}

const createPayment = (formValues, files, onUploadProgress) => {
  const data = new FormData()
  // files
  files.forEach((f) => data.append(`files`, f))
  // body
  const stringtifyBody = JSON.stringify(formValues)
  data.append('form', stringtifyBody)
  return hazeApi.post(`/payments`, data, { onUploadProgress })
}

const updatePayment = (formValues) => {
  return hazeApi.put(`/payments/` + formValues._id, formValues)
}

const createTransaction = (paymentId, formValues, files, onUploadProgress) => {
  const data = new FormData()
  // files
  files.forEach((f) => data.append(`files`, f))
  // body
  const stringtifyBody = JSON.stringify(formValues)
  data.append('form', stringtifyBody)
  return hazeApi.post(`/payments/${paymentId}/transaction`, data, {
    onUploadProgress
  })
}

const updateTransaction = (paymentId, formValues, files, onUploadProgress) => {
  const data = new FormData()
  // files
  files.forEach((f) => data.append(`files`, f))
  // body
  const stringtifyBody = JSON.stringify(formValues)
  data.append('form', stringtifyBody)
  return hazeApi.put(
    `/payments/${paymentId}/transaction/${formValues._id}`,
    data,
    {
      onUploadProgress
    }
  )
}

export default {
  self: hazeApi,
  createPayment,
  getPaymentById,
  getPayments,
  updatePayment,
  createTransaction,
  updateTransaction
}
