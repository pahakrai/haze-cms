import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'DeviceLocationLogs';
export const Schema = new MongooseSchema(
  {
    device: {type: SchemaTypes.String, required: true, ref: 'Devices'},
    type: {type: SchemaTypes.String, default: 'Point', required: true},
    // the order of coordinates should be [longitude, latitude]
    coordinates: [{type: SchemaTypes.Number}]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
