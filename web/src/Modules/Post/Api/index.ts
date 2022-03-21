import request, { serialize } from "~/utils/api-utils";

export const fetchPosts = (query: any = {}) => {
  return request({
    url: `/posts/?${serialize(query)}`,
    method: "get"
  }).then(({ data }) => data);
};
