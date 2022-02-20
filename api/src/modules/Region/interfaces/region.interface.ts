import {ObjectId} from 'mongodb';
import {Document, PaginateModel} from 'mongoose';
import {Location, LocalizeString} from 'src/core';
// import {FileMeta} from 'src/modules/File/FileMeta/interfaces';

export interface Region extends Document {
  _id: ObjectId;
  type: string;
  subTypes: string[];
  name: LocalizeString;
  ancestors: ObjectId[] | Region[];
  parent: ObjectId;
  isActive: boolean;
  location: Location;
  idx: number;
  // populated field
  children: Array<Region> | Array<string>;
}

export type RegionModel = PaginateModel<Region>;
