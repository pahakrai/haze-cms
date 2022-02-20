import { gql } from "@apollo/client";

export const QUERY_MY_SHOPPING_CART = (fields = ``) => gql`
  query myShoppingCart{
    myShoppingCart{
        _id
        ${fields}
    }
  }
`;
export const PRODUCT_MY_SHOPPING_CART_FIELDS = `
    _id
    items {
      _id
      product {
        _id
        name
        description
        images {
          _id
          uri
          thumbnailUri
        }
        specs {
          _id
          name
          values {
            _id
            name
          }
        }
      }
      productSku {
        _id
        currency
        amount
        discountAmount
        specs {
          spec {
            _id
          }
          value
        }
      }
      qty
    }
    createdAt
    updatedAt
`;

// add cart item
export const MUTATION_ADD_TO_SHOPPING_CART = (fields = ``) => gql`
  mutation addToShoppingCart($item: ShoppingCartItemInput!){
    addToShoppingCart(item:$item){
        _id
        ${fields}
    }
  }
`;

// update cart item
export const MUTATION_UPDATE_CART_ITEM = (fields = ``) => gql`
  mutation updateCartItem($itemsUpdateModel: [ShoppingCartItemsUpdateModelInput!]){
    updateCartItem(itemsUpdateModel:$itemsUpdateModel){
        _id
        ${fields}
    }
  }
`;
// clear item
export const MUTATION_REMOVE_ITEM_FROM_CART = (fields = ``) => gql`
  mutation removeItemFromCart($itemId:String!){
    removeItemFromCart(itemId:$itemId){
        _id
        ${fields}
    }
  }
`;
// clear items
export const MUTATION_REMOVE_ITEMS_FROM_CART = (fields = ``) => gql`
  mutation removeItemsFromCart($itemIds: [String!]){
    removeItemsFromCart(itemIds:$itemIds){
        _id
        ${fields}
    }
  }
`;