import React from "react";
import { NextComponentType, NextPageContext } from "next";
interface ApolloNextPageContext extends NextPageContext {
  initialApolloState?: any;
}
import { ApolloClient } from "@apollo/client";

import { initializeApollo } from "~/lib/apollo/client";
import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq
} from "~/lib/apollo/utils";
import { getLanguageFromReq } from "~/lib/intl/getLanguageFromReq";
export const withSSRScaffold = (links?: ScaffoldHandler[]) => <P,>(
  Page: NextComponentType<any, {}, P>
) => {
  return class extends React.Component<P> {
    static async getInitialProps(ctx: ApolloNextPageContext) {
      const access_token = getAccessTokenFromReq(ctx.req);
      const refresh_token = getRefreshTokenFromReq(ctx.req);
      const language = getLanguageFromReq(ctx.req);
      // init apollo
      const apolloClient = initializeApollo(ctx.initialApolloState, {
        getLanguage: () => language,
        getToken: () => ({
          access_token,
          refresh_token
        })
      });
      // build all promise
      const handlers = links.map((handler) => {
        return new Promise((_r, _j) => {
          handler(ctx, apolloClient)
            .then((result) => _r(result))
            .catch(() => _r(false));
        });
      });
      await Promise.all(handlers);
      let pageProps = {};
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }
      return { ...pageProps, initialApolloState: apolloClient.cache.extract() };
    }
    render() {
      return <Page {...this.props} />;
    }
  };
};

export declare type ScaffoldHandler = (
  ctx: NextPageContext,
  apollo: ApolloClient<any>
) => Promise<void>;
