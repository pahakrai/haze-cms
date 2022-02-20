import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';
import common from '@golpasal/common';

const {WorkspaceType, DayOfWeekType, UserType} = common.type;
const {TwilioVerifyChannelType} = common.type;
const {WorkspaceStatus} = common.status;

const OrderLogisticLocationType = {
  LOCATION: 'location',
  STORE: 'store'
};

export const MetaSchema = new MongooseSchema(
  {
    'og:url': {type: SchemaTypes.String, default: ''},
    'og:site_name': {type: SchemaTypes.String, default: ''},
    'og:locale': {type: SchemaTypes.String, default: ''},
    'og:title': {type: SchemaTypes.String, default: ''},
    'og:type': {type: SchemaTypes.String, default: ''},
    'og:image': {type: SchemaTypes.String, default: ''},
    'fb:pages': {type: SchemaTypes.String, default: ''},
    'fb:app_id': {type: SchemaTypes.String, default: ''}
  },
  {_id: false}
);

export const SocialLinkSchema = new MongooseSchema(
  {
    // facebook: {type: SchemaTypes.String, default: ''},
    facebook: {
      name: {type: SchemaTypes.String, default: ''},
      url: {type: SchemaTypes.String}
    },
    youtube: {
      name: {type: SchemaTypes.String, default: ''},
      url: {type: SchemaTypes.String}
    },
    instagram: {
      name: {type: SchemaTypes.String, default: ''},
      url: {type: SchemaTypes.String}
    },
    baidu: {
      name: {type: SchemaTypes.String, default: ''},
      url: {type: SchemaTypes.String}
    },
    youku: {
      name: {type: SchemaTypes.String, default: ''},
      url: {type: SchemaTypes.String}
    }
  },
  {
    _id: false
  }
);

export const WorkspaceUserTypePreference = new MongooseSchema(
  {
    icon: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
    allowChangePhone: {
      type: SchemaTypes.Boolean,
      default: false
    }
  },
  {
    _id: false
  }
);

