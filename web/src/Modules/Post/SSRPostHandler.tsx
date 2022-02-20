import { ScaffoldHandler } from "../App/withSSRScaffold";
import { QUERY_POSTS } from "./Apollo/gql";
export const SSRProductHandler = (field: string): ScaffoldHandler => {
  return async (ctx, apollo) => {
    const postId = ctx.query._id;
    if (postId)
      await apollo.query({
        query: QUERY_POSTS(field),
        variables: {
          id: postId
        }
      });
  };
};
