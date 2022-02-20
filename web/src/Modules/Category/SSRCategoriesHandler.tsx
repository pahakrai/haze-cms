import { ScaffoldHandler } from "../App/withSSRScaffold";
import { CATEGORY_FIELDS, QUERY_CATEGORIES } from "./Apollo/gqls";
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
