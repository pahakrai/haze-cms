const common = require('../common/users');

module.exports = {
  ...common,
  items: [
    {
      _id: '5e8414e753452885119fc8ea',
      to: '/users/user',
      auth: ['User:Merchant:View'],
      icon: 'MdAccountBox',
      localeId: 'nav.employer',
      component: 'UserPage',
      priority: 1
    },
    {
      _id: '5e8414dc9b13b76e122b4066',
      to: '/users/member',
      auth: ['User:Member:View'],
      icon: 'MdAccountBox',
      localeId: 'nav.employee',
      component: 'UserMemberPage',
      priority: 1
    },
    ...common.items
  ]
};
