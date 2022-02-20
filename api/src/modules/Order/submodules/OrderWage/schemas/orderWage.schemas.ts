import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'OrderWages';
export const Schema = new MongooseSchema(
  {
    order: {type: SchemaTypes.ObjectId, required: true, ref: 'Orders'},
    currency: {type: SchemaTypes.String, default: 'HKD'},
    amountToApp: {type: SchemaTypes.Number, min: 0}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
