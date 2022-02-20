import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
// import {PaginatePlugin} from 'src/core/database';
import {LocalizeStringSchema} from 'src/core';
export const CollectionName = 'Languages';

export const Schema = new MongooseSchema(
  {
    workspace: {
      type: SchemaTypes.ObjectId,
      ref: 'Workspaces',
      required: true
    },
    name: LocalizeStringSchema,
    types: [
      {
        required: false,
        type: SchemaTypes.String,
        enum: Object.values(common.type.LanguageType)
      }
    ],
    isActive: {type: Boolean, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
