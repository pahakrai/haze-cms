const common = require('../common/users');

module.exports = {
  ...common,
  items: [
    {
      _id: '5e8414e753452211119fc8ea',
      to: '/users/user',
      icon: 'MdAccountBox',
      localeId: 'nav.merchants',
      component: 'UserPage',
      workspaceTypes: ['shopping'],
      auth: ['User:Merchant:View'],
      priority: 1
    },
    {
      _id: '5e8414dc9b13b76e122b4066',
      to: '/users/member',
      auth: ['User:Member:View'],
      icon: 'MdAccountBox',
      localeId: 'nav.members',
      workspaceTypes: ['shopping'],
      component: 'UserMemberPage',
      priority: 1
    },
    ...common.items
  ]
};
