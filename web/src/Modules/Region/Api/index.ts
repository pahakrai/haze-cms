import request, { serialize } from "~/utils/api-utils";

export const fetchRegions = (query?: any) => {
  return request({
    url: `/regions/?${serialize(query)}`,
    method: "get"
  }).then(({ data }) => data);
};