export const CollectionName = 'Workspaces';
export const Schema = new MongooseSchema(
  {
    // unique workspace code
    code: {type: SchemaTypes.String, unique: true, required: true},
    // company name
    name: {type: SchemaTypes.String, required: true},
    // type
    type: {
      type: SchemaTypes.String,
      enum: Object.values(WorkspaceType),
      required: true
    },
    // webHost
    webHost: {type: SchemaTypes.String, required: true},
    //secure webHost
    alwaysHttpsWebHost: {type: SchemaTypes.Boolean, default: false},
    // merchantWebHost
    merchantWebHost: {type: SchemaTypes.String},
    // secure merchantWebHost
    alwaysHttpsMerchantWebHost: {type: SchemaTypes.Boolean, default: false},
    // appStoreUrl
    appStoreUrl: {type: SchemaTypes.String},
    // googlePlayUrl
    googlePlayUrl: {type: SchemaTypes.String},

    // adminHost
    adminHost: {type: SchemaTypes.String},
    // secure adminHost
    alwaysHttpsAdminHost: {type: SchemaTypes.Boolean, default: false},
    // secret of workspace
    secret: {type: SchemaTypes.String, required: true},
    // worspace config?
    setting: {
      logo: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
      favicon: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
      headerLogo: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
      loginBackgroundImage: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
      theme: {type: SchemaTypes.ObjectId, ref: 'Themes'},
      ratingMaxValue: {type: SchemaTypes.Number, default: 5}
    },
    // workspace specific preference
    preferences: {
      auth: {
        authorizedDeviceLimit: {
          user: {
            default: 0,
            type: SchemaTypes.Number
          },
          provider: {
            default: 0,
            type: SchemaTypes.Number
          },
          programmatic: {
            default: 0,
            type: SchemaTypes.Number
          }
        },
        dailyRequestPasscodeLimit: {type: SchemaTypes.Number, default: 0},
        twilioLogin: {
          channel: {
            default: 'sms',
            type: SchemaTypes.String,
            enum: Object.values(TwilioVerifyChannelType)
          },
          useAuthy: {
            default: false,
            type: SchemaTypes.Boolean
          }
        },
        subscription: {type: SchemaTypes.Boolean, default: false}
      },
      event: {
        notAllowModifyIn: {type: SchemaTypes.Number, default: 0},
        // 0 = unlimited
        peopleInChargeLimit: {type: SchemaTypes.Number, default: 0}
      },
      widgets: [{type: SchemaTypes.String}],
      receipt: {
        backgroundImage: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
        headerImage: {type: SchemaTypes.ObjectId, ref: 'FileMetas'},
        footerImage: {type: SchemaTypes.ObjectId, ref: 'FileMetas'}
      },
      order: {
        subscription: {type: SchemaTypes.Boolean, default: false},
        dailyCancelLimit: {type: SchemaTypes.Number, default: 0},
        hasConsignee: {type: SchemaTypes.Boolean, default: false},
        hasInvoice: {type: SchemaTypes.Boolean, default: false},
        allowEdit: {type: SchemaTypes.Boolean, default: false},
        allowShoppingNoAddress: {type: SchemaTypes.Boolean, default: false},
        clientUserTypes: [
          {type: SchemaTypes.String, enum: Object.values(UserType)}
        ],
        consumeCredit: {type: SchemaTypes.Boolean, default: false},
        enableSignature: {type: SchemaTypes.Boolean, default: false},
        // shopping specific
        // ...
        // logistic specific
        locationType: {
          type: SchemaTypes.String,
          enum: Object.values(OrderLogisticLocationType),
          default: OrderLogisticLocationType.LOCATION
        },
        updatePeopleInCharge: {type: SchemaTypes.Boolean, default: false},
        // peopleInCharge can't accept order in ms after he complete previous order
        acceptOrderCoolingOffPeriod: {type: SchemaTypes.Number, default: 0}
      },
      service: {
        pricing: {type: SchemaTypes.Boolean, default: false}
      },
      product: {
        isEnableCart: {type: SchemaTypes.Boolean, default: false},
        hasDeliveryAndPaymentInfo: {type: SchemaTypes.Boolean, default: false}
      },
      pushNotification: {
        paymenTransactionStatusUpdate: {
          type: SchemaTypes.Boolean,
          default: false
        },
        userStatusUpdate: {type: SchemaTypes.Boolean, default: false},
        userActiviationIssueAdd: {type: SchemaTypes.Boolean, default: false}
      }
    },
    // default currency
    defaultCurrency: {type: SchemaTypes.String, required: true, default: 'HKD'},
    // workspace status
    status: {type: SchemaTypes.Number, default: WorkspaceStatus.UNACTIVATED},
    // contact info list
    contacts: [
      {
        // name of contact person
        name: {type: SchemaTypes.String, required: true},
        // department of the contact person
        department: {type: SchemaTypes.String},
        // phone number
        phoneNo: {type: SchemaTypes.String, required: true},
        // phone extension
        ext: {type: SchemaTypes.String, default: ''},
        // email
        email: {type: SchemaTypes.String, default: ''},
        // address
        address: {type: SchemaTypes.String, default: ''},
        // coordinates
        coordinates: {
          type: [SchemaTypes.Number],
          default: [0, 0]
        },
        serviceHour: {
          worktime: {
            from: {type: SchemaTypes.String, default: '00:00'},
            to: {type: SchemaTypes.String, default: '23:30'}
          },
          workdays: [
            {type: SchemaTypes.String, enum: Object.values(DayOfWeekType)}
          ],
          timeTableDescription: {type: SchemaTypes.String}
        }
      }
    ],
    // eg: {'facebook': 'https://www.facebook.com/golpasal', ...}
    socialLinks: {type: SocialLinkSchema},
    // meta for seo
    seoMeta: {type: MetaSchema},
    // eg: {'googleTagManager': 'GTM-ABCDEFC', 'facebookPixel': '12345678901234567'}
    marketing: {
      googleTagManager: {type: SchemaTypes.String},
      facebookPixel: {type: SchemaTypes.String}
    },
    serviceApps: {
      facebook: {
        appId: {type: SchemaTypes.String},
        secret: {type: SchemaTypes.String}
      },
      google: {
        web: {
          appId: {type: SchemaTypes.String}
        },
        ios: {
          appId: {type: SchemaTypes.String}
        },
        android: {
          appId: {type: SchemaTypes.String}
        }
      }
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
