import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getCustomerEnquiries = (query) =>
  hazeApi.get(`/customer-enquiries?${serialize(query)}`)

export const getCustomerEnquiryById = (id, query) =>
  hazeApi.get(`customer-enquiries/${id}?${serialize(query)}`)

const createCustomerEnquiry = (formValues) =>
  hazeApi.post(`customer-enquiries`, formValues)

const updateCustomerEnquiry = (id, formValues) =>
  hazeApi.put(`customer-enquiries/${id}`, formValues.value)

const updateToFollow = (id) =>
  hazeApi.patch(`customer-enquiries/${id}/updateToFollow`)

export default {
  getCustomerEnquiries,
  createCustomerEnquiry,
  updateCustomerEnquiry,
  getCustomerEnquiryById,
  updateToFollow
}
