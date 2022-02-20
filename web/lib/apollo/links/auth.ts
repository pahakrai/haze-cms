import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "~/lib/auth";
export function createAuthLink(options?: ICreateApolloLinkOptions) {
  return setContext((_, { headers }) => {
    const token = options?.getToken?.()?.access_token || getAccessToken();
    return {
      headers: {
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...headers
      }
    };
  });
}
