import React from "react";
import { useRouter } from "next/router";

import { useStartRender } from "~/lib/utils";
import { useLocale } from "~/lib/intl";
import { PageMeta } from "~/src/Modules/Page/Components/PageMeta";

import DocumentTitle from "./DocumentTitle";

interface PageHeadProps {
  title?: string;
  pageParam?: IPageParam;
}
export const PageHead = ({ pageParam, title = "" }: PageHeadProps) => {
  const startRender = useStartRender();
  const router = useRouter();
  const { locale } = useLocale();
  const page: IPage = router.query.pageSeo as any;
  const _title = page?.title?.[startRender ? locale : "zh-hk"] || title;

  return (
    <>
      <DocumentTitle title={_title} pageParam={pageParam} />
      <PageMeta page={page} pageParam={pageParam} />
    </>
  );
};

export default PageHead;
