import gql from "graphql-tag";

export const AUTH_CONFIGS_FIELDS = `
  userType
  verifiedRequirements
  signUpRequireVerify 
  loginRequireVerify    
`;

export const QUERY_AUTH_CONFIGS = (fields = AUTH_CONFIGS_FIELDS) => gql`
  query authConfigs (
    $query: AuthConfigSearchModel,
    $paginate: Paginate,
    $options: QueryOption) {
    authConfigs(query: $query, paginate: $paginate, options: $options) {
      nodes {
        _id
        ${fields}
      }
      nodeCount
      total
      startCursor
      endCursor
      isEnd
    }
  }
`;
