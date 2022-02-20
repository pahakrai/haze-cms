import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getCustomerEnquiries = query =>
  ecommApi.get(`/customer-enquiries?${serialize(query)}`);

export const getCustomerEnquiryById = (id, query) =>
  ecommApi.get(`customer-enquiries/${id}?${serialize(query)}`);

const createCustomerEnquiry = formValues =>
  ecommApi.post(`customer-enquiries`, formValues);

const updateCustomerEnquiry = (id, formValues) =>
  ecommApi.put(`customer-enquiries/${id}`, formValues.value);

const updateToFollow = id =>
  ecommApi.patch(`customer-enquiries/${id}/updateToFollow`);

export default {
  getCustomerEnquiries,
  createCustomerEnquiry,
  updateCustomerEnquiry,
  getCustomerEnquiryById,
  updateToFollow
};
