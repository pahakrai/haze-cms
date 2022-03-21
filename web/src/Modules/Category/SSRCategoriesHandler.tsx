import common from "@golpasal/common";
import { ScaffoldHandler, RQScaffoldHandler } from "../App/withSSRScaffold";
import { fetchCategories } from "./Api";
import { CATEGORY_FIELDS, QUERY_CATEGORIES } from "./Apollo/gqls";

const { CategoryType } = common.type;

export const SSRCategoriesHandler: ScaffoldHandler = async (ctx, apollo) => {
  await apollo.query({
    query: QUERY_CATEGORIES(CATEGORY_FIELDS),
    variables: {
      query: {
        isActive: true
      }
    }
  });
};

export const SSRIndustriesRQHandler: RQScaffoldHandler = async (
  ctx,
  rqClient
) => {
  const { query } = ctx;
  await rqClient.prefetchQuery(["industries"], () =>
    fetchCategories({ isActive: true, types: [CategoryType.INDUSTRY] })
  );
};

export const SSRSubjectsRQHandler: RQScaffoldHandler = async (
  ctx,
  rqClient
) => {
  const { query } = ctx;
  await rqClient.prefetchQuery(["subjects"], () =>
    fetchCategories({ isActive: true, types: [CategoryType.SUBJECT] })
  );
};
