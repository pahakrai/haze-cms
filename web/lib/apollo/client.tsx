import { useMemo } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createApolloLinks } from "./links";

export let apolloClient;

function createApolloClient(options: ICreateApolloLinkOptions) {
  return new ApolloClient({
    link: createApolloLinks(options),
    cache: new InMemoryCache()
  });
}
export function initializeApollo(
  initialState = null,
  options?: ICreateApolloLinkOptions
) {
  const _apolloClient = apolloClient ?? createApolloClient(options);
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
export function useApollo(
  initialState = null,
  options?: ICreateApolloLinkOptions
) {
  const store = useMemo(() => initializeApollo(initialState, options), [
    initialState
  ]);
  return store;
}
