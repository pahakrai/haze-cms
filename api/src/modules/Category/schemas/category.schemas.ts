import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'Categories';
export const Schema = new MongooseSchema(
  {
    // workspace
    workspace: {
      type: SchemaTypes.ObjectId,
      ref: 'Workspaces',
      required: true
    },
    // unique code of category
    code: {type: SchemaTypes.String, required: true},
    // name
    name: LocalizeStringSchema,
    // icon for display
    icon: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
    // all parents of this category
    ancestors: [{type: SchemaTypes.ObjectId, ref: 'Categories'}],
    // parent of this category
    parent: {type: SchemaTypes.ObjectId, ref: 'Categories'},
    // is category active
    isActive: {type: SchemaTypes.Boolean, default: true},
    // for sorting by specifics
    idx: {type: SchemaTypes.Number, default: 0, required: false}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
