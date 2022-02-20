import { onError } from "@apollo/client/link/error";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ extensions: { message, path, statusCode } }) =>
      console.log(
        `[GraphQL error]: Message: ${JSON.stringify(
          message
        )}, Path: ${path}, Code: ${statusCode},`
      )
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
