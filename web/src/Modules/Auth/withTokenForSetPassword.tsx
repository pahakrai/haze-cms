import React from "react";
import { NextPage } from "next";
import { PageContext } from "~/pages/_app";
import { isBrowser } from "~/lib/apollo/utils";

export function withTokenForSetPassword(Component: NextPage) {
  return class withTokenForSetPassword extends React.Component {
    static async getInitialProps(ctx: PageContext) {
      const { res, query } = ctx;
      const passcodeToken = query?.token;
      if (!isBrowser() && res && !passcodeToken) {
        res.writeHead(307, { Location: "/connect-expired" });
        res.end();
      }
      // for get next
      let pageProps = {};
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
      // merge all props
      return { ...pageProps, passcodeToken };
    }
    render() {
      const { children, ...rest } = this.props;
      return <Component {...rest} />;
    }
  };
}
