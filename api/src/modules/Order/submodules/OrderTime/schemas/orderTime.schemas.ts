import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
// import {PaginatePlugin} from 'src/core/database';

export const CollectionName = 'OrderTimes';
export const Schema = new MongooseSchema(
  {
    order: {type: SchemaTypes.ObjectId, ref: 'Orders', required: true},
    // default expire after 5 minutes
    pendingRequestExpireAt: {type: Date, default: () => Date.now() + 60000 * 5},
    // time in ms that the order will be expired
    pendingRequestExpireIn: {type: Number, default: 60000 * 5},
    scheduleTime: {type: SchemaTypes.Date, default: null},
    // time in ms the client booked ahead of time
    timeScheduledAhead: {type: Number, default: 0},
    duration: {type: SchemaTypes.Number, default: 0}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
