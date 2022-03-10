import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';
import Common from '@golpasal/common';

const {CategoryType} = Common.type;

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
    idx: {type: SchemaTypes.Number, default: 0, required: false},
    // which type category belongs to
    type: {
      type: SchemaTypes.String,
      // required: true,
      enum: Object.values(CategoryType)
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
