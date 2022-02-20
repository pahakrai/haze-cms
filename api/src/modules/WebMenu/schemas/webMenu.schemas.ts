import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
import {LocalizeStringSchema} from 'src/core';

const {WorkspaceType} = common.type;

const MenuItem = new MongooseSchema({
  to: {type: String},
  icon: {type: String},
  // either localeId or text
  localeId: {type: String},
  text: {type: LocalizeStringSchema},
  // page string key
  component: {type: String},
  route: {type: String},
  // match the path "to" exactly for navigation on frontend so wont
  // follow subsequent params in the path eg: "/" home page
  exact: {type: Boolean},
  // hides basics links if necessary eg: /error, /about-us or modal links
  // not required ot show on the frontend
  hideMenu: {type: Boolean},
  // policy action array
  auth: {
    type: [String],
    default: undefined
  },
  // workspace types
  workspaceTypes: [
    {
      type: String,
      required: false,
      default: undefined,
      enum: Object.values(WorkspaceType)
    }
  ],
  // workspace access, which workspace id specific to access
  workspaceAccess: [
    {
      type: String,
      default: undefined
    }
  ],
  priority: {
    type: SchemaTypes.Number
  },
  idx: {
    type: SchemaTypes.Number
  }
});

MenuItem.add({
  items: {type: [MenuItem], default: undefined}
});

export const CollectionName = 'WebMenus';
export const Schema = new MongooseSchema(
  {
    code: {type: String, unique: true, required: true},
    menu: [MenuItem]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
