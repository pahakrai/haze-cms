import { gql } from "@apollo/client";

export const CREATE_QUOTATION = (fields = QUOTATIONL_FIELDS) => gql`
  mutation CreateQuotation($values: QuotationFormCreateModel) {
      createQuotation(quotationFormCreateModel:$values) {
      ${fields}
    }
  }
`;
export const QUOTATIONL_FIELDS = `
    _id 
`;
