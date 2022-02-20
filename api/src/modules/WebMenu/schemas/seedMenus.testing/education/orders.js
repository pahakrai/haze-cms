module.exports = {
  items: [
    {
      _id: '5e841469211a010d15a339a9',
      to: '/orders',
      icon: 'FaCreativeCommonsShare',
      localeId: 'nav.orderList',
      component: 'OrderPage',
      route: 'OrderListLayoutRoute',
      auth: ['Order:View'],
      workspaceTypes: ['education'],
      workspaceAccess: [],
      priority: 1
    }
  ]
};
