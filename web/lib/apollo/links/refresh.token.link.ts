import Router from "next/router";
import { onError } from "@apollo/client/link/error";
import { fetchAccessToken } from "~/lib/auth/fetchRefreshToken";
import { logout } from "~/src/Modules/Auth/Hooks/useLogout";
import { Observable } from "@apollo/client";
import { isServer } from "~/lib/utils";
import { getAccessToken, getRefreshToken, setToken } from "~/lib/auth";
const UNAUTHORIZED_EXCEPTION = "UNAUTHORIZED_EXCEPTION";
export const refreshToken = async (
  access?: string,
  refresh?: string
): Promise<IToken | undefined> => {
  let token: IToken | undefined = undefined;
  try {
    if (access && refresh) {
      const response = await fetchAccessToken();
      const json = await response.json();
      token = json.data.refreshToken;
      if (!token) {
        throw new Error("Refresh token invalid");
      }
      if (!isServer()) {
        setToken(token);
      }
    }
  } catch (error) {
    console.info("Try fetch access token by refresh token but:", error);
    if (!isServer()) {
      logout();
      Router.reload();
    }
  }
  return token;
};
export const createRefreshToken = (options: ICreateApolloLinkOptions) => {
  return onError(({ graphQLErrors, operation, forward }) => {
    // Just catch statusCode === 401 UnAuthed error
    // @ts-ignore
    if (graphQLErrors && graphQLErrors[0].extensions?.statusCode === 401) {
      return new Observable((observer): void => {
        let token = undefined;
        if (isServer()) {
          token = options?.getToken();
        } else {
          token = {
            access_token: getAccessToken(),
            refresh_token: getRefreshToken()
          };
        }
        refreshToken(token?.access_token, token?.refresh_token)
          .then((auth) => {
            if (!auth) {
              throw new Error(UNAUTHORIZED_EXCEPTION);
            }
            operation.setContext(({ headers = {} }: Record<string, any>) => ({
              headers: {
                ...headers,
                Authorization: `Bearer ${auth.access_token}` // should the same with Auth link
              }
            }));
          })
          .then(() => {
            forward(operation).subscribe(observer);
          })
          .catch((error) => {
            observer.error(error);
          });
      });
    }
  });
};

export default createRefreshToken;
