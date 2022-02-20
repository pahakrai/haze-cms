import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

const {PriceType, OrderType} = common.type;

export const CollectionName = 'Orders';
export const Schema = new MongooseSchema(
  {
    orderNo: {type: SchemaTypes.String, required: true},
    quotation: {
      type: SchemaTypes.ObjectId,
      ref: 'Quotations',
      required: false,
      default: null
    },
    orderType: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(OrderType)
    },
    client: {type: SchemaTypes.ObjectId, ref: 'Users', required: false},
    clientDevice: {type: SchemaTypes.String, default: ''},
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces', required: true},
    date: {type: SchemaTypes.Date, default: Date.now},
    pickupStore: {type: SchemaTypes.ObjectId, required: false, ref: 'Stores'},
    billingContact: {
      type: SchemaTypes.ObjectId,
      ref: 'Addresses',
      required: false
    },
    contactAddress: {
      type: SchemaTypes.ObjectId,
      ref: 'Addresses',
      required: false
    },
    // client contact
    contact: {
      name: {type: SchemaTypes.String, required: false, default: ''},
      phone: {type: SchemaTypes.String, required: false, default: ''}
    },
    // receiver contact
    consignee: {
      name: {type: SchemaTypes.String, required: false, default: ''},
      phone: {type: SchemaTypes.String, required: false, default: ''}
    },
    status: {
      type: SchemaTypes.Number,
      required: true
    },
    // order status complete time
    completeTime: {type: SchemaTypes.Date, default: null},
    services: [
      {
        service: {type: SchemaTypes.ObjectId, ref: 'Services', required: true},
        value: {type: SchemaTypes.Mixed},
        remarks: {type: SchemaTypes.String, default: ''},
        quotedPrice: {type: SchemaTypes.Number, min: 0}
      }
    ],
    // charges of the order
    charge: {
      // charges includes quotation
      hasQuote: {type: SchemaTypes.Boolean, default: false},
      // currency
      currency: {type: SchemaTypes.String},
      // total amount
      totalAmount: {type: SchemaTypes.Number, required: true, default: 0},
      // base price (i.e. sum of products)
      base: {type: SchemaTypes.Number, default: 0},
      // tips
      tips: {type: SchemaTypes.Number, default: 0},
      // charge type of base price
      basePriceType: {
        type: SchemaTypes.String,
        default: PriceType.FIXED,
        enum: Object.values(PriceType)
      },
      // charge of services
      services: [
        {
          service: {type: SchemaTypes.ObjectId, ref: 'Services'},
          isQuotation: {type: SchemaTypes.Boolean, default: false},
          amount: {type: SchemaTypes.Number, required: true, default: 0}
        }
      ],
      // coupons
      coupons: [
        {
          code: {type: SchemaTypes.String, required: true},
          amount: {type: SchemaTypes.Number, required: true, default: 0}
        }
      ],
      // other charges
      others: [
        {
          // chargeType: {type: SchemaTypes.ObjectId, ref: "ChargeTypes"},
          description: {type: SchemaTypes.String, default: ''},
          amount: {type: SchemaTypes.Number, default: 0}
        }
      ]
    },
    remarks: {type: SchemaTypes.String, default: ''},
    // credit required for accept order (logistic order only)
    creditRequired: {type: SchemaTypes.Number, default: 0},
    signature: {type: SchemaTypes.ObjectId, required: false, ref: 'FileMetas'}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

// virtual populate OrderProducts
Schema.virtual('product', {
  justOne: true,
  localField: '_id',
  ref: 'OrderProducts',
  foreignField: 'order'
});
// virtual populate OrderTimes
Schema.virtual('time', {
  justOne: true,
  ref: 'OrderTimes',
  localField: '_id',
  foreignField: 'order'
});
// virtual populate OrderWages
Schema.virtual('wage', {
  justOne: true,
  ref: 'OrderWages',
  localField: '_id',
  foreignField: 'order'
});
Schema.virtual('payment', {
  justOne: true,
  ref: 'Payments',
  localField: '_id',
  foreignField: 'order'
});
