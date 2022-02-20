import { gql } from "@apollo/client";
import { ORDER_DETAIL_FIELD } from "../../Order/Apollo/gqls";
export const MUTATION_CHECKOUT = (fields = CHECKOUT_FIELDS) => gql`
  mutation checkout($checkoutOrderModel: CheckoutOrderModel!,$finalize: Boolean!) {
    checkout(checkoutOrderModel: $checkoutOrderModel, finalize: $finalize) {
      _id
      ${fields}
    }
  }
`;
export const QUERY_CHECKOUT = (fields = CHECKOUT_FIELDS) => gql`
  query getCheckout($id: ID!) {
    getCheckout(id: $id) {
      _id
      ${fields}
    }
  }
`;
export const CHECKOUT_FIELDS = `
    _id
    status
    expireAt
    order{
      ${ORDER_DETAIL_FIELD}
    }
`;
