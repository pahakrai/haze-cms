import { ScaffoldHandler } from "../App/withSSRScaffold";
import { QUERY_PRODUCT } from "./Apollo/gql";
export const SSRProductHandler = (field: string): ScaffoldHandler => {
  return async (ctx, apollo) => {
    const productId = ctx.query._id;
    if (productId)
      await apollo.query({
        query: QUERY_PRODUCT(field),
        variables: {
          id: productId
        }
      });
  };
};
