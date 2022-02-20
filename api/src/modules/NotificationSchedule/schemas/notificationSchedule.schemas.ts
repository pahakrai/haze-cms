import {SchemaTypes, Schema as MongooseSchema} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';
import common from '@golpasal/common';

const {NotificationMediaType} = common.type;

export const CollectionName = 'NotificationSchedules';
export const Schema = new MongooseSchema(
  {
    notification: {
      title: LocalizeStringSchema,
      body: LocalizeStringSchema,
      data: {
        // if media type is Mobile, then it is screen link,
        // if email, it is link of html, if it is sms, then it is web link
        screen: {type: String},
        parameters: SchemaTypes.Mixed
      },
      images: [{type: SchemaTypes.ObjectId, ref: 'FileMetas'}],
      // what media use to send notification
      notificationMediaType: {
        type: String,
        required: true,
        enum: Object.values(NotificationMediaType),
        default: NotificationMediaType.MOBILE
      }
    },
    startTime: {type: Date, default: Date.now},
    reoccurance: {
      everyType: {type: String, default: 'never'},
      everyN: {type: Number, default: 1},
      weeklyDays: [{type: Number}],
      monthlyDate: {type: Number},
      yearlyDate: {type: Date},
      duration: {
        type: {type: String, default: 'forever'},
        repetition: {type: Number},
        endTime: {type: Date, required: false}
      }
    },
    to: {
      // scope which the devices can be in
      scopes: [{type: String}],
      // query string of search api to find user group
      filters: {type: SchemaTypes.Mixed, default: {}},
      // custom handling for custom fetch functions
      groups: [{type: String, required: true}],
      // a list of user ids to fetch
      users: [{type: SchemaTypes.ObjectId, required: true, ref: 'Users'}]
    }, // receiver
    jobId: {type: String}, // jobid of queue system
    status: {type: Number, default: 0}
  },
  {
    collection: CollectionName,
    timestamps: true,
    minimize: false // store empty objects.
  }
);
