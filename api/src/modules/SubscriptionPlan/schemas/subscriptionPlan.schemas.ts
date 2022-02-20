import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

// eslint-disable-next-line max-len
import {CollectionName as SUBSCRIPTION_ITEMS} from '../submodules/SubscriptionItem/schemas/subscriptionItem.schemas';

export const CollectionName = 'SubscriptionPlans';
export const Schema = new MongooseSchema(
  {
    // stripe product id
    productId: {type: SchemaTypes.String, required: true},
    code: {type: SchemaTypes.String, required: true},
    name: LocalizeStringSchema,
    description: LocalizeStringSchema,
    unit: {type: SchemaTypes.String},
    pricings: [
      {
        // API ID in stripe pricing
        apiId: {type: SchemaTypes.String, required: true},
        currency: {type: SchemaTypes.String},
        amount: {type: SchemaTypes.String, required: true, min: 0},
        // monthly, daily etc
        unit: {type: SchemaTypes.String}
      }
    ],
    items: [
      {
        // subscriptionItem._id
        item: {
          type: SchemaTypes.ObjectId,
          required: true,
          ref: SUBSCRIPTION_ITEMS
        },
        value: {type: SchemaTypes.Mixed}
      }
    ],
    isActive: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
