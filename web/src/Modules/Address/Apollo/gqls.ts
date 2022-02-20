import { gql } from "@apollo/client";

export const MY_ADDRESSS = (fields = ADDRESS_FIELDS) => gql`
  query MyAddresses {
    myAddresses {
      _id
      ${fields}
    }
  }
`;
export const MY_DEFAULT_ADDRESSS = (fields = ADDRESS_FIELDS) => gql`
  query MyDefaultAddresses {
    myDefaultAddress {
      _id
      ${fields}
    }
  }
`;
export const DELETE_MY_ADDRESS = (fields = ADDRESS_FIELDS) => gql`
    mutation DeleteMyAddress($id: ID!) {
        deleteMyAddress(addressId: $id) {
          _id
        ${fields}
      }
    }
  `;
export const ADD_MY_ADDRESS = (fields = ADDRESS_FIELDS) => gql`
  mutation AddMyAddress(
    $addressCreateModel: AddressCreateModel!
    ) {
      addMyAddress(addressCreateModel:$addressCreateModel) {
      ${fields}
    }
  }
`;
export const UPDATE_MY_ADDRESS = (fields = ADDRESS_FIELDS) => gql`
  mutation UpdateMyAddress(
    $id: ID!
    $addressUpdateModel: AddressUpdateModel!
    ) {
      updateMyAddress(addressId: $id,addressUpdateModel: $addressUpdateModel) {
        _id
      ${fields}
    }
  }
`;
export const SET_MY_DEFAULT_ADDRESS = (fields = ADDRESS_FIELDS) => gql`
  mutation SetMyDefaultAddress($id: ID!) {
      setMyDefaultAddress(addressId: $id) {
        _id
      ${fields}
    }
  }
`;
export const ADDRESS = (fields = ADDRESS_FIELDS) => gql`
  query Address($id: ID!) {
    address(id:$id) {
          _id
          ${fields}
      }
  }
`;

export const ADDRESS_FIELDS = `
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
    phone
    postCode
    isDefault
    createdAt
    updatedAt
`;
