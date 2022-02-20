import React from "react";
import Head from "next/head";

import { useLocale } from "~/lib/intl";

interface PageTitleProps {
  page?: Partial<IPage>;
  pageTitle?: string;
  pageParam?: IPageParam;
}

export const PageTitle = ({ page, pageTitle, pageParam }: PageTitleProps) => {
  const { locale } = useLocale();
  const _pageTitle = pageTitle || page?.title?.[locale];
  const withParamTitle = `${pageParam?.meta?.["og:title"] || ""}${_pageTitle}`;
  return (
    <Head>
      <title>{withParamTitle}</title>
      <meta key="title" name="title" content={withParamTitle} />
      <meta key="og:title" property="og:title" content={_pageTitle} />
    </Head>
  );
};

export default PageTitle;
