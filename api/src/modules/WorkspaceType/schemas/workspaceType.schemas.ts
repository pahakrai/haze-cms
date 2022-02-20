import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';
import {LocalizeStringSchema} from 'src/core/database';

const {UserType, WorkspaceType} = common.type;

const UserTypeConfigSchema = new MongooseSchema({
  userType: {
    required: true,
    type: SchemaTypes.String,
    enum: Object.values(UserType)
  },
  files: {
    type: [
      {
        name: LocalizeStringSchema,
        fileType: {type: String, required: true}
      }
    ],
    _id: false,
    default: []
  },
  preferences: {
    type: [
      {
        // preference requirement for member/merchant/user
        preference: SchemaTypes.String,
        // value for workspace and user optional or not
        required: {type: SchemaTypes.Boolean, default: false},
        // if provided ref the value of the preference is id of a collection
        ref: SchemaTypes.String
      }
    ],
    _id: false,
    default: []
  },
  meta: {
    type: [
      {
        // meta field for member or merchant
        data: SchemaTypes.String,
        // value for workspace and user optional or not
        required: {type: SchemaTypes.Boolean, default: false},
        adminOnly: {type: SchemaTypes.Boolean, default: true}
      }
    ],
    _id: false,
    default: []
  }
});

const UserTypeDisplaySchema = new MongooseSchema({
  type: {
    type: SchemaTypes.String,
    enum: Object.values(UserType),
    required: true
  },
  name: {
    required: true,
    type: LocalizeStringSchema
  },
  isShow: {
    type: SchemaTypes.Boolean,
    default: true
  }
});

const ServiceTypeDisplaySchema = new MongooseSchema({
  type: {
    type: SchemaTypes.String,
    required: true
  },
  name: {
    required: true,
    type: LocalizeStringSchema
  },
  isShow: {
    type: SchemaTypes.Boolean,
    default: true
  }
});

export const CollectionName = 'WorkspaceTypes';
export const Schema = new MongooseSchema(
  {
    type: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(WorkspaceType),
      unique: true
    },
    payrollPayeeUserType: {
      required: true,
      type: SchemaTypes.String,
      enum: Object.values(UserType),
      default: UserType.MEMBER
    },
    userTypeConfigs: {
      type: [UserTypeConfigSchema],
      _id: false
    },
    userTypeDisplay: {
      type: [UserTypeDisplaySchema],
      _id: false
    },
    serviceTypeDisplay: {
      type: [ServiceTypeDisplaySchema],
      _id: false
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
