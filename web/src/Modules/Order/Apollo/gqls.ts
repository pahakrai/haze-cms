import { gql } from "@apollo/client";

export const QUERY_MY_ORDERS = (fields = ``) => gql`
  query MyOrders($query:OrderSearchModel,$paginate:Paginate,$options:QueryOption){
    myOrders(query:$query,paginate:$paginate,options:$options){
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
export const QUERY_MY_ORDER = (fields = ``) => gql`
  query MyOrder($orderId:ID!){
    myOrder(orderId:$orderId){
      _id
      ${fields}
    }
  }
`;
export const ORDER_DETAIL_FIELD = `
    _id
    orderNo
    orderType
    client{
      _id
      firstName
      lastName
    }
    workspace {
      _id
    }
    quotation {
      _id
    }
    date
    contactAddress {
      name
      phone
      country{
        _id
        name
      }
      city{
        _id
        name
      }
      state{
        _id
        name
      }
      address1
      address2
      postCode
    }
    billingContact {
      name
      phone
      country{
        _id
        name
      }
      city{
        _id
        name
      }
      state{
        _id
        name
      }
      address1
      address2
    }
    services{
      service{
        _id
        name
      }
      value
    }
    charge{
      base
      totalAmount
      currency
      services{
        _id
        service{
          _id
          name
        }
        amount
      }
      coupons{
        code
        amount
      }
      others{
        _id
        description
        amount
      }
    }
    status
    remarks
    pickupStore{
      _id
      address{
        _id
        name
        country {
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
      }
    }
    product {
      _id
      items {
        product {
          _id
          name
          images{
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
        productSKU{
          _id
          specs{
            spec {
              _id
              name
              values{
                _id
                name
              }
            }
            value
          }
          currency
          discountAmount
          amount
          image{
            _id
            uri
          }
        }
        qty
        amount
        currency
      }
    }
    payment  {
      _id
      status
      transactions{
        id
        amount
        status
        receiptNo
        date
        paymentMethod{
          _id
          name
        }
      }
    }
`;
