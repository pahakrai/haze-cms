import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';
import common from '@golpasal/common';

const {TagRecommendationType} = common.type;

export const CollectionName = 'TagRecommendations';
export const Schema = new MongooseSchema(
  {
    text: {type: SchemaTypes.String, required: true},
    type: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(TagRecommendationType)
    },
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces', required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
