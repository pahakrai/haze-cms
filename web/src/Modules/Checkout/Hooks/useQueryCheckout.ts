import { ApolloError, useQuery } from "@apollo/client";
import { CHECKOUT_FIELDS, QUERY_CHECKOUT } from "../Apollo/gqls";

interface useQueryCheckoutArgs {
  _id?: string;
}
interface useQueryCheckoutHook {
  checkout?: ICheckout;
  error?: ApolloError;
  loading: boolean;
}
export const useQueryCheckout = (
  args?: useQueryCheckoutArgs
): useQueryCheckoutHook => {
  const { data, loading, error } = useQuery<{
    getCheckout: ICheckout;
  }>(QUERY_CHECKOUT(CHECKOUT_FIELDS), {
    skip: !args?._id,
    variables: {
      id: args?._id
    }
  });

  return { checkout: data?.getCheckout, loading, error };
};
