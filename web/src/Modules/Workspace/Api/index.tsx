import request, { serialize } from "~/utils/api-utils";

export const fetchWorkspace = (query: any) => {
  return request({
    url: `/pages/?${serialize(query)}`,
    method: "get"
  }).then(({ data }) => data);
};
