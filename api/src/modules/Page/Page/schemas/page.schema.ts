import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'Pages';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    layout: {type: SchemaTypes.ObjectId, ref: 'Pages'},
    title: LocalizeStringSchema,
    // current version (publish action)
    version: {type: Number, required: true},
    // current page data (publish action) v6 => v3(edit) =>
    // (new v4 or [v7 = diff(v6 and v3(edit))] ?)(remove v4,v5,v6)
    content: {type: SchemaTypes.Mixed, required: true},
    // diff (save action) (jump action (merge diff))
    // find newest version content => create next node
    diffNodes: [
      {
        date: {type: String},
        version: {type: Number, required: true},
        up: {type: SchemaTypes.Mixed},
        down: {type: SchemaTypes.Mixed}
      }
    ],
    // layout or content
    type: {type: String, required: true},
    // real path,
    path: {
      type: String,
      trim: true,
      required: false
    },
    meta: {
      description: {type: String},
      version: {type: String},
      'og:url': {type: String},
      'og:image': {type: String}
    },
    remarks: {type: String},
    preview: {
      type: SchemaTypes.ObjectId,
      ref: 'FileMetas',
      required: false
    },
    isTemplate: {type: Boolean, default: false},
    isSection: {type: Boolean, default: false},
    isSystem: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    isSeo: {type: Boolean, default: false}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);

// PageSchema.index('path', {
//   unique: true,
//   partialFilterExpression: {
//     path: {
//       $type: 'string'
//     }
//   }
// });
