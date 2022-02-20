import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'CustomerEnquirys';
export const Schema = new MongooseSchema(
  {
    // workspace
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    // subject
    subject: {type: SchemaTypes.String},
    // phoneRegion
    phoneRegion: {type: SchemaTypes.String},
    // phone
    phone: {type: SchemaTypes.String},
    // message
    message: {type: SchemaTypes.String},
    // email
    email: {type: SchemaTypes.String},
    // isFollow status
    isFollow: {type: SchemaTypes.Boolean, default: false},
    // who follow
    whoFollow: {type: SchemaTypes.ObjectId, ref: 'Users'},
    // follow time
    followTime: {type: Date, default: null},
    // remarks
    remarks: {type: SchemaTypes.String}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
