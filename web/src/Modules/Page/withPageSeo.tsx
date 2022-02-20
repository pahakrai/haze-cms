import React from "react";
import { NextPage } from "next";
import serverApi from "~/lib/serverApi";

export function withPageSeo(Component: NextPage<any>) {
  return class WithPage extends React.Component {
    static async getInitialProps(ctx: any) {
      const { pathname } = ctx;
      // get page data by path
      const pageResult = await serverApi.get(
        "/pages?isTemplate=false&&isSection=false&&isSeo=true&&isActive=true&&path=" +
          pathname
      );
      const page = pageResult?.data?.[0];

      // dispatch getCurrentUser in server side
      let pageProps = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      return {
        ...pageProps,
        pageSeo: { title: page?.title, meta: page?.meta },
      };
    }
    render() {
      const { children, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
}
