import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocationSchema, LocalizeStringSchema} from 'src/core';

export const CollectionName = 'Regions';
export const Schema = new MongooseSchema(
  {
    workspace: {
      type: SchemaTypes.ObjectId,
      ref: 'Workspaces',
      required: true
    },
    code: {type: SchemaTypes.String, required: true},
    type: {type: SchemaTypes.String, default: 'region'},
    subTypes: [{type: SchemaTypes.String, required: true}],
    name: LocalizeStringSchema,
    // all parents (all regions until the top)
    ancestors: [{type: SchemaTypes.ObjectId, required: true, ref: 'Regions'}],
    // immediate parent
    parent: {type: SchemaTypes.ObjectId, ref: 'Regions'},
    isActive: {type: SchemaTypes.Boolean, required: true, default: true},
    location: LocationSchema,
    filemeta: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
    idx: {type: SchemaTypes.Number, default: 1},
    isAddress: {type: SchemaTypes.Boolean, default: true}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);

Schema.virtual('children', {
  ref: CollectionName,
  localField: '_id',
  foreignField: 'parent'
});
Schema.index({'location.geometry': '2dsphere'});
