import React, { useCallback } from "react";
import { useLocale } from "~/lib/intl";

import { ReactPage, PageMeta } from ".";
import DocumentTitle from "../../App/Components/DocumentTitle";
import PageContentWidgets from "./Widgets";

interface PageContentProps {
  page?: IPage;
  pageParam?: IPageParam;
  error?: any;
}

const PageLoading = () => <div>loading...</div>;
const PageError = () => <div>404</div>;

export const PageContent = ({ page, pageParam, error }: PageContentProps) => {
  const { locale } = useLocale();

  // TODO
  const onViewportSizeChange = useCallback(() => {}, []);
  const onViewportTypeChange = useCallback(() => {}, []);

  // Loading
  if (!page && !error) return <PageLoading />;
  // error
  if (!page && error) return <PageError />;

  const commonProps = {
    locale: locale,
    page: page?.content,
    widgetTypes: PageContentWidgets,
    onViewportSizeChange,
    onViewportTypeChange
  };
  const title = page?.title[locale];
  return (
    <React.Fragment>
      {/* for meta */}
      <DocumentTitle title={title} />
      {/* for title */}
      <PageMeta page={page} pageParam={pageParam} />
      {/* page content */}
      {page?.layout?.content ? (
        <ReactPage {...commonProps}>
          <ReactPage {...commonProps} />
        </ReactPage>
      ) : (
        <ReactPage {...commonProps} />
      )}
    </React.Fragment>
  );
};

export default PageContent;
