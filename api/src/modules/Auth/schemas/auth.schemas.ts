import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

import {TIME_ONE_WEEK} from '../constants';

export const CollectionName = 'Auths';
export const Schema = new MongooseSchema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      unique: true,
      ref: 'Users'
    },
    // user's password
    password: {type: String},
    passcode: {
      code: {type: String},
      scope: {type: String, default: ''},
      expiresAt: {type: Date},
      expiresIn: {type: Number}
    },
    // refresh token (optionally based on device)
    refreshTokens: [
      {
        device: {type: String, ref: 'Devices'},
        token: {type: String, required: true},
        // default to one week from now
        expiresAt: {
          type: Date,
          default: () => new Date(new Date().valueOf() + TIME_ONE_WEEK)
        },
        // time in ms until expire. default to one week from now
        expiresIn: {type: Number, default: TIME_ONE_WEEK}
      }
    ],
    // login method used, determined when signup
    // e.g. facebook, google, default
    loginChannels: [
      {
        type: {type: String, required: true},
        id: {type: String, default: ''}
      }
    ]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
