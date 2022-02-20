import {SchemaTypes} from 'mongoose';

export const LocalizeStringSchema = {
  en: {type: SchemaTypes.String, default: ''},
  'zh-hk': {type: SchemaTypes.String, default: ''},
  'zh-cn': {type: SchemaTypes.String, default: ''}
};
