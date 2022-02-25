module.exports = {
  model: 'Users',
  // UserTypes: programmatic, system_admin and provider for haze
  // NOTE: programmatic users can bypass security on most of the cases
  documents: [
    {
      _id: '5fd0795e6cb69f7bfb076fae',
      avatars: [
        {
          _id: '5ab0ecee198c0c3e534ea5de',
          default: true,
          fileMeta: '5c4e6557876376c83d88d5c2'
        }
      ],
      description: '',
      email: 'stripe-payment-api@golpasal.com',
      isVerified: true,
      name: 'stripe-payment-api',
      phone: '00000000',
      phoneRegionCode: '+852',
      preferences: {
        language: 'zh-hk',
        receiveNotification: false
      },
      status: 1,
      userTypes: ['programmatic'],
      username: 'stripe-payment-api',
      verified: {
        email: true,
        phone: true
      }
    },
    {
      _id: '5f5add7bbf0dba8f8136a9fe',
      avatars: [
        {
          _id: '5ab0ecee198c0c3e534ea5de',
          default: true,
          fileMeta: '5c4e6557876376c83d88d5c2'
        }
      ],
      description: '',
      email: 'eeo-map@golpasal.com',
      isVerified: true,
      name: 'eeo-map',
      phone: '00000000',
      phoneRegionCode: '+852',
      preferences: {
        language: 'zh-hk',
        receiveNotification: false
      },
      status: 1,
      userTypes: ['programmatic'],
      username: 'eeo-map',
      verified: {
        email: true,
        phone: true
      }
    },
    {
      _id: '5ab0ecee198c0c3e543ea5ce',
      avatars: [
        {
          _id: '5ab0ecee198c0c3e543ea5cd',
          default: true,
          fileMeta: '5c4e6557876376c83d88d5c2'
        }
      ],
      description: '',
      email: 'golpasal-queue@golpasal.com',
      isVerified: true,
      name: 'golpasal-queue',
      phone: '12345678',
      phoneRegionCode: '+852',
      preferences: {
        language: 'zh-hk',
        receiveNotification: false
      },
      status: 1,
      userTypes: ['programmatic'],
      username: 'golpasal-queue',
      verified: {
        email: true,
        phone: true
      }
    },
    {
      _id: '6049b5386527a3d9b2a5f21f',
      avatars: [
        {
          _id: '5ab0ecee198c0c3e534ea5de',
          default: true,
          fileMeta: '5c4e6557876376c83d88d5c2'
        }
      ],
      description: '',
      email: 'webhook@golpasal.com',
      isVerified: true,
      name: 'webhook',
      phone: '00000000',
      phoneRegionCode: '+852',
      preferences: {
        language: 'zh-hk',
        receiveNotification: false
      },
      status: 1,
      userTypes: ['programmatic'],
      username: 'webhook',
      verified: {
        email: true,
        phone: true
      }
    },
    {
      _id: '5fbb6eeb41f0a575bfd8d0a1',
      workspaces: ['5e9fcae14fc78a87a9bc4c43'],
      currentWorkspace: '5e9fcae14fc78a87a9bc4c43',
      avatars: [
        {
          _id: '5fbb7504f9eee7b1916bb5cc',
          default: true,
          fileMeta: '5c4e6557876376c83d88d5c2'
        }
      ],
      description: '',
      email: 'system.test@golpasal.com',
      isVerified: true,
      name: 'system.test',
      firstName: 'System',
      lastName: 'Test',
      gender: 'F',
      dob: '1989-07-14T11:13:50.858Z',
      phone: '91234568',
      phoneRegionCode: '+852',
      preferences: {
        language: 'zh-hk',
        receiveNotification: false
      },
      status: 1,
      userTypes: ['system_admin'],
      username: 'cs.admin',
      verified: {
        email: true,
        phone: true
      }
    },
    {
      _id: '5e72e7621b7840b7eade210a',
      workspaces: ['5e9fcae14fc78a87a9bc4c43'],
      currentWorkspace: '5e9fcae14fc78a87a9bc4c43',
      avatars: [
        {
          _id: '5ab0ecee198c0c3e543ea5cf',
          default: true,
          fileMeta: '5c4e6557876376c83d88d5c2'
        }
      ],
      description: '',
      email: 'app.provider1@golpasal.com',
      isVerified: true,
      name: 'app.provider1',
      firstName: 'Carl',
      lastName: 'Ng',
      gender: 'M',
      dob: '1986-04-21T11:13:50.858Z',
      phone: '635404518',
      phoneRegionCode: '+852',
      preferences: {
        language: 'zh-hk',
        receiveNotification: false,
        themes: [
          {
            theme: '5eb618ea1d532f6209fdbefe',
            scope: 'admin'
          }
        ]
      },
      status: 1,
      userTypes: ['provider'],
      username: 'app.provider1',
      verified: {
        email: true,
        phone: true
      }
    },
    {
      _id: '6217b42f058f1f1942cbd4be',
      workspaces: ['5e9fcae14fc78a87a9bc4c43'],
      currentWorkspace: '5e9fcae14fc78a87a9bc4c43',
      phoneRegionCode: '+852',
      email: 'rai.pahak@gmail.com',
      firstName: 'Pahak',
      lastName: 'Rai',
      dob: '2022-02-23T18:15:00.000Z',
      gender: 'M',
      username: 'rai.pahak',
      verified: {
        email: true,
        phone: false
      },
      isVerified: true,
      status: 1,
      userTypes: ['member'],
      description: '',
      preferences: {
        language: 'en',
        receiveNotification: true,
        themes: [],
        subscriptionNotification: false
      },
      avatars: [],
      activationIssues: [],
      createdAt: '2022-02-24T16:37:03.294Z',
      updatedAt: '2022-02-24T16:37:53.800Z',
      __v: 0
    }
  ]
};
