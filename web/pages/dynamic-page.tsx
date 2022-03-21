import React from "react";
import { NextPage, NextPageContext } from "next";
import getConfig from "next/config";

import PageContent from "~/src/Modules/Page/Components/PageContent";
import Layout from "~/src/Modules/App/Components/Layout";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import request from "../utils/api-utils";
import { dehydrate, useQuery, QueryClient } from "react-query";
export interface DynamicPageProps {}

export const fetchPageByPath = (path: string) => {
  return request({
    url: `/pages/by-path${path}`,
    method: "get"
  }).then(({ data }) => data);
};

const DynamicPage: NextPage<DynamicPageProps> = ({}) => {
  const route = useRouter();

  const { isSuccess, data, isLoading, isError, error } = useQuery(
    ["getPageByPath", route.asPath],
    () => fetchPageByPath(route.asPath),
    {
      enabled: !!route.asPath
    }
  );
  console.log(isSuccess, "success here");
  return (
    <Layout>
      <Container maxWidth="lg">
        <PageContent page={data} error={error} />
      </Container>
    </Layout>
  );
};

DynamicPage.getInitialProps = async (context: NextPageContext) => {
  let pageProps = {};
  const {
    query: { path }
  } = context;
  const queryClient: QueryClient = new QueryClient();

  await queryClient.prefetchQuery(["getPageByPath", path], () =>
    fetchPageByPath(path as string)
  );

  return {
    ...pageProps,
    dehydratedState: dehydrate(queryClient)
  };
};

export default DynamicPage;
