import mongoose from 'mongoose';
const {Schema: MongooseSchema, SchemaTypes} = mongoose;

export const CollectionName = 'Iams';
export const Schema = new MongooseSchema(
  {
    // AWS, SMS, BRAINTREE
    type: {type: String, required: true},
    // ses, s3
    subType: {type: String},
    workspace: {type: SchemaTypes.ObjectId, default: null},
    description: {type: String, required: true},
    credentials: SchemaTypes.Mixed,
    params: SchemaTypes.Mixed,
    isActive: {type: Boolean, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
