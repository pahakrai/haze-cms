import { gql } from "@apollo/client";
// QUERY
export const QUERY_CATEGORIES = (fields = ``) => gql`
  query Categories($query:CategorySearchModel!){
    categories(query:$query){
      nodes{
        _id
        ${fields}
      }
      startCursor
      endCursor
      nodeCount
      total
      isEnd
    }
  }
`;
// FIELDS
export const CATEGORY_FIELDS = `
  name
  children {
    _id
    name
    code
  }
  code
`;
