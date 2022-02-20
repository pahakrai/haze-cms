import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
import {LocalizeStringSchema} from 'src/core';

const {PlatformType} = common.type;

export const CollectionName = 'Posts';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspace'},
    // you may define by yourself
    type: {type: String, default: 'na', required: true},
    queries: [
      {
        filters: SchemaTypes.Mixed, // query string when search queryType
        queryType: {type: String, required: true}, // queryType: Post,
        title: LocalizeStringSchema // queryType: Post,
      }
    ],
    title: LocalizeStringSchema,
    postDate: {type: Date, default: Date.now, required: true},
    snippets: LocalizeStringSchema,
    likes: [{type: SchemaTypes.ObjectId, required: true, ref: 'Users'}],
    images: [
      {
        fileMeta: {type: SchemaTypes.ObjectId, ref: 'FileMetas'}
      }
    ],
    content: LocalizeStringSchema,
    priority: {type: Number, default: 1},
    isActive: {type: Boolean, default: true},
    platformTypes: [
      {type: SchemaTypes.String, enum: Object.values(PlatformType)}
    ],
    createdBy: {type: SchemaTypes.ObjectId, required: true},
    updatedBy: {type: SchemaTypes.ObjectId, required: true}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
