import { gql } from "@apollo/client";

export const MUTATION_REDEEM_COUPON = (fields = ``) => gql`
  mutation RedeemCoupon($code: String!,$model: CouponRedeemModel) {
    redeemCoupon(code: $code, model: $model) {
      ${fields}
    }
  }
`;

export const ORDER_CHARGE_COUPON_FIELDS = `
    code
    amount
`;
