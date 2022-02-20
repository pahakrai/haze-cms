import {SchemaTypes, Schema as MongooseSchema} from 'mongoose';
import common from '@golpasal/common';

const {WorkspaceType} = common.type;

export const CollectionName = 'AC_Policies';
export const Schema = new MongooseSchema(
  {
    name: {type: SchemaTypes.String, required: true},
    // workspace types
    workspaceTypes: [
      {
        type: String,
        enum: Object.values(WorkspaceType)
      }
    ],
    // workspace access, which workspace id specific to access
    workspaceAccess: [{type: SchemaTypes.ObjectId, ref: 'Workspaces'}],
    Statement: [
      {
        Effect: {type: SchemaTypes.String, required: true},
        Action: [SchemaTypes.String],
        Resource: SchemaTypes.String
      }
    ]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
