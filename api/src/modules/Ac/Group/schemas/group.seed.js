module.exports = {
  model: 'AC_Groups',
  documents: [
    //  ---------- System Administrator start ----------
    // golpasal System Admin
    {
      _id: '6041d34135d53a40f4670a15',
      name: 'System Administrator',
      workspace: '5e9fcae14fc78a87a9bc4c43',
      users: [
        // system.test@golpasal.com
        '5fbb6eeb41f0a575bfd8d0a1'
      ],
      policies: [
        // System Administrator
        '604f0c9d23d9deb82a519bea',
        // Product Administrator
        '5f16b8666e3c7189be2a3d77',
        // Product Type Administrator
        '5fe4360c70ee1b0cfdfa6ca2',
        // Category Administrator
        '5f16b931bdc3487bfb555549',
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
        // Page Administrator
        '5eaab89b2a001a5584a7a2e2',
        // Page Template Administrator
        '5e58104eb5bd8e8427ed0e22',
        // File Meta Administrator
        '5c7ce45cf1d3458e089e744d',
        // Report export
        '5f5f040c7a2b6ddbcc5703b6',
        // User Schedule Permission
        '5f68489a2f80ff6f6358ccd1',
        // Sales Volume
        '5fa4ff5b0e23c855dd3bdeef',
        // MyWorkspace Account Preference
        '60498cd6f4359e7eafdeea84',
        // MyWorkspace Account Subscription
        '60498eb423ce88c8a3cd172d',
        // MyWorkspace Account Subscription Invoice
        '6049927d002236882ab14e8f',
        // MyWorkspace Account PaymentMethod
        '60498eba9854872aa51f936d',
        // MyWorkspace Account Region
        '60499222ed801e53346164e3',
        // MyWorkspace Account App
        '6049923d8d4a8f0e6bc841e5',
        // Policy Administrator
        '604ec3cdb30f73e5f31e5a94'
        // // Service Administrator
        // '5eb2e0afa05f2d495224fb3f',
      ]
    },
    // golpasal System Support
    {
      _id: '60530b8090a5e091963b00eb',
      name: 'System Support',
      workspace: '5e9fcae14fc78a87a9bc4c43',
      users: [
        // sytem support can be people like customer service and such
      ],
      policies: [
        // Category Administrator
        '5f16b931bdc3487bfb555549',
        // Post Administrator
        '5b2b44930b6fbf38cdcec90a',
        // Post Comment Administrator
        '5c7ce221f1d3458e089e6e57',
        // Tag Administrator
        '5f16c59b6b52e76c76818fcb',
        // TagImage Administrator
        '5f73e6a7bb72e60d58a428f3',
        // Page Administrator
        '5eaab89b2a001a5584a7a2e2',
        // Page Template Administrator
        '5e58104eb5bd8e8427ed0e22',
        // File Meta Administrator
        '5c7ce45cf1d3458e089e744d'
      ]
    },
    {
      _id: '5f154785ba11e8b74626c5b1',
      // NOTE: Workspace owner previously was seapare document for each user
      // but maybe with haze this workspace can have multiple users
      //
      name: 'Workspace Owner',
      // golpasal
      workspace: '5e9fcae14fc78a87a9bc4c43',
      users: [
        // app.provider1
        '5e72e7621b7840b7eade210a'
      ],
      policies: [
        // Post Administrator
        '5b2b44930b6fbf38cdcec90a',
        // Post Comment Administrator
        '5c7ce221f1d3458e089e6e57',
        // Tag Administrator
        '5f16c59b6b52e76c76818fcb',
        // TagImage Administrator
        '5f73e6a7bb72e60d58a428f3'
      ]
    }
  ]
};
