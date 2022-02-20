import { ApolloLink, from, RequestHandler } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import getConfig from "next/config";
import { loggerLink } from "./logger";
import { errorLink } from "./error";
import securityLink from "./security";
import { createAuthLink } from "./auth";
import { createAcceptLanguage } from "./accept.language";
import { createRefreshToken } from "./refresh.token.link";

const { publicRuntimeConfig } = getConfig();
export const createApolloLinks = (options?: ICreateApolloLinkOptions) => {
  const links: ApolloLink[] = [];
  const retry = new RetryLink();
  const http = new BatchHttpLink({
    uri: publicRuntimeConfig.API_URL,
    useGETForQueries: true
  });
  const acceptLanguage = createAcceptLanguage(options);
  const auth = createAuthLink(options);
  const refreshTokenLink = createRefreshToken(options);
  links.push(acceptLanguage);
  links.push(auth);
  links.push(securityLink);
  links.push(retry);
  if (process.env.APP_ENV === "development") links.push(loggerLink); // push logger link when development
  links.push(errorLink);
  links.push(refreshTokenLink);
  links.push(http);
  return from(links);
};
