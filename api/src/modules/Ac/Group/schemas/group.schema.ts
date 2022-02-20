import {SchemaTypes, Schema as MongooseSchema} from 'mongoose';

export const CollectionName = 'AC_Groups';
export const Schema = new MongooseSchema(
  {
    name: {type: String, required: true},
    users: [{type: SchemaTypes.ObjectId, ref: 'Users'}],
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    policies: [{type: SchemaTypes.ObjectId, ref: 'AC_Policies'}]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
