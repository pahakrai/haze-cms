import {SchemaTypes} from 'mongoose';

export const LocationSchema = {
  type: {type: SchemaTypes.String, default: 'Feature'},
  properties: {
    name: {type: SchemaTypes.String, default: ''},
    // selected/nearest district
    district: {type: SchemaTypes.ObjectId, ref: 'Regions'},
    // region tree
    regions: [{type: SchemaTypes.ObjectId, ref: 'Regions'}],
    // elevation
    elevation_m: {type: SchemaTypes.Number},
    // result from Google Geocoder
    mapResult: {type: SchemaTypes.Mixed, required: false}
  },
  geometry: {
    type: {type: SchemaTypes.String, default: 'Point'},
    // the order of coordinates should be [longitude, latitude]
    coordinates: {
      type: [SchemaTypes.Number],
      default: [0, 0]
    }
  }
};
