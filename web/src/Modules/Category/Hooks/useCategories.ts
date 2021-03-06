import { useQuery } from "@apollo/client";
import common from "@golpasal/common";
import { useQuery as useRQ } from "react-query";
import { fetchCategories } from "../Api";
import { CATEGORY_FIELDS, QUERY_CATEGORIES } from "../Apollo/gqls";

const { CategoryType } = common.type;

interface useCategoriesArgs {
  onCompleted?: (categories?: ICategory[]) => void;
  onError?: () => void;
  variables?: {
    query?: {
      isActive?: boolean;
      parent?: string | null;
    };
  };
}
interface useCategoriesHook {
  categories?: ICategory[];
  loading?: boolean;
}

export const useCategories = (args?: useCategoriesArgs): useCategoriesHook => {
  const { data, loading } = useQuery<{
    categories: PaginationResult<ICategory>;
  }>(QUERY_CATEGORIES(CATEGORY_FIELDS), {
    onCompleted: (data) => {
      const categories = data?.categories.nodes;
      if (categories) {
        args?.onCompleted?.(categories);
      } else {
        args?.onError?.();
      }
    },
    onError: () => {
      args?.onError?.();
    },
    variables: args?.variables
  });
  return { categories: data?.categories.nodes, loading };
};

export const useRQSubjects = (args?: useCategoriesArgs) => {
  const { data } = useRQ<any>(
    ["subjects"],
    () =>
      fetchCategories({
        ...args?.variables?.query,
        types: [CategoryType.SUBJECT],
        localize: true
      }),
    {}
  );
  return { subjects: data };
};

export const useRQIndustries = (args?: useCategoriesArgs) => {
  const { data } = useRQ<any>(
    ["industries"],
    () =>
      fetchCategories({
        ...args?.variables?.query,
        types: [CategoryType.INDUSTRY],
        localize: true
      }),
    {}
  );
  return { industries: data };
};
