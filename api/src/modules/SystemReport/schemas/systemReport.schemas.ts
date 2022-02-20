import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';
import common from '@golpasal/common';

const {WorkspaceType} = common.type;

export const CollectionName = 'SystemReports';
export const Schema = new MongooseSchema(
  {
    // workspace
    workspaces: [
      {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'}
    ],
    workspaceTypes: [{type: String, enum: Object.values(WorkspaceType)}],
    name: LocalizeStringSchema,
    reportName: {type: String, required: true},
    parameters: [
      {
        code: {type: String, required: true},
        name: LocalizeStringSchema,
        dataType: {type: String, required: true},
        isDbNull: {type: Boolean, required: true},
        isNull: {type: Boolean, required: true},
        size: {type: Number, required: true},
        value: {type: String, required: true}
      }
    ],
    commandText: {type: String, required: true},
    format: {type: String, default: 0, required: true},
    isActive: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
