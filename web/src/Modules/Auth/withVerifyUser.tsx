import React from "react";
import { NextPage } from "next";
import { MUTATION_VALIDATE_PASSCODE_TOKEN } from "./Apollo/gqls";
import { initializeApollo } from "~/lib/apollo/client";
import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq
} from "~/lib/apollo/utils";

export function withVerifyUser(Component: NextPage) {
  return class withVerifyUser extends React.Component {
    static async getInitialProps(ctx: any) {
      const { query } = ctx;
      const access_token = getAccessTokenFromReq(ctx.req);
      const refresh_token = getRefreshTokenFromReq(ctx.req);
      const apolloClient = initializeApollo(null, {
        getToken: () => ({
          access_token,
          refresh_token
        })
      });
      let validateUser = false;
      try {
        const validateResult = await apolloClient.mutate({
          mutation: MUTATION_VALIDATE_PASSCODE_TOKEN(),
          variables: {
            token: query?.token,
            options: {}
          }
        });
        // set validateUser
        validateUser = !!validateResult.data;
      } catch (error) {
        // throw token not validate
        validateUser = false;
      }
      // for get next
      let pageProps = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      // merge all props
      return { ...pageProps, passcodeToken: query?.token, validateUser };
    }
    render() {
      const { children, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
}
