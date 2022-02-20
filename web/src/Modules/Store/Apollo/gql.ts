import { gql } from "@apollo/client";

export const QUERY_STORES = (fields = STORE_ITEM_FIELDS) => gql`
  query STORES($query:StoreSearchModel,$paginate:Paginate){
    stores(query:$query,paginate:$paginate){
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

export const QUERY_STORE = (fields = STORE_ITEM_FIELDS) => gql`
  query STORE($id:ID!){
    store(id:$id,){
        _id
        ${fields}
    }
  }
`;

export const STORE_ITEM_FIELDS = `
    _id
    workSchedule {
      worktime{
        from
        to
      }
      workdays
    }
    address {
      _id
      name
      country{
        _id
        name
      }
      state{
        _id
        name
      }
      city{
        _id
        name
      }
      address1
      address2
      postCode
      phone
      geometry{
        type
        coordinates
      }
    }
    deprecatedDate
    `;
