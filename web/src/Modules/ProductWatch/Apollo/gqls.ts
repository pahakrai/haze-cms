import { gql } from '@apollo/client';

export const QUERY_PRODUCTwATCHES = (fields = PRODUCT_WATCH_FIELDS
) => gql`
 query productWatches($query: ProductWatchSearchModel, $paginate:Paginate,$options:QueryOption){
  productWatches(query: $query,paginate: $paginate,options: $options){
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

export const QUERY_MY_PRODUCT_WATCHES = (fields = PRODUCT_WATCH_FIELDS) => gql`
  query myProductWatches($paginate: Paginate){
    myProductWatches(paginate: $paginate){
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
}`


export const REMOVE_PRODUCT_WATCHES = () => gql`
  mutation removeProductWatches($productIds: [ID!]!) {
    removeProductWatches(productIds:$productIds)
}`;

export const PRODCUT_SPEC_FIELDS = `
  _id
`;

export const PRODUCT_WATCH_FIELDS = `
_id
  client{
    _id
    username
    firstName
    lastName
    gender
  }
  product {
    _id
    name
    description
    category {
      _id
      name
    }
    content
      images {
        _id
        uri
        thumbnailUri
      }
      skus {
        _id
        currency
        discountAmount
        amount
        qty
        specs {
          spec {
            ${PRODCUT_SPEC_FIELDS}
          }
          value
        }
      }
      specs {
        _id
        values {
          _id
        }
      }
      priceRange {
        min
        max
      }
    workspace
    createdAt
    updatedAt
  }
  createdAt
  updatedAt
`