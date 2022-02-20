import { useQuery } from "@apollo/client";
import { CATEGORY_FIELDS, QUERY_CATEGORIES } from "../Apollo/gqls";

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
