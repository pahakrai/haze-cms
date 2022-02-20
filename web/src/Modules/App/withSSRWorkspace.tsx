import React from "react";
import { NextComponentType, NextPageContext } from "next";
import getConfig from "next/config";
interface ApolloNextPageContext extends NextPageContext {
  initialApolloState?: any;
}
import { initializeApollo } from "~/lib/apollo/client";
import { QUERY_WORKSPACE, WORKSPACE_FIELDS } from "../Workspace/Apollo/gqls";
import {
  QUERY_GET_WORKSPACE_APP_BY_NAME,
  WORKSPACE_APP_FIELDS
} from "../Workspace/Hooks/useGetWorkspaceAppByName";
const { publicRuntimeConfig } = getConfig();
export const withSSRWorkspace = () => <P,>(
  Page: NextComponentType<any, {}, P>
) => {
  return class extends React.Component<P> {
    static async getInitialProps(ctx: ApolloNextPageContext) {
      // init apollo
      const apolloClient = initializeApollo(ctx.initialApolloState);
      // load workspace server side
      const { data } = await apolloClient.query({
        query: QUERY_WORKSPACE(WORKSPACE_FIELDS),
        variables: {
          id: publicRuntimeConfig.WORKSPACE
        }
      });
      // also load workspace app by workspace name SSR(SEO)
      const workspace_name = data?.workspace?.name;
      const result = await apolloClient.query({
        query: QUERY_GET_WORKSPACE_APP_BY_NAME(WORKSPACE_APP_FIELDS),
        skip: !workspace_name,
        variables: {
          name: workspace_name
        }
      });
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
