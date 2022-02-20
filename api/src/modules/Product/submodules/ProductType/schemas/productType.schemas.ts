import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';
import common from '@golpasal/common';

export const CollectionName = 'ProductTypes';
export const Schema = new MongooseSchema(
  {
    // workspace
    workspace: {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'},
    // product type name
    name: LocalizeStringSchema,
    // product type description
    description: LocalizeStringSchema,
    // product type content
    content: {type: SchemaTypes.String, default: ''},
    // product type images
    images: [{type: SchemaTypes.ObjectId, ref: 'FileMetas'}],
    // product type status
    status: {
      required: true,
      type: SchemaTypes.Number,
      default: common.status.ProductTypeStatus.DRAFT
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
