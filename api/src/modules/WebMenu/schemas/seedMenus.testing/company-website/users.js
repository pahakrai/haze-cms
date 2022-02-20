const common = require('../common/users');

module.exports = {
  ...common,
  items: [
    {
      _id: '5e8414e753452211119fc8ea',
      to: '/users/user',
      auth: ['User:Merchant:View'],
      icon: 'MdAccountBox',
      localeId: 'nav.merchants',
      component: 'UserPage',
      priority: 1
    },
    ...common.items
  ]
};
