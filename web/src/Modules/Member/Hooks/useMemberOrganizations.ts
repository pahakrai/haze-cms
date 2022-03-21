import { useQuery } from "react-query";
import { fetchMemberOrganizations } from "../Api";

export const useRQMemberOrganizations = (query?: any) => {
  const { data } = useQuery<any>(
    ["organizations"],
    () =>
      fetchMemberOrganizations({
        ...query
      }),
    {}
  );
  return { organizations: data };
};
