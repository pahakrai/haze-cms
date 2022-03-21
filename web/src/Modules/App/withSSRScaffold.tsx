import React from "react";
import { NextComponentType, NextPageContext } from "next";
interface ApolloNextPageContext extends NextPageContext {
  initialApolloState?: any;
}

interface RQNextPageContext extends NextPageContext {
  initialRQState?: any;
}

import { ApolloClient } from "@apollo/client";
import { dehydrate, QueryClient } from "react-query";

import { initializeApollo } from "~/lib/apollo/client";
import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq
} from "~/lib/apollo/utils";
import { getLanguageFromReq } from "~/lib/intl/getLanguageFromReq";

export declare type ScaffoldHandler = (
  ctx: NextPageContext,
  apollo: ApolloClient<any>
) => Promise<void>;

export const withSSRScaffold =
  (links?: ScaffoldHandler[]) =>
  <P,>(Page: NextComponentType<any, {}, P>) => {
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
        return {
          ...pageProps,
          initialApolloState: apolloClient.cache.extract()
        };
      }
      render() {
        return <Page {...this.props} />;
      }
    };
  };

export declare type RQScaffoldHandler = (
  ctx: NextPageContext,
  reactQuery: QueryClient
) => Promise<void>;

export const withRQSSRScaffold =
  (links?: RQScaffoldHandler[]) =>
  <P,>(Page: NextComponentType<any, {}, P>) => {
    return class extends React.Component<P> {
      static async getInitialProps(ctx: RQNextPageContext) {
        // NOTE: maybe required to pass the tokens through context for request on React Query Client
        // TODO: test the request cases properly
        const access_token = getAccessTokenFromReq(ctx.req);
        const refresh_token = getRefreshTokenFromReq(ctx.req);
        const language = getLanguageFromReq(ctx.req);
        // init apollo
        const rqClient = new QueryClient();
        // build all promise
        const handlers = links.map((handler) => {
          return new Promise((_r, _j) => {
            handler(ctx, rqClient)
              .then((result) => _r(result))
              .catch(() => _r(false));
          });
        });
        await Promise.all(handlers);
        let pageProps = {};
        if (Page.getInitialProps) {
          pageProps = await Page.getInitialProps(ctx);
        }

        return {
          ...pageProps,
          dehydratedState: dehydrate(rqClient)
        };
      }
      render() {
        return <Page {...this.props} />;
      }
    };
  };
