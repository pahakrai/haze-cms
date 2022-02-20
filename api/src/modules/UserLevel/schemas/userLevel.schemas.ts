import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';
import common from '@golpasal/common';
const {UserType} = common.type;

export const CollectionName = 'UserLevels';
export const Schema = new MongooseSchema(
  {
    name: LocalizeStringSchema,
    // workspace
    workspace: {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'},
    // userType
    userType: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(UserType)
    },
    // isActive
    isActive: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
