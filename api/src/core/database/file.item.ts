'use strict';
import {SchemaTypes} from 'mongoose';

export const FileItemSchema = {
  // eg: merchant registration doc, etc. can be enum
  fileType: {type: SchemaTypes.String, default: ''},
  file: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
  isVerified: {type: SchemaTypes.Boolean, default: false}
};
