import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'Followers';
export const Schema = new MongooseSchema(
  {
    // 關注者
    followee: {type: SchemaTypes.ObjectId, ref: 'Users'},
    // 关注該關注者的人，相当于微博中的“粉丝”。
    follower: {type: SchemaTypes.ObjectId, ref: 'Users'},
    // unfollow date, initally is null when follow, unfollow mark a date
    unfollowAt: {type: Date, default: null}
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
