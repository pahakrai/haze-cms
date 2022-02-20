import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = (fields = PRODUCT_ITEM_FIELDS) => gql`
  query Products($query:ProductSearchModel,$paginate:Paginate,$options:QueryOption){
    products(query:$query,paginate:$paginate,options:$options){
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
export const QUERY_PRODUCT = (fields = PRODUCT_ITEM_FIELDS) => gql`
  query Product($id:ID!){
    product(id:$id,){
        _id
        ${fields}
    }
  }
`;
export const MUTATION_TOGGLE_PRODUCT_WATCH = (
  fields = PRODUCT_ITEM_FIELDS
) => gql`
  mutation ToggleProductWatch(
    $productId: ID!
  ) {
    toggleProductWatch(productId: $productId) {
      _id
      ${fields}
    }
  }
`;
export const QUERY_MY_PRODUCT_WAITCH_EXIST = gql`
  query MyProductWatchExist($productId: ID!) {
    myProductWatchExist(productId: $productId)
  }
`;

export const PRODCUT_SPEC_FIELDS = `
  _id
`;
export const PRODUCT_ITEM_FIELDS = `
      _id
      name
      description
      category {
        _id
        name
      }
      images {
        _id
        uri
        thumbnailUri
      }
      tags {
        tagImage {
          _id
          image{
            _id
            uri
          }
        },
        text
      }
      skus {
        _id
        currency
        discountAmount
        amount
        qty
        validateInventory
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
      productionDate
      productExpiryDate
      isWatched
      workspace
      createdAt
      updatedAt
`;

export const PRODUCT_DETAIL_FIELDS = `
   _id
    name
    description
    content
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
    tags {
      tagImage {
        _id
        image{
          _id
          uri
        }
      }
    }
    priceRange {
      min
      max
    }
    skus {
      _id
      qty
      validateInventory
      currency
      amount
      discountAmount
      specs {
        spec {
          ${PRODCUT_SPEC_FIELDS}
        }
        value
      }
    }
    specs {
      _id
      name
      values {
        _id
        name
      }
      icon
      activeIcon
    }
    remarks
    priceRange {
      min
      max
    }
    mediaList1 {
      image {
        _id
        uri
        thumbnailUri
        mimetype
      }
      description
    }
    mediaList2 {
      image {
        _id
        uri
        mimetype
        thumbnailUri
      }
      description
    }
    workspace
    createdAt
    updatedAt
`;

export const PRODUCT_WATCH_ITEM_FIELDS = `
    product {
        _id
        name
        description
        remarks
        category {
          _id
          name
        }
        images {
          _id
          uri
          thumbnailUri
        }
        skus {
          _id
          qty
          currency
          validateInventory
          amount
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
        isWatched
        workspace
        createdAt
        updatedAt
      }
    createdAt
    updatedAt
`;

export const QUERY_PRODUCTS_BY_TAG = (fields = PRODUCT_ITEM_FIELDS) => gql`
  query ProductsByTag($query:ProductSearchModel,$paginate:Paginate){
    productsByTag(query:$query,paginate:$paginate){
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
