interface IOrder {
  _id: string;
  orderNo?: string;
  orderType?: string;
  client?: IUser;
  clientDevice?: string;
  workspace?: IWorkspace;
  date?: string;
  billingContact?: IAddress;
  contactAddress?: IAddress;
  status?: number;
  services?: IOrderService[];
  charge?: IOrderCharge;
  remarks?: string;
  product?: IOrderProduct;
  logistic?: IOrderLogistic;
  productStakeholder?: IOrderProductStakeholder;
  time?: IOrderTime;
  wage?: IOrderWage;
  quotation?: IQuotation;
  payment?: {
    status: number;
    transactions?: [IPaymentTransaction];
    receiptNo: string;
  };
  pickupStore?: IStore;
  createdAt?: string;
  updatedAt?: string;
}
interface IOrderProduct {
  _id: string;
  order?: IOrder;
  items?: IOrderProductItem[];
  createdAt?: string;
  updatedAt?: string;
}
interface IOrderProductItem {
  product?: IProduct;
  productSKU?: IProductSku;
  qty?: number;
  currency?: string;
  amount?: number;
}
interface IOrderContact {
  name?: string;
  phone?: string;
  address?: ILocation;
}
interface ILocation {
  type?: string;
  properties?: ILocationProperty;
  geometry?: ILocationGeometry;
}
interface ILocationProperty {
  name?;
}
interface ILocationGeometry {}
interface IOrderCharge {
  base?: number;
  totalAmount?: number;
  currency?: string;
  services?: IOrderChargeService[];
  coupons?: IOrderChargeCoupon[];
  others?: IOrderChargeOther[];
}

interface IOrderChargeCoupon {
  code: string;
  amount: float;
}

interface IOrderChargeService {
  _id: string;
  service?: IService;
  amount?: number;
  isQuotation?: boolean;
}
interface IOrderChargeOther {
  _id: string;
  description?: string;
  amount?: number;
}
interface IService {
  _id: string;
  name?: string;
}

interface IQuotation {
  _id;
}

interface IPaymentTransaction {
  id: string;
  status: number;
  amount?: number;
  receiptNo: string;
  paymentMethod?: {
    _id: string;
    name?: string;
  };
}

interface IOrderService {
  _id: string;
  service?: IService;
  value?: number;
}
