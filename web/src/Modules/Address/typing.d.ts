interface IAddress {
  _id?: string;
  name?: string;
  country?: IRegion;
  state?: IRegion;
  city?: IRegion;
  address1?: string;
  address2?: string;
  phone?: string;
  postCode?: string;
  geometry?: ILocationGeometry;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __typename?: string;
}
interface IAddressContact {
  phone?: {
    number?: string;
    regionCode?: string;
  };
  email?: string;
  fax?: string;
  department?: string;
}

interface ILocationGeometry {
  type?: string;
  coordinates?: number[];
}

interface IAddressForm {
  name?: string;
  country?: string;
  state?: string;
  city?: string;
  blockName?: string;
  streetName?: string;
  cityName?: string;
  default?: boolean;
}

interface IAddressFormField {
  _id?: string;
  name?: string;
  country?: string;
  state?: string;
  city?: string;
  address1?: string;
  address2?: string;
  phone?: string;
  postCode?: string;
}
