import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getPayments = opts => {
  return ecommApi.get('/payments?' + serialize(opts));
};

const getPaymentById = id => {
  return ecommApi.get('/payments/' + id);
};

const createPayment = (formValues, files, onUploadProgress) => {
  const data = new FormData();
  // files
  files.forEach(f => data.append(`files`, f));
  // body
  const stringtifyBody = JSON.stringify(formValues);
  data.append('form', stringtifyBody);
  return ecommApi.post(`/payments`, data, { onUploadProgress });
};

const updatePayment = formValues => {
  return ecommApi.put(`/payments/` + formValues._id, formValues);
};

const createTransaction = (paymentId, formValues, files, onUploadProgress) => {
  const data = new FormData();
  // files
  files.forEach(f => data.append(`files`, f));
  // body
  const stringtifyBody = JSON.stringify(formValues);
  data.append('form', stringtifyBody);
  return ecommApi.post(`/payments/${paymentId}/transaction`, data, {
    onUploadProgress
  });
};

const updateTransaction = (paymentId, formValues, files, onUploadProgress) => {
  const data = new FormData();
  // files
  files.forEach(f => data.append(`files`, f));
  // body
  const stringtifyBody = JSON.stringify(formValues);
  data.append('form', stringtifyBody);
  return ecommApi.put(
    `/payments/${paymentId}/transaction/${formValues._id}`,
    data,
    {
      onUploadProgress
    }
  );
};

export default {
  self: ecommApi,
  createPayment,
  getPaymentById,
  getPayments,
  updatePayment,
  createTransaction,
  updateTransaction
};
