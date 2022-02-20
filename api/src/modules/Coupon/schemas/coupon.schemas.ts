import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

const {OrderCreditAmountType, LogicGateType, OrderCreditType} = common.type;

export const CollectionName = 'Coupons';
export const Schema = new MongooseSchema(
  {
    // workspace this coupon belongs to
    workspace: {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'},
    // code of coupon
    code: {type: String, required: true},
    // start date of coupon
    startAt: {type: Date},
    // end date of coupon
    expireAt: {type: Date},
    // title of coupon
    title: {type: String, default: ''},
    // description of coupon
    description: {type: String, default: ''},
    // images of this coupon
    images: [{type: SchemaTypes.ObjectId, ref: 'FileMetas'}],
    // no of coupon
    noOfCoupon: {type: Number, required: true, default: 1},
    // redeem limit per user, if 0 then = no limit
    redeemLimitPerUser: {type: Number, required: true, default: 0},
    // currency of the coupon
    currency: {type: String, required: true},
    // criteria, match $And, if any
    criteria: {
      // payment method used
      paymentMethods: [
        {type: String, required: false}
        //{ required: Boolean(this.paymentMethodsLogicGate)}
      ],
      // payment method logic gate
      paymentMethodsLogicGate: {
        type: String,
        enum: Object.values(LogicGateType),
        default: LogicGateType.ANY,
        required: true
      },
      // products selected, if any
      products: [{type: SchemaTypes.ObjectId, ref: 'Products'}],
      // products logic gate
      productsLogicGate: {
        type: String,
        enum: Object.values(LogicGateType),
        default: LogicGateType.ANY,
        required: true
      },
      // amount match and more than
      amount: {type: Number, required: true, default: 0}
    },
    effect: {
      // fixed or percent
      type: {
        type: SchemaTypes.String,
        enum: Object.values(OrderCreditAmountType),
        required: true
      },
      creditType: {
        type: SchemaTypes.String,
        enum: Object.values(OrderCreditType),
        default: OrderCreditType.WHOLE_ORDER
      },
      // when fixed, it means coupon discount amount e.g. 100, 150
      // when percent, it means 0.01 - 1, (1 = 100%)
      amount: {type: Number, required: true, default: 0}
    },
    // is coupon active
    isActive: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);

Schema.virtual('currencys', {
  ref: 'Currencies',
  localField: 'currency',
  foreignField: 'code'
});

Schema.virtual('logs', {
  ref: 'CouponLogs',
  localField: '_id',
  foreignField: 'coupon'
});
