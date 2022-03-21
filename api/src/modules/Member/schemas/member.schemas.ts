import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

import {FileItemSchema} from 'src/core/database';

const {EmploymentType, WageUnitType} = common.type;

export const CollectionName = 'Members';
export const Schema = new MongooseSchema(
  {
    user: {type: SchemaTypes.ObjectId, required: true, ref: 'Users'},
    files: [FileItemSchema],
    organizationName: {type: SchemaTypes.String, required: false},
    preferences: {
      showAvgFeedback: {type: SchemaTypes.Boolean, default: true},
      categories: [{type: SchemaTypes.ObjectId, ref: 'Categories'}],
      tags: [{type: SchemaTypes.String}],
      locations: [{type: SchemaTypes.ObjectId, ref: 'Regions'}],
      employmentTypes: [
        {type: SchemaTypes.String, enum: Object.values(EmploymentType)}
      ],
      wage: {
        currency: {type: String, required: true, default: 'HKD'},
        min: {type: Number, min: 0},
        max: {type: Number, min: 0},
        unit: {
          type: String,
          enum: Object.values(WageUnitType),
          required: true,
          default: WageUnitType.MONTH
        }
      }
    },
    meta: {type: SchemaTypes.Mixed},
    level: {type: SchemaTypes.ObjectId, required: false, ref: 'UserLevels'},
    avgFeedback: {type: SchemaTypes.Number, required: true, default: 0}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);

Schema.virtual('locations', {
  ref: 'Addresses',
  localField: '_id',
  foreignField: 'ref'
});
