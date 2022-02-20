import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'PricingServices';
export const Schema = new MongooseSchema(
  {
    pricing: {type: SchemaTypes.ObjectId, ref: 'Pricings', required: true},
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces', required: true},
    service: {type: SchemaTypes.ObjectId, ref: 'Services', required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
