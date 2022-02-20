import { gql } from "@apollo/client";

export const QUERY_STORES_PLACE_ORDER = (fields = ``) => gql`
  query StoresPlaceOrder($query:StoreSearchModel,$paginate:Paginate,$options:QueryOption) {
    storesPlaceOrder(query:$query,paginate:$paginate,options:$options) {
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

export const QUERY_STORES_PLACE_ORDER_FIELDS = `
  _id
  address {
    _id
    name
    country{
      _id
    }
    state{
      _id
    }
    city{
      _id
    }
    address1
    address2
    postCode
    phone
  }
  deprecatedDate
`;
