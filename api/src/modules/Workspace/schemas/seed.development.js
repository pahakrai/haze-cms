module.exports = {
  model: 'Workspaces',
  documents: [
    {
      _id: '5e9fcae14fc78a87a9bc4c43',
      code: 'golpasal',
      name: 'golpasal',
      secret: 'jrrpU4RA',
      type: 'company-website',
      defaultCurrency: 'HKD',
      status: 1,
      setting: {
        logo: '5f3f37220d9cd33ad6dd4061',
        favicon: '5eb4e6bbc4e5cb96f17e8e4c',
        headerLogo: '5ea547550d94ffaca1dcc0ac',
        theme: '5fbcb08d7ff6e29273768546',
        loginBackgroundImage: '5ea557e8747c452c727d08da',
        ratingMaxValue: 5
      },
      webHost: 'localhost:3601',
      merchantWebHost: 'localhost:3601',
      adminHost: 'localhost:3109',
      alwaysHttpsWebHost: false,
      alwaysHttpsMerchantWebHost: false,
      alwaysHttpsAdminHost: false,
      contacts: [
        {
          name: 'Michael Ma',
          department: 'IT',
          phoneNo: '99873210',
          coordinates: [114.2214716, 22.3114776],
          address: '香港觀塘鴻圖道45號1樓C室',
          email: 'support@golpasal.com'
        }
      ],
      preferences: {
        auth: {
          subscription: false
        },
        payroll: {
          calculationMethod: 'floor',
          calculateAmountByDetails: false,
          enable: false
        },
        receipt: {
          backgroundImage: null,
          headerImage: null,
          footerImage: null
        },
        order: {
          subscription: false,
          allowEdit: true,
          allowShoppingNoAddress: false,
          clientUserTypes: ['member'],
          enableSignature: false,
          updatePeopleInCharge: false,
          acceptOrderCoolingOffPeriod: 0
        },
        product: {
          isEnableCart: false,
          hasDeliveryAndPaymentInfo: false
        },
        service: {
          pricing: false
        },

        pushNotification: {
          paymenTransactionStatusUpdate: false,
          userStatusUpdate: false,
          userActiviationIssueAdd: false
        }
      },
      socialLinks: {
        facebook: {
          name: 'facebook',
          url: 'https://www.facebook.com/golpasal-105581154396532/'
        },
        youtube: {
          name: 'youtube',
          url: 'https://www.youtube.com/golpasal'
        },
        instagram: {
          name: 'instagram',
          url: 'https://www.instagram.com/golpasal'
        }
      },
      seoMeta: {
        'og:url': 'https://www.golpasal.com',
        'og:site_name': 'golpasal',
        'og:image':
          'https://devcdn.golpasal.com/assets/images/golpasal/5e9fcae14fc78a87a9bc4c43/seed/favicon-golpasal.ico'
      }
    },
    {
      _id: '5fd83be73db74d57b304cb82',
      code: 'fstravel',
      name: 'FS Travel',
      secret: 'cztshIOE',
      type: 'education',
      defaultCurrency: 'HKD',
      status: 1,
      webHost: 'fs-travel.com.hk',
      merchantWebHost: 'fs-travel.com.hk',
      adminHost: 'portal.golpasal.com',
      alwaysHttpsWebHost: false,
      alwaysHttpsMerchantWebHost: false,
      alwaysHttpsAdminHost: false,
      setting: {
        logo: '60507b0b60778796d1491c54',
        favicon: '5fd860a152726797f83630cb',
        headerLogo: '5fd860adf51ea966b66df7bf',
        loginBackgroundImage: null,
        theme: '5ed9e3fb7c39115dd815a331',
        ratingMaxValue: 5
      },
      preferences: {
        auth: {
          subscription: false
        },
        event: {
          notAllowModifyIn: 1200000,
          peopleInChargeLimit: 1
        },
        payroll: {
          calculationMethod: 'floor',
          calculateAmountByDetails: true,
          enable: false
        },
        widgets: ['MediaSlick', 'Video'],
        receipt: {
          backgroundImage: null,
          headerImage: null,
          footerImage: null
        },
        order: {
          subscription: false,
          allowEdit: true,
          allowShoppingNoAddress: false,
          clientUserTypes: ['member'],
          enableSignature: false,
          updatePeopleInCharge: false,
          acceptOrderCoolingOffPeriod: 0
        },
        product: {
          isEnableCart: false,
          hasDeliveryAndPaymentInfo: false
        },
        service: {
          pricing: false
        },

        pushNotification: {
          paymenTransactionStatusUpdate: false,
          userStatusUpdate: false,
          userActiviationIssueAdd: false
        }
      },
      contacts: [
        {
          name: 'Marco Kong',
          department: 'Admin',
          phoneNo: '12345678',
          email: 'cs@fs-travel.com.hk',
          address: '香港上環德輔道中306號余氏大廈2樓',
          coordinates: [114.15066948875254, 22.28685297313431],
          serviceHour: {
            worktime: {
              from: '09:00',
              to: '17:30'
            },
            workdays: ['mon', 'tue', 'wed', 'thu', 'fri']
          }
        }
      ],
      integrations: [],
      socialLinks: {
        facebook: {
          name: '',
          url: ''
        },
        youtube: {
          name: '',
          url: ''
        },
        instagram: {
          name: '',
          url: ''
        }
      }
    },
    {
      _id: '5ea95dce2b462f77bf7acc02',
      code: 'pokemon',
      name: 'Pokemon.com',
      secret: '6fHFVbau',
      type: 'shopping',
      defaultCurrency: 'HKD',
      status: 1,
      webHost: 'localhost:3601',
      merchantWebHost: 'localhost:3601',
      adminHost: 'localhost:3109',
      alwaysHttpsWebHost: false,
      alwaysHttpsMerchantWebHost: false,
      alwaysHttpsAdminHost: false,
      setting: {
        // TODO: replace the file seoMeta later currently uses kidults
        logo: '5f9bd9052c78772dd5e649af',
        favicon: '5fbf284fefa13c1131cdb663',
        headerLogo: '5fbf28538f34d873b44d9787',
        theme: '5fae62f388662c518f0ceaab',
        loginBackgroundImage: '5f9bd91266ec8eade7df0548',
        ratingMaxValue: 5
      },
      preferences: {
        auth: {
          subscription: false
        },
        event: {
          notAllowModifyIn: 1200000,
          peopleInChargeLimit: 1
        },
        payroll: {
          calculationMethod: 'floor',
          calculateAmountByDetails: false,
          enable: false
        },
        receipt: {
          backgroundImage: null,
          headerImage: null,
          footerImage: null
        },
        product: {
          isEnableCart: true,
          hasDeliveryAndPaymentInfo: true
        },
        order: {
          subscription: false,
          allowEdit: true,
          allowShoppingNoAddress: false,
          clientUserTypes: ['member'],
          enableSignature: false,
          updatePeopleInCharge: false,
          acceptOrderCoolingOffPeriod: 0
        },
        service: {
          pricing: false
        },
        widgets: ['TextEditor', 'FoldingCard', 'MediaSlick'],

        pushNotification: {
          paymenTransactionStatusUpdate: false,
          userStatusUpdate: false,
          userActiviationIssueAdd: false
        }
      },
      contacts: [
        {
          name: 'Pahak Rai',
          department: 'IT',
          phoneNo: '99876782',
          coordinates: [114.2214716, 22.3114776],
          address: '香港觀塘鴻圖道45號1樓C室',
          email: 'support@shopping.com'
        }
      ],
      socialLinks: {
        facebook: {
          name: 'pokemon',
          url: 'https://www.facebook.com/shopping-cart'
        },
        youtube: {
          name: 'pokemon',
          url: 'https://www.youtube.com/shopping-cart'
        },
        instagram: {
          name: 'pokemon',
          url: 'https://www.instagram.com/shopping-cart'
        }
      },
      seoMeta: {
        'og:url': 'https://www.shopping-cart.com',
        'og:site_name': 'Pokemon.com',
        'og:image':
          'https://devcdn.golpasal.com/assets/images/golpasal/5ea95dce2b462f77bf7acc02/seed/favicon-Pokemon.ico'
      },
      serviceApps: {
        facebook: {
          appId: '1341722429511082',
          secret: '9d7cdaec6665b981a0b71435aac05682'
        },
        google: {
          web: {
            appId:
              '732855173642-tieq3ipgoq3fafe07sm1sfjoog4gdeio.apps.googleusercontent.com'
          },
          ios: {
            appId:
              '732855173642-jkopidnqrdkcjjntfgv86pec53ip02j8.apps.googleusercontent.com'
          },
          android: {
            appId:
              '732855173642-jkopidnqrdkcjjntfgv86pec53ip02j8.apps.googleusercontent.com'
          }
        }
      }
    }
  ]
};
