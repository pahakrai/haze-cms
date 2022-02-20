/* eslint-disable max-len */
module.exports = {
  model: 'Params',
  documents: [
    {
      _id: '5acdacd8d42e090be2a766b7',
      type: 'company_info',
      description: 'company default image',
      parameters: {
        contact_banner_uri:
          'https://devcdn.golpasal.com/assets/images/golpasal/common/logo-email.png',
        logo_image_uri:
          'https://devcdn.golpasal.com/assets/images/golpasal/common/logo-email.png',
        logo_gif_uri:
          'https://devcdn.golpasal.com/assets/images/golpasal/common/logo-email.png',
        email_banner_uri:
          'https://devcdn.golpasal.com/assets/images/golpasal/common/logo-email.png',
        icon_facebook:
          'https://cdn.golpasal.com/assets/images/common/facebook.png',
        icon_instagram:
          'https://cdn.golpasal.com/assets/images/common/instagram.png',
        icon_receipt:
          'https://devcdn.golpasal.com/assets/images/common/receipt.png',
        address: {
          en: 'Kowloon, Hong Kong.',
          'zh-hk': 'Kowloon, Hong Kong'
        },
        location: {
          lat: 22.287331,
          lng: 114.146083
        },
        companyUnit: {weightUnit: 'kg'},
        cbmFactor: 1000000,
        contact: [
          {
            type: 'business',
            person: 'Tommy',
            email: 'business@golpasal.com',
            phoneNo: '12345678'
          },
          {
            type: 'support',
            person: 'Tommy',
            email: 'support@golpasal.com',
            phoneNo: '12345678'
          }
        ]
      }
    },
    {
      _id: '5acdacd8d42e090be2a766b8',
      type: 'user_avatar',
      description: 'avatar default image',
      parameters: {
        fileMetaId: '5c4e6557876376c83d88d5c2',
        uri: 'https://cdn.golpasal.com/assets/images/common/user-avatar-default.png'
      }
    },
    {
      _id: '5c205c77a8914ab69125a8f0',
      type: 'PreferenceLanguage',
      description: 'Preference Language',
      parameters: [
        {
          _id: 'en',
          name: {
            en: 'English',
            'zh-hk': 'English'
          },
          idx: 0
        },
        {
          _id: 'zh-hk',
          name: {
            en: 'Traditional Chinese',
            'zh-hk': '繁體中文'
          },
          idx: 1
        }
      ]
    },
    {
      _id: '5e4d0e68df38859323c86cdb',
      type: 'system_param',
      description: 'System Parameters',
      parameters: {
        vip_cancel_order_per_day: 3,
        driver_release_order_per_day: 1,
        pending_request_expires_in: 3600000,
        is_scheduled_time_when_greater_than: 900000
      }
    },
    {
      _id: '5e4d0e68df38811123c86cdb',
      type: 'dashboard',
      description: 'Dashboard parameters',
      parameters: []
    },
    {
      _id: '5fc769e446839ded12165e3f',
      type: 'data_template_AC_Group_workspace_owner',
      description: 'template ac group workspace owner',
      parameters: [
        {
          code: 'Policies',
          values: [
            // Order Administrator
            '5e58104eb5bd8e8427ed0e11',
            // Product Administrator
            '5f16b8666e3c7189be2a3d77',
            // Category Administrator
            '5f16b931bdc3487bfb555549',
            // Event Administrator
            '5f16b9b6ada83038e0936165',
            // Event Attendance Administrator
            '5f16bc6fc0053c1b8b6abbf3',
            // Payroll Administrator
            '5f16bd66a29b6794cf0b06d7',
            // Survey Administrator
            '5f16bdfbeb750c2e308c3f09',
            // User Administrator
            '5c7ce12bf1d3458e089e6bd9',
            // User Group Administrator
            '5c7ce438f1d3458e089e73f1',
            // User Level Administrator
            '5f2386d21b4ca3f1311ac300',
            // Post Administrator
            '5b2b44930b6fbf38cdcec90a',
            // Post Comment Administrator
            '5c7ce221f1d3458e089e6e57',
            // Tag Administrator
            '5f16c59b6b52e76c76818fcb',
            // TagImage Administrator
            '5f73e6a7bb72e60d58a428f3',
            // Notification Schedule Administrator
            '5eb2e26d66fb9dae437ae5b2',
            // Vehicle Model Administrator
            '5f16c9d0657893ef25c413f6',
            // Vehicle Make Administrator
            '5f16c9a25b7d0331de6936d1',
            // Vehicle Type Administrator
            '5eaacbe5d8118f59b0daf7ec',
            // Vehicle Administrator
            '5eaad148f88ebea5cb19c79d',
            // Recruitment Administrator
            '5f16ca94a8a8dc45b4b763ea',
            // Fare Administrator
            '5eaab596ffc721667b24910b',
            // Service Administrator
            '5eb2e0afa05f2d495224fb3f',
            // Page Administrator
            '5eaab89b2a001a5584a7a2e2',
            // Page Template Administrator
            '5e58104eb5bd8e8427ed0e22',
            // File Meta Administrator
            '5c7ce45cf1d3458e089e744d',
            // Workspace Administrator
            '5c7ce46ef1d3458e089e7478',
            // Region Administrator
            '5eaab8a70f97059328065a11',
            // Device Administrator
            '5c7ce483f1d3458e089e74a5',
            // System Menu Access
            '5eaabbb287eb209be6d10583',
            // Holiday Access
            '5eaabbb9b1f833ff00306b86',
            // Enquiry Notification
            '5ed86c24ab532739b8e81d04',
            // Member Registration Notification
            '5e72d6d877705bdea22852c2',
            // My Workspace Access
            '5eaab339074cf35359149d49',
            // Coupon Access
            '5d7ce45cf1d3458e089e744c',
            // Report
            '5f3e475db26c1f3055c18b8e',
            // Courier
            '5e58104eb22d8e8427ed0e11',
            // User Schedule Permission
            '5f68489a2f80ff6f6358ccd1',
            // Sales Volume
            '5fa4ff5b0e23c855dd3bdeef',
            // Workspace App
            '5fc4cd7f6a971c8a1b8a9586'
          ]
        },
        {
          code: 'SubscriptionPlans',
          value: 'free'
        },
        {
          code: 'IAM',
          values: [
            {
              type: 'AWS',
              subType: 'ses',
              description: 'aws ses iam (ses-smtp-user.golpasal. N.Virginia)',
              credentials: {
                name: 'ses-smtp-user.golpasal',
                accessKeyId:
                  'bb0e90b852d080c1a74e75b4287cf2a7467f96229dd5b6612e9b7cd1551c815b',
                secretAccessKey:
                  '10dfb447277ccf93455ed3138eb9b8234af0c4b38a4893193d3a66d2fce2ba4ca9fe605cd7e7f7793e37d93b6eb4292e'
              },
              params: {
                from: 'golpasal <no-reply@golpasal.com>',
                to: 'support@golpasal.com',
                port: 587,
                host: 'email-smtp.us-east-1.amazonaws.com'
              },
              isActive: true
            },
            {
              type: 'SMS',
              subType: 'twilio',
              description: 'sms using twilio (development)',
              credentials: {
                name: 'sms-golpasal-twilio',
                accountSid:
                  '6fdde39c7cb5762f82b0164b9a42f869d7f82e49c25eb78db8948bd5fca608b525dd30df7b76f7683c852edfea7fd3ba',
                authToken:
                  '0c77471d754efa528bd9782683fa696dc9888c9cd21e640a5f479d8effef82115f0160de00b75a45e2eab1aa8df25a48',
                phoneNo: '+19514586259'
              },
              isActive: true
            }
          ]
        },
        {
          code: 'AuthConfig',
          values: [
            {
              userType: 'member',
              loginRequireVerify: true,
              signUpAcGroups: ['5c760de61e6fbb3b98c8d1ba'],
              signUpRequireVerify: true,
              verifiedRequirements: ['email'],
              activateByAdmin: false,
              contactMethod: {
                default: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Passcode verification',
                    'zh-hk': '{workspace} 一次性驗証碼'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'passcode',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'sms'
                },
                emailVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: '{workspace} E-mail Verification',
                    'zh-hk': '{workspace} 電子郵件驗證'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'passcode',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                forgotPassword: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Reset Password',
                    'zh-hk': '{workspace} 重設密碼'
                  },
                  interactLinkUrl: '/auth/verify-user?p=/auth/reset-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Reset Password',
                      'zh-hk': '重設密碼'
                    }
                  },
                  transportType: 'email'
                },
                phoneVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: '{workspace} Phone Verification',
                    'zh-hk': '{workspace} 電話驗證'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'passcode',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'phoneVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportType: 'email'
                },
                signUp: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Sign Up Verification',
                    'zh-hk': '{workspace} 註冊驗證'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                invite: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Invitation',
                    'zh-hk': '{workspace} 邀請函'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Click on the following link to continue - {code}',
                    'zh-hk': '{workspace} 單擊此鏈接以完成該過程 - {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                userIsVerifiedTrue: {
                  emailMessage: {
                    default: {
                      en: 'There is a new member sign up',
                      'zh-hk': '剛有新會員註冊'
                    }
                  },
                  emailTemplate: 'email/userIsVerifiedTrue.ejs',
                  emailTitle: {
                    en: '{workspace} There is a new member sign up',
                    'zh-hk': '{workspace} 剛有新會員註冊'
                  },
                  transportParameters: {
                    t_client_name_label: {
                      en: 'Name',
                      'zh-hk': '名字'
                    },
                    t_client_phone_label: {
                      en: 'Phone No.',
                      'zh-hk': '電話'
                    }
                  },
                  transportType: 'email'
                },
                userStatusActive: {
                  emailMessage: {
                    default: {
                      en: 'Welcome to our big family!',
                      'zh-hk': '歡迎來到我們的大家庭!'
                    }
                  },
                  emailTemplate: 'email/userStatusActive.ejs',
                  emailTitle: {
                    en: '{workspace} You have been activated!',
                    'zh-hk': '{workspace} 您已被激活!'
                  },
                  transportParameters: {},
                  transportType: 'email'
                }
              }
            },
            {
              userType: 'user',
              loginRequireVerify: true,
              signUpAcGroups: ['5c760de61e6fbb3b98c8d1ba'],
              signUpRequireVerify: true,
              verifiedRequirements: ['email'],
              activateByAdmin: true,
              contactMethod: {
                default: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Passcode verification',
                    'zh-hk': '{workspace} 一次性驗証碼'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'passcode',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'sms'
                },
                emailVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: '{workspace} E-mail Verification',
                    'zh-hk': '{workspace} 電子郵件驗證'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                forgotPassword: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Reset Password',
                    'zh-hk': '{workspace} 重設密碼'
                  },
                  interactLinkUrl: '/auth/verify-user?p=/auth/reset-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Reset Password',
                      'zh-hk': '重設密碼'
                    }
                  },
                  transportType: 'email'
                },
                phoneVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: '{workspace} Phone Verification',
                    'zh-hk': '{workspace} 電話驗證'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'passcode',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'phoneVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportType: 'email'
                },
                signUp: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: 'Sign Up Verification',
                    'zh-hk': '註冊驗證'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                invite: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Invitation',
                    'zh-hk': '{workspace} 邀請函'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Click on the following link to continue - {code}',
                    'zh-hk': '{workspace} 單擊此鏈接以完成該過程 - {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                userIsVerifiedTrue: {
                  emailMessage: {
                    default: {
                      en: 'There is a new user sign up',
                      'zh-hk': '剛有新用戶註冊'
                    }
                  },
                  emailTemplate: 'email/userIsVerifiedTrue.ejs',
                  emailTitle: {
                    en: '{workspace} There is a new user sign up',
                    'zh-hk': '{workspace} 剛有新用戶註冊'
                  },
                  transportParameters: {
                    t_client_name_label: {
                      en: 'Name',
                      'zh-hk': '名字'
                    },
                    t_client_phone_label: {
                      en: 'Phone No.',
                      'zh-hk': '電話'
                    }
                  },
                  transportType: 'email'
                },
                userStatusActive: {
                  emailMessage: {
                    default: {
                      en: 'Welcome to our big family!',
                      'zh-hk': '歡迎來到我們的大家庭!'
                    }
                  },
                  emailTemplate: 'email/userStatusActive.ejs',
                  emailTitle: {
                    en: '{workspace} You have been activated!',
                    'zh-hk': '{workspace} 您已被激活!'
                  },
                  transportParameters: {},
                  transportType: 'email'
                }
              }
            },
            {
              userType: 'provider',
              loginRequireVerify: true,
              signUpAcGroups: [],
              signUpRequireVerify: true,
              verifiedRequirements: ['email'],
              activateByAdmin: false,
              contactMethod: {
                default: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Passcode verification',
                    'zh-hk': '{workspace} 一次性驗証碼'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: 'Click on the following link to continue: {code}',
                    'zh-hk': '單擊此鏈接以完成該過程: {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email'
                },
                emailVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} E-mail Verification',
                    'zh-hk': '{workspace} 電子郵件驗證'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                forgotPassword: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Reset Password',
                    'zh-hk': '{workspace} 重設密碼'
                  },
                  interactLinkUrl: '/auth/reset-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: 'Click on the following link to continue: {code}',
                    'zh-hk': '單擊此鏈接以完成該過程: {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Reset Password',
                      'zh-hk': '重設密碼'
                    }
                  },
                  transportType: 'email'
                },
                phoneVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: '{workspace} Phone Verification',
                    'zh-hk': '{workspace} 電話驗證'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'code',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'phoneVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportType: 'sms'
                },
                signUp: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/confirmProvider.ejs',
                  emailTitle: {
                    en: '{workspace} Sign Up Verification',
                    'zh-hk': '{workspace} 註冊驗證'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Click on the following link to continue - {code}',
                    'zh-hk': '{workspace} 單擊此鏈接以完成該過程 - {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                invite: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/confirmProvider.ejs',
                  emailTitle: {
                    en: '{workspace} Invitation',
                    'zh-hk': '{workspace} 邀請函'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Click on the following link to continue - {code}',
                    'zh-hk': '{workspace} 單擊此鏈接以完成該過程 - {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                userIsVerifiedTrue: {
                  emailMessage: {
                    default: {
                      en: 'A new provider has registered',
                      'zh-hk': '新管理員註冊'
                    }
                  },
                  emailTemplate: 'email/userIsVerifiedTrue.ejs',
                  emailTitle: {
                    en: '{workspace} New Provider Registered',
                    'zh-hk': '{workspace} 新管理員註冊'
                  },
                  transportParameters: {
                    t_client_email_label: {
                      en: 'Email',
                      'zh-hk': '電郵'
                    },
                    t_client_name_label: {
                      en: 'Name',
                      'zh-hk': '名字'
                    },
                    t_client_phone_label: {
                      en: 'Phone No.',
                      'zh-hk': '電話'
                    }
                  },
                  transportType: 'email'
                },
                userStatusActive: {
                  emailMessage: {
                    default: {
                      en: 'Welcome to our big family!',
                      'zh-hk': '歡迎來到我們的大家庭!'
                    }
                  },
                  emailTemplate: 'email/userStatusActive.ejs',
                  emailTitle: {
                    en: '{workspace} You have been activated!',
                    'zh-hk': '{workspace} 您已被激活!'
                  },
                  transportParameters: {},
                  transportType: 'email'
                }
              }
            },
            {
              userType: 'provider',
              loginRequireVerify: true,
              signUpAcGroups: [],
              signUpRequireVerify: true,
              verifiedRequirements: ['email'],
              activateByAdmin: false,
              contactMethod: {
                default: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Passcode verification',
                    'zh-hk': '{workspace} 一次性驗証碼'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: 'Click on the following link to continue: {code}',
                    'zh-hk': '單擊此鏈接以完成該過程: {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email'
                },
                emailVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} E-mail Verification',
                    'zh-hk': '{workspace} 電子郵件驗證'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                forgotPassword: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: '{workspace} Reset Password',
                    'zh-hk': '{workspace} 重設密碼'
                  },
                  interactLinkUrl: '/auth/reset-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: 'Click on the following link to continue: {code}',
                    'zh-hk': '單擊此鏈接以完成該過程: {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Reset Password',
                      'zh-hk': '重設密碼'
                    }
                  },
                  transportType: 'email'
                },
                phoneVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: '{workspace} Phone Verification',
                    'zh-hk': '{workspace} 電話驗證'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'code',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'phoneVerify',
                  smsMessage: {
                    en: '{workspace} Your one-time password is {code}',
                    'zh-hk': '{workspace} 你的一次性驗証碼是 {code}'
                  },
                  transportType: 'sms'
                },
                signUp: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/confirmProvider.ejs',
                  emailTitle: {
                    en: '{workspace} Sign Up Verification',
                    'zh-hk': '{workspace} 註冊驗證'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Click on the following link to continue - {code}',
                    'zh-hk': '{workspace} 單擊此鏈接以完成該過程 - {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                invite: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: '{workspace} Your one-time password is',
                      'zh-hk': '{workspace} 你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/confirmProvider.ejs',
                  emailTitle: {
                    en: '{workspace} Invitation',
                    'zh-hk': '{workspace} 邀請函'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: '{workspace} Click on the following link to continue - {code}',
                    'zh-hk': '{workspace} 單擊此鏈接以完成該過程 - {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                userIsVerifiedTrue: {
                  emailMessage: {
                    default: {
                      en: 'A new system admin has registered',
                      'zh-hk': '新系統管理員註冊'
                    }
                  },
                  emailTemplate: 'email/userIsVerifiedTrue.ejs',
                  emailTitle: {
                    en: '{workspace} New System A dmin Registered',
                    'zh-hk': '{workspace} 新系統管理員註冊'
                  },
                  transportParameters: {
                    t_client_email_label: {
                      en: 'Email',
                      'zh-hk': '電郵'
                    },
                    t_client_name_label: {
                      en: 'Name',
                      'zh-hk': '名字'
                    },
                    t_client_phone_label: {
                      en: 'Phone No.',
                      'zh-hk': '電話'
                    }
                  },
                  transportType: 'email'
                },
                userStatusActive: {
                  emailMessage: {
                    default: {
                      en: 'Welcome to our big family!',
                      'zh-hk': '歡迎來到我們的大家庭!'
                    }
                  },
                  emailTemplate: 'email/userStatusActive.ejs',
                  emailTitle: {
                    en: '{workspace} You have been activated!',
                    'zh-hk': '{workspace} 您已被激活!'
                  },
                  transportParameters: {},
                  transportType: 'email'
                }
              }
            }
          ]
        },
        {
          code: 'SignupConfig',
          values: [
            {
              userType: 'provider',
              loginRequireVerify: true,
              signUpAcGroups: ['5c760de61e6fbb3b98c8d1ba'],
              signUpRequireVerify: true,
              verifiedRequirements: ['email'],
              activateByAdmin: false,
              contactMethod: {
                default: {
                  emailMessage: {
                    default: {
                      en: ' Your one-time password is',
                      'zh-hk': '你的一次性驗証碼是'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: 'Your one-time password is',
                      'zh-hk': '你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/cofirmProvider.ejs',
                  emailTitle: {
                    en: 'Passcode verification',
                    'zh-hk': '一次性驗証碼'
                  },
                  interactLinkUrl: '/providers/workspace/confirm',
                  interactType: 'passcode',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: 'Your one-time password is {code}',
                    'zh-hk': '你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'sms'
                },
                emailVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: 'Your one-time password is',
                      'zh-hk': '你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: 'E-mail Verification',
                    'zh-hk': '電子郵件驗證'
                  },
                  interactLinkUrl: '/providers/workspace/confirm',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: 'Your one-time password is {code}',
                    'zh-hk': '你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                forgotPassword: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: 'Your one-time password is',
                      'zh-hk': '你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: 'Reset Password',
                    'zh-hk': '重設密碼'
                  },
                  interactLinkUrl: '/auth/verify-user?p=/auth/reset-password',
                  interactType: 'link',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  smsMessage: {
                    en: 'Your one-time password is {code}',
                    'zh-hk': '你的一次性驗証碼是 {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Reset Password',
                      'zh-hk': '重設密碼'
                    }
                  },
                  transportType: 'email'
                },
                phoneVerify: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: 'Your one-time password is',
                      'zh-hk': '你的一次性驗証碼是'
                    }
                  },
                  emailTitle: {
                    en: 'Phone Verification',
                    'zh-hk': '電話驗證'
                  },
                  interactLinkUrl: '/auth/verify-user',
                  interactType: 'passcode',
                  passcodeExpiresIn: 300000,
                  passcodeLength: 6,
                  passcodeScope: 'phoneVerify',
                  smsMessage: {
                    en: 'Your one-time password is {code}',
                    'zh-hk': '你的一次性驗証碼是 {code}'
                  },
                  transportType: 'email'
                },
                signUp: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: 'Your one-time password is',
                      'zh-hk': '你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/confirmProvider.ejs',
                  emailTitle: {
                    en: 'Sign Up Verification',
                    'zh-hk': '註冊驗證'
                  },
                  interactLinkUrl: '/providers/workspace/confirm',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: 'Your one-time password is {code}',
                    'zh-hk': '你的一次性驗証碼是 {code}'
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                invite: {
                  emailMessage: {
                    default: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    link: {
                      en: 'Click on the following link to continue',
                      'zh-hk': '單擊此鏈接以完成該過程'
                    },
                    passcode: {
                      en: 'Your one-time password is',
                      'zh-hk': '你的一次性驗証碼是'
                    }
                  },
                  emailTemplate: 'email/passcode.ejs',
                  emailTitle: {
                    en: 'Invitation',
                    'zh-hk': '邀請函'
                  },
                  interactLinkUrl: '/auth/set-password',
                  interactType: 'link',
                  passcodeExpiresIn: 86400000,
                  passcodeLength: 6,
                  passcodeScope: 'emailVerify',
                  smsMessage: {
                    en: 'Click on the following link to continue - {code}',
                    'zh-hk': '單擊此鏈接以完成該過程 - {code}'
                  },
                  transportParameters: {
                    t_passcode_token_text: {
                      en: 'Verify',
                      'zh-hk': '驗證'
                    }
                  },
                  transportType: 'email',
                  isUpdateUserVerifyOnPasscodeValidate: true
                },
                userIsVerifiedTrue: {
                  emailMessage: {
                    default: {
                      en: 'A new client has registered',
                      'zh-hk': '新客戶已註冊'
                    }
                  },
                  emailTemplate: 'email/userIsVerifiedTrue.ejs',
                  emailTitle: {
                    en: 'New Client Registered',
                    'zh-hk': '新客戶註冊'
                  },
                  transportParameters: {
                    t_client_name_label: {
                      en: 'Name',
                      'zh-hk': '名字'
                    },
                    t_client_phone_label: {
                      en: 'Phone No.',
                      'zh-hk': '電話'
                    }
                  },
                  transportType: 'email'
                },
                userStatusActive: {
                  emailMessage: {
                    default: {
                      en: 'Welcome to our big family!',
                      'zh-hk': '歡迎來到我們的大家庭!'
                    }
                  },
                  emailTemplate: 'email/userStatusActive.ejs',
                  emailTitle: {
                    en: 'You have been activated!',
                    'zh-hk': '您已被激活!'
                  },
                  transportParameters: {},
                  transportType: 'email'
                }
              }
            }
          ]
        },
        {
          code: 'PageSection',
          values: [
            {
              title: {
                en: 'Section Banner',
                'zh-hk': 'Section Banner',
                'zh-cn': 'Section Banner'
              },
              isTemplate: false,
              isSection: true,
              isSystem: false,
              isActive: true,
              isSeo: false,
              content: {
                layout: {
                  stackName: 'flex',
                  stack: [
                    {
                      direction: 'column',
                      widgets: [
                        {
                          direction: 'row',
                          widgets: ['5fcddefa6a5118f74a1b33cc']
                        }
                      ]
                    }
                  ]
                },
                isTemplate: false,
                widgets: [
                  {
                    position: '',
                    inlineStyle: {
                      sm: 'height:69vw',
                      lg: 'height:35vw'
                    },
                    userPermission: {
                      delete: true,
                      edit: true,
                      move: true
                    },
                    hidden: false,
                    mobileHidden: false,
                    anchor: {
                      hash: '',
                      top: 0
                    },
                    type: 'mediaSlick',
                    data: {
                      leftArrow: {
                        width: '30px',
                        height: '24px',
                        fit: 'cover',
                        position: 'center',
                        src: {
                          'zh-hk':
                            'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/arrow_left.png',
                          'zh-cn':
                            'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/arrow_left.png',
                          en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/arrow_left.png'
                        },
                        title: '',
                        borderRadius: '0%'
                      },
                      rightArrow: {
                        width: '30px',
                        height: '24px',
                        fit: 'cover',
                        position: 'center',
                        src: {
                          'zh-hk':
                            'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/arrow_right.png',
                          'zh-cn':
                            'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/arrow_right.png',
                          en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/arrow_right.png'
                        },
                        borderRadius: '0%'
                      },
                      images: [
                        {
                          src: {
                            en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/bg_home.jpg',
                            'zh-hk':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/bg_home.jpg',
                            'zh-cn':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/bg_home.jpg'
                          },
                          mobileSrc: {
                            en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_background_mobile.png',
                            'zh-hk':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_background_mobile.png',
                            'zh-cn':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_background_mobile.png'
                          },
                          width: '100%',
                          height: '100%',
                          fit: 'cover',
                          position: 'center',
                          title: {
                            en: '',
                            'zh-hk': '',
                            'zh-cn': ''
                          }
                        },
                        {
                          src: {
                            en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner1.png',
                            'zh-hk':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner1.png',
                            'zh-cn':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner1.png'
                          },
                          mobileSrc: {
                            en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner1_mobile.png',
                            'zh-hk':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner1_mobile.png',
                            'zh-cn':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner1_mobile.png'
                          },
                          width: '100%',
                          height: '100%',
                          fit: 'cover',
                          position: 'center',
                          title: {
                            en: '',
                            'zh-hk': '',
                            'zh-cn': ''
                          }
                        },
                        {
                          src: {
                            en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner2.png',
                            'zh-hk':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner2.png',
                            'zh-cn':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner2.png'
                          },
                          mobileSrc: {
                            en: 'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner2_mobile.png',
                            'zh-hk':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner2_mobile.png',
                            'zh-cn':
                              'https://cdn.drikidsonline.com/assets/images/5e9fcae14fc78a87a9bc4c11/seed/home_banner2_mobile.png'
                          },
                          width: '100%',
                          height: '100%',
                          fit: 'cover',
                          position: 'center',
                          title: {
                            en: '',
                            'zh-hk': '',
                            'zh-cn': ''
                          }
                        }
                      ],
                      quantity: 1,
                      carouseSpeed: 3
                    }
                  }
                ]
              },
              diffNodes: [
                {
                  version: 1,
                  up: {
                    layout: [],
                    widgets: []
                  },
                  down: {
                    layout: [],
                    widgets: []
                  }
                }
              ],
              layout: '5dd209746a12ef54b39a4e85',
              type: 'content',
              version: 1,
              meta: {
                description: '',
                version: '',
                'og:url': '',
                'og:image': ''
              },
              path: '/home/banner'
            },
            {
              title: {
                en: 'Delivery and payment methods',
                'zh-hk': '送貨及付款方式',
                'zh-cn': '送货及付款方式'
              },
              isTemplate: false,
              isSection: true,
              isSystem: false,
              isActive: true,
              isSeo: false,
              __v: 0,
              content: {
                layout: {
                  boxed: true,
                  marginUnit: 'px',
                  paddingUnit: 'px',
                  marginTop: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  marginLeft: 0,
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  stackName: 'flex',
                  stack: [
                    {
                      direction: 'column',
                      widgets: [
                        {
                          direction: 'row',
                          widgets: ['5f97ad1a0893a9e3567cc1f7']
                        }
                      ]
                    }
                  ]
                },
                widgets: [
                  {
                    position: '',
                    inlineStyle: {
                      lg: 'font-size:16px'
                    },
                    userPermission: {
                      delete: true,
                      edit: true,
                      move: true
                    },
                    hidden: false,
                    mobileHidden: false,
                    anchor: {
                      hash: '',
                      top: 0
                    },
                    type: 'textEditor',
                    data: {
                      'zh-hk': {
                        text: '<p>送貨方式</p>\n<p>銅鑼灣門市取貨</p>\n<p>尖沙咀門市取貨</p>\n<p>觀塘門市取貨</p>\n<p>順豐速運 - 7-11便利店取件 (自付運費)</p>\n<p>順豐速運 - OK便利店取件 (自付運費)</p>\n<p>順豐速運 - 順便智能櫃取件 (自付運費)</p>\n<p>順豐速運 - 順豐站取件 (自付運費)</p>\n<p>順豐速運 - 順豐服務中心取件 (自付運費)</p>\n<p>順豐速運 - 工商或住宅地址派送 (自付運費）</p>\n<p></p>\n<p>付款方式</p>\n<p>PayMe</p>\n<p>轉數快FPS (掃瞄QR CODE｜即時確認)</p>\n<p>轉數快FPS (自行輸入FPS ID轉帳 | 需人手確認)</p>\n<p>信用卡</p>\n<p>PayPal</p>\n<p>匯豐銀行轉帳</p>\n<p>澳門中國銀行 (只適用於澳門買家)</p>\n'
                      },
                      'zh-cn': {
                        text: '<p>送货方式</p>\n<p>铜锣湾门市取货</p>\n<p>尖沙咀门市取货</p>\n<p>观塘门市取货</p>\n<p>顺丰速运 - 7-11便利店取件 (自付运费)</p>\n<p>顺丰速运 - OK便利店取件 (自付运费)</p>\n<p>顺丰速运 - 顺便智能柜取件 (自付运费)</p>\n<p>顺丰速运 - 顺丰站取件 (自付运费)</p>\n<p>顺丰速运 - 顺丰服务中心取件 (自付运费)</p>\n<p>顺丰速运 - 工商或住宅地址派送 (自付运费）</p>\n<p></p>\n<p>付款方式</p>\n<p>PayMe</p>\n<p>转数快FPS (扫瞄QR CODE｜即时确认)</p>\n<p>转数快FPS (自行输入FPS ID转帐 | 需人手确认)</p>\n<p>信用卡</p>\n<p>PayPal</p>\n<p>汇丰银行转帐</p>\n<p>澳门中国银行 (只适用于澳门买家)</p>\n'
                      },
                      en: {
                        text: '<p>Delivery methods</p>\n<p>Pickup at Causeway Bay Store</p>\n<p>Pickup at Tsim Sha Tsui store</p>\n<p>Kwun Tong store pickup</p>\n<p>SF Express-7-11 Convenience Store Pickup (self-shipment)</p>\n<p>SF Express-OK Convenience Store Pickup (Shipping Fee)</p>\n<p>SF Express-Pickup via Smart Cabinet (Shipping Fee)</p>\n<p>SF Express-Pickup at SF Station (Shipping Fee)</p>\n<p>SF Express-SF Service Center Pickup (Shipping Fee)</p>\n<p>SF Express-Commercial or residential address delivery (self-shipment)</p>\n<p></p>\n<p>Payment method</p>\n<p>PayMe</p>\n<p>Fast FPS (Scan QR CODE｜Instant Confirmation)</p>\n<p>Fast FPS (input FPS ID to transfer money by yourself | manual confirmation required)</p>\n<p>credit card</p>\n<p>PayPal</p>\n<p>HSBC bank transfer</p>\n<p>Macau Bank of China (Only applicable to Macau buyers)</p>\n'
                      }
                    }
                  }
                ]
              },
              diffNodes: [
                {
                  version: 1,
                  up: {
                    layout: [],
                    widgets: []
                  },
                  down: {
                    layout: [],
                    widgets: []
                  }
                }
              ],
              layout: '5dd209746a12ef54b39a4e85',
              type: 'content',
              version: 1,
              meta: {
                description: '',
                version: '',
                'og:url': '',
                'og:image': ''
              },
              path: '/product/delivery-and-payment'
            }
          ]
        },
        {
          code: 'AutoNumberTemplates',
          values: [
            {
              type: 'order',
              prefix: '{1}',
              expression: 'O{1}{2}',
              dateFormat: 'YYMM',
              digits: 7
            },
            {
              type: 'quotation',
              prefix: '{1}',
              expression: 'Q{1}{2}',
              dateFormat: 'YYMM',
              digits: 6
            },
            {
              type: 'payroll',
              prefix: '{1}',
              expression: 'PY{1}{2}',
              dateFormat: 'YYMM',
              digits: 7
            }
          ]
        },
        {
          code: 'WorkspacePaymentMethod',
          values: [
            {
              isActive: true,
              platforms: ['web'],
              defaultCurrency: 'HKD',
              chargeValue: 3.4,
              chargeSymbol: '%',
              adminCharge: 2.35,
              paymentMethod: '5ed76ef70cbf0ed638ac49e6'
            }
          ]
        },
        {
          code: 'Regions',
          values: [
            {
              name: {
                en: 'Hong Kong',
                'zh-hk': '香港',
                'zh-cn': '香港'
              },
              location: {
                properties: {
                  name: '',
                  regions: []
                },
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                type: 'Feature'
              },
              type: 'region',
              subTypes: ['country'],
              ancestors: [],
              isActive: true,
              code: 'HONG_KONG',
              parent: null
            },
            {
              name: {
                en: 'Hong Kong Island',
                'zh-hk': '香港島',
                'zh-cn': '香港岛'
              },
              location: {
                properties: {
                  name: '',
                  regions: []
                },
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                type: 'Feature'
              },
              type: 'region',
              subTypes: ['administrative_area_level_1'],
              ancestors: ['5f9fa9b7262f8563b9d0a898'],
              isActive: true,
              code: 'HONG_KONG_ISLAND',
              parent: '5f9fa9b7262f8563b9d0a898'
            },
            {
              name: {
                en: 'Kowloon',
                'zh-hk': '九龍',
                'zh-cn': '九龙'
              },
              location: {
                properties: {
                  name: '',
                  regions: []
                },
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                type: 'Feature'
              },
              type: 'region',
              subTypes: ['administrative_area_level_1'],
              ancestors: ['5f9fa9b7262f8563b9d0a898'],
              isActive: true,
              code: 'KOWLOON',
              parent: '5f9fa9b7262f8563b9d0a898'
            },
            {
              name: {
                en: 'New Territories',
                'zh-hk': '新界',
                'zh-cn': '新界'
              },
              location: {
                properties: {
                  name: '',
                  regions: []
                },
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                type: 'Feature'
              },
              type: 'region',
              subTypes: ['administrative_area_level_1'],
              ancestors: ['5f9fa9b7262f8563b9d0a898'],
              isActive: true,
              code: 'NEW_TERRITORIES',
              parent: '5f9fa9b7262f8563b9d0a898'
            },
            {
              name: {
                en: 'Islands',
                'zh-hk': '離島',
                'zh-cn': '離島'
              },
              location: {
                properties: {
                  name: '',
                  regions: []
                },
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                type: 'Feature'
              },
              type: 'region',
              subTypes: ['administrative_area_level_1'],
              ancestors: ['5f9fa9b7262f8563b9d0a898'],
              isActive: true,
              code: 'ISLANDS',
              parent: '5f9fa9b7262f8563b9d0a898'
            }
          ]
        }
      ]
    },
    {
      _id: '5fd19b3ab854d1e4cf746a77',
      type: 'stripe_api_key',
      description: 'API key for Stripe payment gateway',
      parameters: {
        publicKey:
          'pk_test_51GsPmQKGfT7SsVig0iaIoN1GmPSJgV7faxjXSM4tHdE2tgFr6bGElBGNaElQOLhyDuVOTYS0uGQGbJlFKIdmRTmV00pKPbXaPL'
      }
    },
    {
      _id: '5ff7c2a8b6a3a2ab412ba85f',
      type: 'feedback_selection',
      description: '投訴及反饋類型',
      parameters: [
        {_id: '5ff7e6bf155eccc38e8c7218', value: '[香港]司機拒載，四坐位的士'},
        {_id: '5ff7e6cbe372a1e70f2a34a9', value: '[香港]司機拒載，非正價'},
        {_id: '5ff7e6e169c6ac6891e655cc', value: '[香港]司機拒載，紅隧'},
        {_id: '5ff7e6f8d88c018a5972d694', value: '司機按錯訂單'},
        {_id: '5ff7e70cea8149dd580f9594', value: '司機拒載，預約訂單'},
        {_id: '5ff7e711ce5e9c981ab0a9f2', value: '司機拒載，兩站'},
        {_id: '5ff7e716e8152887a6443096', value: '司機遲到'},
        {_id: '5ff7e71b2afbd002d48cdc7d', value: '司機態度惡劣'},
        {_id: '5ff7e7207be8456b4329de08', value: '司機濫收車資'},
        {_id: '5ff7e724ad63fd819854027b', value: '司機兜路'},
        {_id: '5ff7e729eb34ddbd5fd9d99c', value: '司機不見人'},
        {_id: '5ff7e72c3a71574250b4bb54', value: '其他'}
      ],
      workspace: '5fe02d4db3ca9dfa8170b5ca'
    },
    {
      _id: '6019721b87af09b6444527a8',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      type: 'bypass_phone',
      description:
        'bypass phone no., which let apple to review during publish app.',
      parameters: [
        // member
        {
          phone: '+85261234561'
        },
        // driver
        {
          phone: '+85251234561'
        },
        {
          phone: '+85251234562'
        },
        {
          phone: '+85251234563'
        },
        {
          phone: '+85251234564'
        },
        {
          phone: '+85251234565'
        },
        {
          phone: '+85251234566'
        },
        {
          phone: '+85251234567'
        }
      ]
    }
  ]
};
