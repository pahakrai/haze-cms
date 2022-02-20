module.exports = {
  items: [
    // Provider List
    {
      _id: '5e8414da9b13b76e19fb4066',
      to: '/users/provider',
      auth: ['User:Provider:View'],
      icon: 'MdAccountBox',
      localeId: 'nav.providers',
      component: 'UserProviderPage',
      idx: 1,
      priority: 1
    },
    // Provider Edit
    {
      _id: '5e8414c5026b90d598ed2056',
      to: '/users/provider/:userId',
      auth: ['User:Provider:Edit'],
      hideMenu: true,
      localeId: 'nav.user_detail',
      component: 'UserProviderPage',
      priority: 2
    },
    // Member Edit
    {
      _id: '5e8414be020936d1f37a0b81',
      to: '/users/member/:userId',
      auth: ['User:Member:Edit'],
      hideMenu: true,
      localeId: 'nav.user_detail',
      component: 'UserMemberPage',
      priority: 2
    },
    // User Edit
    {
      _id: '5e8414d2df6ccac0b816d002',
      to: '/users/user/:userId',
      auth: ['User:Merchant:Edit'],
      hideMenu: true,
      localeId: 'nav.user_detail',
      component: 'UserPage',
      priority: 2
    },
    // User Group Create
    {
      _id: '5e8414f1075319882bd47813',
      to: '/user-groups/create',
      localeId: 'nav.create',
      hideMenu: true,
      component: 'UserGroupFormPage',
      auth: ['UserGroup:Create'],
      priority: 3
    },
    // User Group Edit
    {
      _id: '5e84150be7686c488cb393be',
      localeId: 'nav.update',
      to: '/user-groups/:userGroupId',
      hideMenu: true,
      component: 'UserGroupFormEditPage',
      auth: ['UserGroup:Edit'],
      priority: 2
    },
    // User Group List
    {
      _id: '5e841514a80d5b29006e6069',
      to: '/user-groups',
      icon: 'FaUsers',
      localeId: 'nav.user-groups',
      component: 'UserGroupPage',
      auth: ['UserGroup:View'],
      priority: 1
    },
    // User Level Create
    {
      _id: '5f2386a5c8e6372a65db6c8c',
      to: '/user-levels/create',
      localeId: 'nav.create',
      hideMenu: true,
      component: 'UserLevelFormPage',
      auth: ['UserLevel:Create']
    },
    // User Level Edit
    {
      _id: '5f2386ae2a996d30b91c5a9d',
      to: '/user-levels/:userLevelId',
      hideMenu: true,
      localeId: 'nav.update',
      component: 'UserLevelFormPage',
      auth: ['UserLevel:Edit']
    },
    // User Level List
    {
      _id: '5f2386b3c917b52595d47131',
      to: '/user-levels',
      icon: 'FaUserMd',
      localeId: 'nav.user_level_management',
      component: 'UserLevelPage',
      auth: ['UserLevel:View']
    }
  ]
};
