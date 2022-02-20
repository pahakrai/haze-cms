interface ICheckout {
  _id: string;
  status?: number;
  expireAt?: string;
  order?: IOrder;
  payment?: IPayment;
  createdAt?: string;
  updatedAt?: string;
}
interface ICheckoutOrderModel {
  order?: IOrderCreateModel;
  orderId?: string;
  payment?: IPaymentCreateModel;
}
interface IPaymentCreateModel {
  paymentMethod: string;
  sourceId: string;
}
interface IOrderCreateModel {
  orderType: string;
  date: string;
  remarks?: string;
  pickupStore?: string;
  contactAddress?: IAddressCreateModel;
  billingContact?: IAddressCreateModel;
  product: IOrderProductInput;
  remarks?: string;
  coupon?: string;
}

interface IItemInput {
  product: string;
  productSKU: string;
  qty: number;
  currency: string;
  amount: number;
}
interface IOrderProductInput {
  items: IItemInput[];
}
interface IAddressCreateModel {
  name?: string;
  country?: string;
  state?: string;
  city?: string;
  address1?: string;
  address2?: string;
  postCode?: string;
  phone?: string;
}

// for address display
interface IAddressProperties {
  key: string;
  value: any;
}
