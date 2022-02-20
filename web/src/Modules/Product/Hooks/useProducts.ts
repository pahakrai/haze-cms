import { useMemo } from "react";
import { useQuery, FetchPolicy } from "@apollo/client";
import Common from "@golpasal/common";
import { usePaginate } from "~/lib/apollo/paginate";
import { QUERY_PRODUCTS, QUERY_PRODUCTS_BY_TAG } from "../Apollo/gql";
const { PlatformType } = Common.type;

interface useProductsArgs {
  variables: IProductSearchVariables;
  fetchPolicy?: FetchPolicy;
  skip?: boolean;
}
export const useProducts = (
  options: useProductsArgs = { variables: { query: {} } }
) => {
  const paginate = usePaginate(
    "products",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    products: PaginationResult<IProduct>;
  }>(QUERY_PRODUCTS(), {
    ...options,
    variables: {
      ...(options?.variables || {}),
      query: {
        platformTypes: [PlatformType.WEB],
        ...(options?.variables?.query || {})
      }
    }
  });
  return useMemo<Record<string, any>>(
    () => ({ ...paginate.useProps(queryResult), queryResult }),
    [queryResult]
  );
};

interface useProductsByTagArgs {
  variables: IProductByTagSearchVariables;
  fetchPolicy?: FetchPolicy;
  skip?: boolean;
}
export const useProductsByTag = (
  options: useProductsByTagArgs = { variables: { query: {} } }
) => {
  const paginate = usePaginate(
    "productsByTag",
    options?.variables?.paginate || { first: 10 }
  );
  const queryResult = useQuery<{
    productsByTag: PaginationResult<IProduct>;
  }>(QUERY_PRODUCTS_BY_TAG(), {
    ...options,
    variables: {
      ...(options?.variables || {}),
      query: {
        platformTypes: [PlatformType.WEB],
        ...(options?.variables?.query || {})
      }
    }
  });
  return useMemo<Record<string, any>>(
    () => ({ ...paginate.useProps(queryResult), queryResult }),
    [queryResult]
  );
};

export const useProductSearchResults = (
  options: useProductsArgs = { variables: { query: {} } }
) => {
  const tag = options?.variables?.query?.tag || "";
  const paginate = usePaginate(
    "products",
    options?.variables?.paginate || { first: 10 }
  );
  if (tag) {
    options.variables = {
      ...options.variables,
      query: { ...options.variables?.query, tags: [tag] }
    };
  }
  const { queryResult: tagQueryResult } = useProductsByTag({
    ...options,
    skip: !tag
  });
  const { queryResult } = useProducts({ ...options, skip: !!tag });

  const result = useMemo(() => {
    const r = tag ? tagQueryResult : queryResult;
    return tag
      ? { ...r, data: { ...r.data, products: r.data?.productsByTag } }
      : r;
  }, [tag, tagQueryResult, queryResult]);

  return paginate.useProps(result);
};
