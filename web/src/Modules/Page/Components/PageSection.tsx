import React, { CSSProperties } from "react";
import Skeleton from "react-loading-skeleton";

import { useLocale } from "~/lib/intl";

import { usePageBreakpoints } from "../hooks";
import { ReactPage, PageWidgets, PageWidgetSettings } from "./";

export interface PageSectionProps {
  prefix?: string;
  section?: string;
  className?: string;
  maxWidth?: string;
  style?: CSSProperties;
  loading?: boolean;
  page?: IPage;
  component?: React.ComponentType<any>;
  children?: React.ReactNode;
  loadRes?: PageLoadingProps;
  onViewportTypeChange?: (viewportType: string) => void;
  onViewportSizeChange?: (size: { width: string; height: string }) => void;
  pagesResult?: {
    pages?: any;
    loading: boolean;
  };
}
export interface PageLoadingProps {
  count?: number;
  duration?: number;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

// set default height
const PageLoading = ({ height = 520, ...skeRes }: PageLoadingProps) => (
  <Skeleton {...skeRes} height={height} />
);

const defaultFunction = () => {};
export const PageSection = ({
  page: propPage,
  loading: propLoading,
  component: Comp = React.Fragment,
  loadRes,
  onViewportSizeChange,
  onViewportTypeChange,
  children,
  prefix,
  section,
  pagesResult,
  ...res
}: PageSectionProps) => {
  const breakpoints = usePageBreakpoints();
  const [mount, setMount] = React.useState(false);
  const { locale } = useLocale();
  React.useEffect(() => {
    setMount(true);
  }, []);
  let page = propPage;
  let loading = propLoading;
  let display = true;
  if (pagesResult) {
    page = pagesResult.pages?.[`/${prefix}/${section}`];
    loading = pagesResult.loading;
    if ((pagesResult.pages && !page) || (page && !page.isActive)) {
      display = false;
    }
  }

  return display ? (
    <Comp {...res}>
      {(loading || !page) && <PageLoading {...loadRes} />}
      {!loading && !!page && mount && (
        <React.Fragment>
          {/* add auto height wrapper avoid view duplicate render(style changed from server api response) 
        cause render from center to top&bottom, should from top to bottom */}
          <div
            style={{
              width: "100%",
              height: "auto",
              overflow: "hidden",
              position: "relative"
            }}
          >
            {/* temporarily hard code */}
            <ReactPage
              locale={locale}
              page={page?.content}
              widgetTypes={PageWidgets}
              widgetSettings={PageWidgetSettings}
              onViewportSizeChange={onViewportSizeChange || defaultFunction}
              onViewportTypeChange={onViewportTypeChange || defaultFunction}
              breakpoints={breakpoints}
            />
            {children}
          </div>
        </React.Fragment>
      )}
    </Comp>
  ) : (
    <div />
  );
};

export default PageSection;
