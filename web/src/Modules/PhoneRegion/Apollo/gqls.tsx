import { gql } from "@apollo/client";

export const QUERY_PHONE_REGIONS = (fields = ``) => gql`
  query  WorkSpacePhoneRegions($query:WorkspacePhoneRegionSearchModel,$paginate:Paginate,$options:QueryOption) {
    workspacePhoneRegions(query:$query,paginate:$paginate,options:$options){
      nodes{
        _id
        workspace {
          code
          name
        }
        phoneRegion {
          code
        }
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
