import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';
import common from '@golpasal/common';
const {PlatformType} = common.type;

export const CollectionName = 'Products';
export const Schema = new MongooseSchema(
  {
    // workspace
    workspace: {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'},
    // product name
    name: LocalizeStringSchema,
    // product description
    description: LocalizeStringSchema,
    // product's category, can virtual populate
    _category: {type: SchemaTypes.String, required: true},
    // product content
    content: LocalizeStringSchema,
    // maximum allowable shopping quantity, default is 0, no limit
    maxAllow: {type: SchemaTypes.Number, default: 0, required: true},
    // image list
    images: [{type: SchemaTypes.ObjectId, ref: 'FileMetas'}],
    //product types
    types: [{type: SchemaTypes.ObjectId, ref: 'ProductTypes'}],
    platformTypes: [
      {type: SchemaTypes.String, enum: Object.values(PlatformType)}
    ],
    mediaList1: [
      {
        image: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
        description: {type: SchemaTypes.String, required: false}
      }
    ],
    mediaList2: [
      {
        image: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
        description: {type: SchemaTypes.String, required: false}
      }
    ],
    mediaList3: [
      {
        image: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
        description: {type: SchemaTypes.String, required: false}
      }
    ],
    remarks: {type: SchemaTypes.String, default: ''},
    status: {
      required: true,
      type: SchemaTypes.Number,
      default: common.status.ProductStatus.DRAFT
    },
    // price range for display, update when update sku list
    priceRange: {
      min: {type: SchemaTypes.Number, required: true},
      max: {type: SchemaTypes.Number, required: true}
    },
    placeOfOrigin: {type: SchemaTypes.ObjectId, ref: 'Regions'},
    productionDate: {type: SchemaTypes.Date},
    productExpiryDate: {type: SchemaTypes.Date}
  },
  {
    collection: CollectionName,
    timestamps: true,
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  }
);

Schema.virtual('category', {
  ref: 'Categories',
  localField: '_category',
  foreignField: 'code',
  justOne: true
});
Schema.virtual('specs', {
  ref: 'ProductSpecs',
  localField: '_id',
  foreignField: 'product'
});
Schema.virtual('skus', {
  ref: 'ProductSkus',
  localField: '_id',
  foreignField: 'product'
});
