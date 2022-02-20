import { gql } from "@apollo/client";

// QUERY
export const QUERY_WORKSPACE = (fields = ``) => gql`
  query Workspace($id:ID!){
    workspace(id:$id){
      _id
      ${fields}
    }
  }
`;
// FIELDS
export const WORKSPACE_FIELDS = `
  code
  logo {
    _id
    uri
    thumbnailUri
  }
  status
  name
  type
  webHost
  alwaysHttpsWebHost
  setting {
    logo {
      _id
      uri
      thumbnailUri
    }
    favicon {
      _id
      uri
      thumbnailUri
    }
    headerLogo {
      _id
      uri
      thumbnailUri
    }
    loginBackgroundImage {
      _id
      uri
      thumbnailUri
    }
    theme{
      _id
      icons{
        facebook
        youtube
        instagram
      }
    }
  }
  contacts {
    name
    department
    phoneNo
    ext
    email
    address
    coordinates
    serviceHour{
      worktime{
        from
        to
      }
      workdays
      timeTableDescription
    }
  }
  marketing {
    facebookPixel
    googleTagManager
  }
  socialLinks
  serviceApps {
    facebook {
      appId
    }
    google {
      web{
        appId
      }
    }
  }
  preferences {
    product{
      isEnableCart
      hasDeliveryAndPaymentInfo
    }
  }
  createdAt
  updatedAt
`;

export const QUERY_WORKSPACE_PAYMENT_METHODS = (fields = ``) => gql`
  query WorkspacePaymentMethods(
    $query: WorkspacePaymentMethodSearchModel,
    $paginate: Paginate,
    $options: QueryOption
){
    workspacePaymentMethods(query:$query,paginate:$paginate,options:$options){
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

export const WORKSPACE_PAYMENT_METHOD_FIELD = `
  _id
  workspace {
    _id
  }
  paymentMethod {
    _id
    code
    name
    isActive
  }
  defaultCurrency
  chargeValue
  chargeSymbol
  credential {
    publicKey
  }
`;
