module.exports = [
  {
    _id: '5e8414692144010d15a339a9',
    to: '/claims',
    icon: 'MdAttachMoney',
    localeId: 'nav.claims',
    component: 'ClaimPage',
    auth: ['Claim:View'],
    workspaceTypes: ['logistics'],
    workspaceAccess: ['5ea7f40f68a8e97c03d55326'],
    priority: 1,
    exact: true
  },
  {
    _id: '5e841469331a010d154439a9',
    to: '/claims/:claimId',
    localeId: 'nav.update',
    component: 'ClaimFormPage',
    auth: ['Claim:Edit'],
    workspaceTypes: ['logistics'],
    workspaceAccess: ['5ea7f40f68a8e97c03d55326'],
    priority: 2,
    hideMenu: true
  },
  {
    _id: '5e841469211a020d154439a9',
    to: '/claims/create',
    localeId: 'nav.create',
    component: 'ClaimFormPage',
    auth: ['Claim:Create'],
    workspaceTypes: ['logistics'],
    workspaceAccess: ['5ea7f40f68a8e97c03d55326'],
    priority: 3,
    hideMenu: true,
    exact: true
  }
];
