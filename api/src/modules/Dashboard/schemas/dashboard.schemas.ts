import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import {LocalizeStringSchema} from 'src/core';

export const CollectionName = 'Dashboards';
export const Schema = new MongooseSchema(
  {
    title: LocalizeStringSchema,
    // route to call for the widget eg: '/drivers/total-driver-count'
    apiUrl: {type: SchemaTypes.String, required: true},
    // move the enum to common eg: totalCount, pieChart
    widgetType: {
      type: SchemaTypes.String,
      required: true,
      enum: ['totalCount', 'pieChart', 'salesVolume', 'map']
    },
    // time in ms reload rate
    reload: {type: SchemaTypes.Number},
    // queries that should refresh the apiUrl call
    queries: [
      {
        type: SchemaTypes.String
      }
    ],
    // position is defined by the widgetType
    // eg1: {x: 0,y: 0,w: 3,h: 1},
    // eg2: {lg: {x: 3,y: 0,w: 3,h: 1},md: {x: 3,y: 0,w: 3,h: 1},sm: {x: 3,y: 0,w: 3,h: 1},
    //       xs: {x: 0,y: 1,w: 3,h: 1},xxs: {x: 0,y: 1,w: 3,h: 1}}
    position: {type: SchemaTypes.Mixed, required: true},
    workspaces: [{type: SchemaTypes.ObjectId, ref: 'Workspaces'}]
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
