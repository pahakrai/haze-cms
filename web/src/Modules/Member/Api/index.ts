import request, { serialize } from "~/utils/api-utils";

export const fetchMemberOrganizations = (query: any) => {
  return request({
    url: `/members/organizations/?${serialize(query)}`,
    method: "get"
  }).then(({ data }) => data);
};
