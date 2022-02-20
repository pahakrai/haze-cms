import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

import common from '@golpasal/common';

const {AddressType} = common.type;

// NOTE: geoNear reference query on aggregate
// {
//   $geoNear: {
//     near: {type: 'Point', coordinates},
//     distanceField: 'distance',
//     spherical: true,
//     maxDistance: radius ? radius * 1000 : null,
//     distanceMultiplier: 0.001,
//     query
//   }
// }

const LocationObject = new MongooseSchema({
  type: {
    type: SchemaTypes.String,
    required: false,
    // NOTE: in our case its mostly would be Point
    // if regions can has its own Polygon coordinates
    // but keeping the options open
    enum: ['Point', 'LineString', 'Polygon'],
    default: 'Point'
  },
  coordinates: {type: [SchemaTypes.Number], default: [0, 0]}
});

export const CollectionName = 'Addresses';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, ref: 'Workspaces'},
    // NOTE: to support address search without lookup pipeline from other collections
    // helps speed up the process
    refType: {
      type: SchemaTypes.String,
      enum: ['Users', 'Members', 'Merchants', 'Orders', 'Stores', 'Quotation']
    },
    ref: {
      type: SchemaTypes.ObjectId,
      refPath: 'refType'
    },
    type: {
      type: SchemaTypes.String,
      enum: Object.values(AddressType),
      default: AddressType.CONTACT
    },
    name: {
      type: SchemaTypes.String,
      required: true
    },
    country: {
      type: SchemaTypes.ObjectId,
      ref: 'Regions',
      required: true
    },
    state: {type: SchemaTypes.ObjectId, ref: 'Regions', required: true},
    city: {type: SchemaTypes.ObjectId, ref: 'Regions', required: true},
    // NOTE: name can be combined string of blockName, streetName, cityName or name itself
    address1: {type: SchemaTypes.String, required: true},
    address2: {type: SchemaTypes.String},
    // NOTE: FOR REFERENCE REQUIREMENTS
    postCode: {type: SchemaTypes.String, required: false, default: '00000'},
    phone: {type: SchemaTypes.String, required: false},
    // for geospatial queries, making easier from a single collection
    geometry: {type: LocationObject, id: false},
    isDefault: {type: SchemaTypes.Boolean, required: true, default: false}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);

Schema.index({geometry: '2dsphere'});
