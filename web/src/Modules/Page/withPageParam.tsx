import React from "react";
import App from "next/app";
import { NextPage } from "next";
import { QUERY_PAGE_PARAM } from "../Page/Apollo/gqls";

// for next app , inject global pageParam
export function withPageParam(Component: NextPage) {
  return class WithPageParam extends React.Component {
    static async getInitialProps(ctx: any) {
      const appProps = await App.getInitialProps(ctx);
      // get common page param data
      const paramPageResult = await ctx.apolloClient.query({
        query: QUERY_PAGE_PARAM(),
      });
      return {
        ...appProps,
        pageProps: {
          ...appProps.pageProps,
          pageParam: paramPageResult?.data?.paramPageMeta,
        },
      };
    }
    render() {
      const { children, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
}
