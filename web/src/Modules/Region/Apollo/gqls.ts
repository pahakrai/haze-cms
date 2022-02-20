import { gql } from "@apollo/client";
export const REGIONS = (fields = REGION_FIELDS) => gql`
  query Regions($query:RegionSearchModel,$paginate:Paginate){
    regions(query: $query, paginate: $paginate){
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
export const REGION_FIELDS = `
  name
  parent {
    _id
    name
    parent {
      _id
      name
    }
  }
`;
