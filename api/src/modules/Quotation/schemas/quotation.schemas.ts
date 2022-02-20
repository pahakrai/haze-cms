import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
const {PriceType, OrderType} = common.type;
const {QuotationStatus} = common.status;

export const CollectionName = 'Quotations';

export const Schema = new MongooseSchema(
  {
    quotationNo: {type: SchemaTypes.String, required: true},
    client: {type: SchemaTypes.ObjectId, ref: 'Users', required: false},
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces', required: true},
    quotationDate: {type: SchemaTypes.Date, default: Date.now},
    orderType: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(OrderType)
    },
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
    contact: {
      name: {type: SchemaTypes.String, required: false, default: ''},
      phone: {type: SchemaTypes.String, required: false, default: ''}
    },
    consignee: {
      name: {type: SchemaTypes.String, required: false, default: ''},
      phone: {type: SchemaTypes.String, required: false, default: ''}
    },
    details: [
      {
        product: {type: SchemaTypes.ObjectId, ref: 'Products', required: true},
        productSKU: {
          required: true,
          ref: 'ProductSkus',
          type: SchemaTypes.ObjectId
        },
        qty: {type: SchemaTypes.Number, min: 1, required: true},
        amount: {type: SchemaTypes.Number, min: 0, required: true},
        remark: {type: SchemaTypes.String, default: ''}
      }
    ],
    services: [
      {
        service: {type: SchemaTypes.ObjectId, ref: 'Services', required: true},
        value: {type: SchemaTypes.Mixed},
        remarks: {type: SchemaTypes.String, default: ''},
        quotedPrice: {type: SchemaTypes.Number, min: 0}
      }
    ],
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
      // other charges
      others: [
        {
          // chargeType: {type: SchemaTypes.ObjectId, ref: "ChargeTypes"},
          description: {type: SchemaTypes.String, default: ''},
          amount: {type: SchemaTypes.Number, default: 0}
        }
      ]
    },
    status: {
      type: SchemaTypes.Number,
      required: true,
      default: QuotationStatus.DRAFT
    },
    remarks: {type: SchemaTypes.String, default: ''}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
