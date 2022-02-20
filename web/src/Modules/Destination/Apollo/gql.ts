import { gql } from "@apollo/client";

export const QUERY_REGIONS = (fields = REGION_ITEM_FIELDS) => gql`
  query Regions($query:RegionSearchModel,$paginate:Paginate){
    regions(query:$query,paginate:$paginate){
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

export const REGION_ITEM_FIELDS = `
    _id
    code
    type
    name
    parent{
      _id
      code
      name
    }
    idx
    filemeta{
      _id
      uri
      thumbnailUri
    }
`;
