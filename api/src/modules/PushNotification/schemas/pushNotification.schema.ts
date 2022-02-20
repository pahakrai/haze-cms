import mongoose from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'PushNotifications';
export const Schema = new mongoose.Schema(
  {
    // sender
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
      ref: 'Users'
    },
    userNotification: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'UserNotifications'
    },
    to: [
      {
        user: {type: mongoose.SchemaTypes.ObjectId, ref: 'Users'},
        status: {type: String, default: 'pending'},
        ticket: {type: String},
        deviceId: {type: String, ref: 'Devices'}
      }
    ], // receiver
    // message body
    message: {
      data: Object,
      title: LocalizeStringSchema,
      body: {type: LocalizeStringSchema, required: false}
    },
    action: {type: {type: String}, data: Object},
    status: Object // notification status
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
