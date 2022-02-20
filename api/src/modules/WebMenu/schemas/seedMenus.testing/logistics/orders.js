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
      workspaceTypes: ['logistics'],
      workspaceAccess: [],
      priority: 1,
      exact: true
    },
    {
      _id: '5e841469211a010d154439a9',
      to: '/orders/shopping',
      icon: 'FaCreativeCommonsShare',
      localeId: 'nav.order_taxi_shopping',
      component: 'OrderPage',
      route: 'OrderListLayoutRoute',
      auth: ['Order:View'],
      workspaceTypes: ['logistics'],
      workspaceAccess: ['5fe02d4db3ca9dfa8170b5ca'],
      priority: 3,
      exact: true
    }
  ]
};
