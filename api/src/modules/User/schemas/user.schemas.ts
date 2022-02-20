import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

const {UserStatus, UserActivationIssuesStatus} = common.status;
const {GenderType} = common.type;

export const CollectionName = 'Users';
export const Schema = new MongooseSchema(
  {
    // workspace ids
    workspaces: {
      type: [{type: SchemaTypes.ObjectId, required: false, ref: 'Workspaces'}],
      required: false
    },
    // current workspace of the user
    currentWorkspace: {
      ref: 'Workspaces',
      type: SchemaTypes.ObjectId,
      required: false
    },
    // user's phone region code
    phoneRegionCode: {type: String, default: '+852'},
    // NOTE: phone, email & username defaults to null for unique index support
    // user's phone
    phone: {type: String, trim: true},
    // user's email
    email: {type: String, trim: true},
    // user's display name (optional) to firstName | lastName
    name: {type: String},
    // user'f firstName
    firstName: {type: String, trim: true},
    // user's lastname
    lastName: {type: String, trim: true},
    // user's date of birth
    dob: {type: Date, required: false},
    // user's gender
    gender: {
      type: String,
      enum: Object.values(GenderType),
      required: false
    },
    // username
    username: {type: String, trim: true},
    verified: {
      type: SchemaTypes.Mixed,
      default: {
        email: false,
        phone: false
      }
    },
    // primary field to check if the user on userType
    // is verified by phone or email not currently in use
    isVerified: {type: Boolean, required: false, default: false},
    // defines whether user is unverified, locked, active
    status: {
      type: Number,
      default: 0
    },
    userTypes: {
      type: [{type: String, required: true}],
      validate: {
        // at least one userType must be stored
        validator: array => {
          return array.length > 0;
        }
      }
    },
    // a short text allowing user to describe himself
    description: {type: String, default: ''},
    // user avatars
    avatars: [
      {
        fileMeta: {
          type: MongooseSchema.Types.ObjectId,
          required: true,
          ref: 'FileMetas'
        },
        default: {type: Boolean, required: true}
      }
    ],
    // user preferences in this app context
    preferences: {
      // preferred language
      language: {type: String, default: 'en'},
      // receive notification
      receiveNotification: {type: Boolean, default: true},
      themes: [
        {
          theme: {
            type: MongooseSchema.Types.ObjectId,
            required: false,
            ref: 'Themes'
          },
          scope: {type: String}
        }
      ],
      // custom metas for project specific
      meta: {type: SchemaTypes.Mixed, default: {}},
      subscriptionNotification: {type: Boolean, default: false}
    },
    // reason for not approved by admin
    activationIssues: {
      type: [
        {
          reason: {type: String, required: true, default: ''},
          createdAt: {type: Date, default: Date.now},
          status: {
            type: Number,
            enum: Object.values(UserActivationIssuesStatus).map((e: string) =>
              parseInt(e, 2)
            ),
            default: UserActivationIssuesStatus.UNRESOLVED
          }
        }
      ],
      default: []
    }
  },
  {
    collection: CollectionName,
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

// virtual populate UserVehicles
Schema.virtual('userVehicle', {
  justOne: true,
  localField: '_id',
  ref: 'UserVehicles',
  foreignField: 'user'
});

Schema.virtual('userDevice', {
  justOne: true,
  localField: '_id',
  ref: 'Devices',
  foreignField: 'user'
});
