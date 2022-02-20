import gql from "graphql-tag";

export const QUERY_PARAM = () => gql`
  query Param($type: String!) {
    param(type: $type)
  }
`;
