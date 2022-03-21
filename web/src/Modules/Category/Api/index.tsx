import request, { serialize } from "~/utils/api-utils";

export const fetchCategories = (query: any) => {
  return request({
    url: `/categories/?${serialize(query)}`,
    method: "get"
  }).then(({ data }) => data);
};
