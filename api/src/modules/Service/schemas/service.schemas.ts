import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
// import {PaginatePlugin} from 'src/core/database';
const {PlatformType, ServiceType} = common.type;
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'Services';
export const Schema = new MongooseSchema(
  {
    workspace: {
      type: SchemaTypes.ObjectId,
      ref: 'Workspaces',
      required: true
    },
    // service's category, can virtual populate
    _category: {type: SchemaTypes.String},
    name: LocalizeStringSchema,
    description: LocalizeStringSchema,
    type: {
      required: false,
      type: SchemaTypes.String,
      enum: Object.values(ServiceType)
    },
    alias: {type: SchemaTypes.String},
    icon: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
    activeIcon: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
    idx: {type: SchemaTypes.Number, required: true},
    unit: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(common.unit.ServiceUnit)
    },
    platformTypes: [
      {type: SchemaTypes.String, enum: Object.values(PlatformType)}
    ],
    // if true, it is configurable by users
    isConfigurable: {type: SchemaTypes.Boolean, default: true},
    unitMeta: {type: SchemaTypes.Mixed},
    conditions: [
      {
        key: {type: SchemaTypes.String, required: true},
        comparison: {type: SchemaTypes.String, required: true},
        value: {type: SchemaTypes.Mixed, required: true}
      }
    ],
    isActive: {type: Boolean, required: true},
    isMatchCriteria: {type: SchemaTypes.Boolean, default: false},
    isUserInfo: {type: SchemaTypes.Boolean, default: false}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

Schema.virtual('category', {
  ref: 'Categories',
  localField: '_category',
  foreignField: 'code',
  justOne: true
});
Schema.virtual('pricingService', {
  ref: 'PricingServices',
  localField: '_id',
  foreignField: 'service',
  justOne: true
});
