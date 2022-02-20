import React from "react";
import { ApolloError, useMutation } from "@apollo/client";
import {
  MUTATION_REDEEM_COUPON,
  ORDER_CHARGE_COUPON_FIELDS
} from "../Apollo/useRedeemCoupon.gqls";

export interface UseReedemCouponArgs {}
export interface UseRedeemCouponHook {
  redeemCoupon: (
    code: string,
    model: {
      productTotAmount: number;
      products: Array<{
        product: string;
        productSKU: string;
        amount: number;
      }>;
    }
  ) => void;
  loading?: boolean;
  data?: IOrderChargeCoupon;
  error?: ApolloError;
}
export const useRedeemCoupon = (
  args?: UseReedemCouponArgs
): UseRedeemCouponHook => {
  const [_redeemCoupon, { loading, data, error }] = useMutation<{
    redeemCoupon: IOrderChargeCoupon;
  }>(MUTATION_REDEEM_COUPON(ORDER_CHARGE_COUPON_FIELDS));
  const redeemCoupon = React.useCallback(
    (
      code: string,
      model: {
        productTotAmount: number;
        products: Array<{
          product: string;
          productSKU: string;
          amount: number;
        }>;
      }
    ) => {
      _redeemCoupon({
        variables: {
          code,
          model
        }
      });
    },
    [_redeemCoupon]
  );
  return { redeemCoupon, loading, data: data?.redeemCoupon, error };
};
