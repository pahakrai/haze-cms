import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

import common from '@golpasal/common';

const {DeviceStatus} = common.status;

export const CollectionName = 'Devices';
export const Schema = new MongooseSchema(
  {
    _id: {type: String, required: true},
    user: {type: SchemaTypes.ObjectId, ref: 'Users'},
    workspace: {
      type: SchemaTypes.ObjectId,
      ref: 'Workspaces',
      required: true
    },
    // expo token
    pushNotificationToken: {type: String, required: true, index: true},
    // android, ios
    deviceType: {type: String, required: true, index: true},
    deviceName: {type: String, default: ''},
    locale: {type: String, default: process.env.LANGUAGE_DEFAULT},
    // last on line time
    lastOnTime: {type: Date, default: Date.now},
    online: {type: Boolean, default: false},
    location: {
      type: {type: String, default: 'Point', required: true},
      // the order of coordinates should be [longitude, latitude]
      // default value to prevent mongo
      coordinates: {type: [{type: Number}], default: [0, 0]},
      lastUpdate: {type: Date},
      // orizontal direction of travel of this device, measured in degrees starting at
      //    due north and continuing clockwise around the compass.
      // Thus, north is 0 degrees, east is 90 degrees, south is 180 degrees, and so on.
      heading: {type: SchemaTypes.Number, default: 0}
    },
    scope: {type: String, default: ''},
    deviceStatus: {
      type: Number,
      default: DeviceStatus.WHITE_LIST,
      required: true
    }
  },
  {
    collection: CollectionName,
    timestamps: true,
    _id: false,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// add index for geoNear query
Schema.index({location: '2dsphere'});
Schema.virtual('locationLogs', {
  ref: 'DeviceLocationLogs',
  localField: '_id',
  foreignField: 'device'
});
