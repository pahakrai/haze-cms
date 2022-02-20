import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

const {PriceType} = common.type;

export const CollectionName = 'WorkspacePriceTypes';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    priceType: {
      type: SchemaTypes.String,
      default: PriceType.FIXED,
      enum: Object.values(PriceType)
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
