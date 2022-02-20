import { refreshToken } from "~/lib/apollo/links/refresh.token.link";
import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq
} from "~/lib/apollo/utils";
import { ScaffoldHandler } from "../App/withSSRScaffold";
import {
  PRODUCT_MY_SHOPPING_CART_FIELDS,
  QUERY_MY_SHOPPING_CART
} from "./Apollo/gqls";

export const SSRShoppingCartHandler: ScaffoldHandler = async (ctx, apollo) => {
  // just call when token has
  const access_token = getAccessTokenFromReq(ctx.req);
  const refresh_token = getRefreshTokenFromReq(ctx.req);
  if (access_token && refresh_token)
    await apollo.query({
      query: QUERY_MY_SHOPPING_CART(PRODUCT_MY_SHOPPING_CART_FIELDS)
    });
};
