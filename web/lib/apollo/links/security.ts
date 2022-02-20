import getConfig from "next/config";
import { ApolloLink } from "@apollo/client";
import moment from "moment";
import { helpers } from "@golpasal/common";

const { publicRuntimeConfig: Config } = getConfig();

const { getAPIHeader } = helpers;

export const getSecurityParams = () => {
  const TIMESTAMP = moment.utc().valueOf().toString();
  const apiSecurityParam = getAPIHeader(
    Config.WORKSPACE,
    Config.WORKSPACE_SECRET
  );

  return {
    workspace: apiSecurityParam?.workspace,
    timestamp: apiSecurityParam?.timestamp?.toString() || TIMESTAMP,
    "safe-key": apiSecurityParam?.["safe-key"]
  };
};

export const securityLink = new ApolloLink((operation, forward) => {
  const apiSecurityParams = getSecurityParams();
  operation.setContext(({ headers = {} }: Record<string, any>) => ({
    headers: {
      ...headers,
      ...apiSecurityParams
    }
  }));

  return forward(operation);
});

export default securityLink;
