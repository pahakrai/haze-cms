import React from "react";
import { NextPage, NextPageContext } from "next";
import { useQuery } from "@apollo/client";
import getConfig from "next/config";

import PageContent from "~/src/Modules/Page/Components/PageContent";
import Layout from "~/src/Modules/App/Components/Layout";
import { QUERY_PAGE_BY_PATH } from "~/src/Modules/Page/Apollo/gqls";
import { useRouter } from "next/router";
import { initializeApollo } from "~/lib/apollo/client";
import {
  QUERY_WORKSPACE,
  WORKSPACE_FIELDS
} from "~/src/Modules/Workspace/Apollo/gqls";
import { Container } from "@material-ui/core";

const { publicRuntimeConfig } = getConfig();
export interface DynamicPageProps {}

const DynamicPage: NextPage<DynamicPageProps> = ({}) => {
  const route = useRouter();
  const { data, error } = useQuery<{ pageByPath: IPage }>(
    QUERY_PAGE_BY_PATH(),
    {
      variables: {
        path: route.asPath
      }
    }
  );
  return (
    <Layout>
      <Container maxWidth="lg">
        <PageContent page={data.pageByPath} error={error} />
      </Container>
    </Layout>
  );
};
DynamicPage.getInitialProps = async (context: NextPageContext) => {
  let pageProps = {};
  const {
    query: { path }
  } = context;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: QUERY_PAGE_BY_PATH(),
    variables: {
      path
    }
  });
  await apolloClient.query({
    query: QUERY_WORKSPACE(WORKSPACE_FIELDS),
    variables: {
      id: publicRuntimeConfig.WORKSPACE
    }
  });
  return {
    ...pageProps
    // initialApolloState: apolloClient.cache.extract()
  };
};
export default DynamicPage;
