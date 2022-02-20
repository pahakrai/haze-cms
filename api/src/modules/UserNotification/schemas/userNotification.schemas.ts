import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'UserNotifications';
export const Schema = new MongooseSchema(
  {
    senders: [{type: SchemaTypes.ObjectId, required: true, ref: 'Users'}],
    users: [
      {
        user: {type: SchemaTypes.ObjectId, required: true, ref: 'Users'},
        read: {type: SchemaTypes.Boolean, required: true, default: false}
      }
    ],
    title: LocalizeStringSchema,
    images: [
      {
        fileMeta: {type: SchemaTypes.ObjectId, ref: 'FileMetas'}
      }
    ],
    data: {
      screen: {type: SchemaTypes.String, required: true},
      parameters: {type: SchemaTypes.Mixed}
    },
    message: {type: LocalizeStringSchema, required: false}
    // nav: {
    //   type: {type: String, required: true},
    //   // type can be either Deal or Post
    //   item: {
    //     type: Schema.Types.ObjectId,
    //     required: true, refPath: 'nav.type'
    //   }
    // }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
