import { setContext } from "@apollo/client/link/context";
import { getCurrentLanguage } from "~/lib/intl/persist";
export const createAcceptLanguage = (options?: ICreateApolloLinkOptions) => {
  return setContext((_, { headers }) => {
    const language = options?.getLanguage?.() || getCurrentLanguage();
    return {
      headers: {
        ...headers,
        "Accept-Language": language || "en"
      }
    };
  });
};
