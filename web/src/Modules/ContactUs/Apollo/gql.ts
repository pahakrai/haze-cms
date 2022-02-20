import { gql } from "@apollo/client";

export const CUSTOMER_ENQUIRY_CREATE_FIELDS = `
    workspace{
      _id
    }
    phone
    message
    email
`;

export const CREATE_CUSTOMER_ENQUIRY = (
  fields = CUSTOMER_ENQUIRY_CREATE_FIELDS
) => gql`
  mutation CreateCustomerEnquiry(
    $customerEnquiryCreateModel: CustomerEnquiryCreateModel!
    ) {
        createCustomerEnquiry(customerEnquiryCreateModel:$customerEnquiryCreateModel) {
      ${fields}
    }
  }
`;
