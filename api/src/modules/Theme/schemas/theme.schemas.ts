import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
export const CollectionName = 'Themes';
export const Schema = new MongooseSchema(
  {
    name: {type: SchemaTypes.String, required: true},
    scope: {type: SchemaTypes.String},
    baseTheme: {type: SchemaTypes.String},
    color: {type: SchemaTypes.Mixed},
    dimensions: {type: SchemaTypes.Mixed},
    icons: {
      facebook: {type: SchemaTypes.String},
      youtube: {type: SchemaTypes.String},
      instagram: {type: SchemaTypes.String},
      search: {type: SchemaTypes.String}
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
