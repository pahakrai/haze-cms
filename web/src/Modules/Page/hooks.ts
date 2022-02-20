import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { useTheme, ThemeType } from "~/lib/theme";
import {
  QUERY_PAGE_BY_PATH,
  QUERY_PAGE_SEO,
  QUERY_PAGES_BY_PATH
} from "../Page/Apollo/gqls";

interface usePageArgs {
  variables: { path: string };
  onCompleted?: (page?: IPage) => void;
  onError?: () => void;
}
export const usePage = (args?: usePageArgs) => {
  const { data, loading, refetch } = useQuery<{ pageByPath: IPage }>(
    QUERY_PAGE_BY_PATH(),
    {
      skip: !args?.variables?.path,
      variables: args?.variables || {},
      onCompleted: (data) => {
        args?.onCompleted?.(data?.pageByPath);
      },
      onError: () => {
        args?.onError?.();
      }
    }
  );
  return { page: data?.pageByPath, loading, refetch };
};

interface usePageSeoArgs {
  variables: { path: string };
  onCompleted?: (page?: IPage) => void;
  onError?: () => void;
  skip?: boolean;
}
export const usePageSeo = (args?: usePageSeoArgs) => {
  const { data, loading, refetch } = useQuery<{ pageSeo: IPage }>(
    QUERY_PAGE_SEO(),
    {
      skip: !args?.variables?.path,
      variables: args?.variables || {},
      onCompleted: (data) => {
        args?.onCompleted?.(data?.pageSeo);
      },
      onError: (e) => {
        args?.onError?.();
      }
    }
  );
  return { page: data?.pageSeo, loading, refetch };
};

interface usePagesArgs {
  prefix?: string;
  sections?: string[];
  others?: string[];
  variables?: { paths?: string };
  onCompleted?: (page?: IPage[]) => void;
  onError?: () => void;
}
export const usePages = ({
  prefix,
  sections,
  others = [],
  onCompleted,
  onError,
  variables
}: usePagesArgs = {}) => {
  const argPaths: any = variables?.paths || [];
  const paramPaths = [
    ...argPaths,
    ...(sections?.map((v) => (prefix ? `${prefix}/${v}` : v)) || []),
    ...others
  ];
  const paths = useMemo(() => paramPaths, paramPaths);
  const { data, loading, refetch } = useQuery<{ pagesByPath: IPage[] }>(
    QUERY_PAGES_BY_PATH(),
    {
      // skip: !args?.variables?.paths,
      variables: { paths },
      onCompleted: (data) => {
        onCompleted?.(data?.pagesByPath);
      },
      onError: () => {
        onError?.();
      }
    }
  );
  return { pages: data?.pagesByPath, loading, refetch };
};

export const usePagesSectionResult = ({
  prefix,
  sections,
  others = []
}: {
  prefix?: string;
  sections?: string[];
  others?: string[];
}) => {
  const { pages, loading } = usePages({
    prefix: prefix,
    sections: sections,
    others
  });

  const results = useMemo(
    () =>
      pages?.reduce((value: any, page: IPage) => {
        if (page?.path) {
          value[page?.path] = page;
        }

        return value;
      }, {}),
    [pages]
  );
  return { pages: results, loading };
};

export const usePageBreakpoints = (theme?: ThemeType) => {
  const _theme = theme || useTheme();
  const {
    breakpoints_sm_min_width,
    breakpoints_md_min_width,
    breakpoints_lg_min_width,
    breakpoints_xl_min_width
  } = _theme.dimensions;

  /* temporarily hard code */
  return {
    xs: 0,
    sm: 405,
    md: 688,
    lg: 1160,
    xl: 1536
  };
};
