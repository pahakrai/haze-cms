import { useQuery } from "@apollo/client";
import Common from "@golpasal/common";

import { QUERY_AUTH_CONFIGS } from "../../AuthConfig//Apollo/gqls";

const UserType = Common.type.UserType;

interface useAuthConfigsArgs {
  userTypes: string[];
}
export const useAuthConfigs = (args?: useAuthConfigsArgs) => {
  const { data: authConfigData } = useQuery<{
    authConfigs: {
      nodes: IAuthConfig[];
    };
  }>(QUERY_AUTH_CONFIGS(), {
    variables: {
      query: { userTypes: args?.userTypes || [UserType.MEMBER] }
    }
  });
  return {
    authConfigs: authConfigData?.authConfigs?.nodes
  };
};
