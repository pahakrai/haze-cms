module.exports = {
  model: 'WebMenus',
  documents: [
    {
      _id: '5e84590415a6b7f33fe7c614',
      code: 'admin',
      menu: [
        // workspace management navigations
        {
          _id: '5e84151c42236766d711ef99',
          to: '/workspaces/create',
          localeId: 'nav.create',
          hideMenu: true,
          auth: ['Workspace:Create'],
          component: 'WorkspaceFormPage',
          priority: 3
        },
        {
          _id: '5e84151c42216736d711ef99',
          to: '/workspaces/:workspaceId',
          localeId: 'nav.edit',
          hideMenu: true,
          auth: ['Workspace:Edit'],
          component: 'WorkspaceFormPage',
          priority: 2
        },
        {
          _id: '5e84153c42216726d711ef99',
          to: '/workspaces',
          icon: 'MdBusiness',
          localeId: 'nav.workspace',
          auth: ['Workspace:View'],
          component: 'WorkspacePage',
          priority: 1
        },
        {
          _id: '5e84153c42216226d711ef99',
          to: '/workspace-app',
          hideMenu: true,
          icon: 'MdBusiness',
          localeId: 'nav.workspace_app',
          auth: ['WorkspaceApp:View'],
          component: 'WorkspaceAppPage',
          priority: 1
        },
        {
          _id: '528414514644f9177dacf71e',
          to: '/workspace-app/:workspaceAppId',
          hideMenu: true,
          localeId: 'nav.workspace_app_detail',
          component: 'WorkspaceAppFormPage',
          auth: ['WorkspaceApp:Edit'],
          priority: 2
        },
        {
          _id: '5fc4c2e7d702865504de0855',
          to: '/workspace-app/:workspaceAppId/:editType',
          hideMenu: true,
          localeId: 'nav.edit',
          component: 'WorkspaceAppEditFormPage',
          auth: ['WorkspaceApp:Edit'],
          priority: 3
        },
        {
          _id: '5e84151c22236766d711ef98',
          to: '/workspace-app/create',
          localeId: 'nav.create',
          hideMenu: true,
          auth: ['WorkspaceApp:Create'],
          component: 'WorkspaceAppCreateFormPage',
          priority: 3
        },
        {
          _id: '5e8415d29997b422ed7f7925',
          to: '/my-workspace',
          localeId: 'nav.workspace_your_workspaces',
          hideMenu: true,
          component: 'MyWorkspaceFormPage',
          auth: ['MyWorkspace:View']
        },
        {
          _id: '6049e9df8ae5d07dd81ebe1d',
          to: '/my-workspace#app',
          hideMenu: true,
          auth: ['MyWorkspace:Account:App']
        },
        {
          _id: '6049e9e3bc353aead4b586a9',
          to: '/my-workspace#subscription',
          hideMenu: true,
          component: 'MyWorkspaceFormPage',
          auth: ['MyWorkspace:Account:Subscription']
        },
        {
          _id: '6049efb78143423cb6320e3d',
          to: '/my-workspace#subscription-invoice',
          hideMenu: true,
          component: 'MyWorkspaceFormPage',
          auth: ['MyWorkspace:Account:SubscriptionInvoice']
        },
        {
          _id: '6049efb3e5c18082e56cdcaa',
          to: '/my-workspace#payment-method',
          hideMenu: true,
          component: 'MyWorkspaceFormPage',
          auth: ['MyWorkspace:Account:PaymentMethod']
        },
        {
          _id: '6049efaf91a25946f929832a',
          to: '/my-workspace#phone-region',
          hideMenu: true,
          component: 'MyWorkspaceFormPage',
          auth: ['MyWorkspace:Account:Region']
        },
        {
          _id: '6049efabc892dac41bd4e9c7',
          to: '/my-workspace#account',
          hideMenu: true,
          component: 'MyWorkspaceFormPage',
          auth: ['MyWorkspace:Account']
        },
        {
          _id: '5f966b113f972ed1c34ca097',
          to: '/my-payment-method',
          localeId: 'payment_method_display',
          hideMenu: true,
          component: 'MyWorkspacePaymentMethodPage',
          auth: ['MyWorkspacePaymentMethod:View'],
          priority: 1
        },
        {
          _id: '5f96bd6c18e8640805d32a74',
          to: '/my-payment-method/:workspacePaymentMethodId',
          localeId: 'nav.edit',
          hideMenu: true,
          component: 'MyWorkspacePaymentMethodFormEditPage',
          auth: ['MyWorkspacePaymentMethod:Edit'],
          priority: 2
        },
        {
          _id: '5f96bd716ef760dadc130dbc',
          to: '/my-payment-method/create',
          localeId: 'nav.create',
          hideMenu: true,
          component: 'MyWorkspacePaymentMethodFormPage',
          auth: ['MyWorkspacePaymentMethod:Create'],
          priority: 3
        },
        {
          _id: '5e84120075626f4d74ba1ccd',
          to: '/',
          exact: true,
          icon: 'IoMdAnalytics',
          localeId: 'nav.dashboard',
          component: 'HomePage',
          auth: []
        },
        {
          _id: '5e841449acbec9060c993493',
          to: '/about',
          hideMenu: true,
          component: 'AboutPage'
        },
        {
          _id: '5e841449acbec9060c911493',
          to: '/legal/privacy-policy',
          hideMenu: true,
          route: 'FullLayoutRoute',
          component: 'PrivacyPolicyPage'
        },
        {
          _id: '5e841449acbec90623993493',
          to: '/legal/user-notice',
          hideMenu: true,
          route: 'FullLayoutRoute',
          component: 'UserNoticePage'
        },
        // SalesVolume
        {
          _id: '5fa4f22ac34ae0d4912c67fe',
          to: '/sales-volume/create',
          localeId: 'nav.create',
          hideMenu: true,
          component: 'SalesVolumeFormPage',
          auth: ['SalesVolume:Create'],
          workspaceTypes: [],
          priority: 3
        },
        {
          _id: '5fa4f225607baef386d5e38e',
          to: '/sales-volume/:salesVolumeId',
          localeId: 'nav.update',
          hideMenu: true,
          component: 'SalesVolumeFormEditPage',
          auth: ['SalesVolume:Edit'],
          workspaceTypes: [],
          priority: 2
        },
        {
          _id: '5fa4f21d08900b09ab5bbf3c',
          to: '/sales-volume',
          localeId: 'nav.sales_volume',
          icon: 'GiMoneyStack',
          component: 'SalesVolumePage',
          auth: ['SalesVolume:View'],
          workspaceTypes: [],
          priority: 1
        },
        // CustomerEnquiry
        {
          _id: '5fc85d6fb3c19187e2a26ef3',
          to: '/customer-enquiry',
          icon: 'AiFillCustomerService',
          localeId: 'nav.customer_enquiry',
          auth: ['CustomerEnquiry:View'],
          workspaceTypes: [],
          component: 'CustomerEnquiryPage',
          priority: 1
        },
        // quotation management navigations
        {
          _id: '5f866e82b10f65295ad3e81b',
          icon: 'MdMonetizationOn',
          auth: ['Quotation:Management'],
          localeId: 'nav.quotation_management',
          workspaceTypes: ['shopping'],
          items: [
            {
              _id: '5f866e8ea7aff549e448736c',
              to: '/quotation',
              localeId: 'nav.quotation',
              icon: 'MdMonetizationOn',
              component: 'QuotationPage',
              workspaceTypes: ['shopping'],
              auth: ['Quotation:View'],
              priority: 1
            },
            {
              _id: '5f866e87a2e47cd2b77abca1',
              to: '/quotation/:quotationId',
              localeId: 'nav.update',
              hideMenu: true,
              auth: ['Quotation:Edit'],
              component: 'QuotationFormEditPage',
              workspaceTypes: ['shopping'],
              priority: 2
            },
            {
              _id: '5f866e9499e733c0c99e7297',
              to: '/quotation/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'QuotationFormPage',
              workspaceTypes: ['shopping'],
              auth: ['Quotation:Create'],
              priority: 3
            }
          ]
        },
        // orders navigations
        {
          _id: '5e8415446494111117473d44',
          auth: ['Order:Management:View'],
          localeId: 'nav.order_manager',
          workspaceTypes: ['shopping'],
          icon: 'FaCreativeCommonsShare',
          items: [
            {
              _id: '5e8414514644f9845dacf71e',
              to: '/orders/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'OrderFormPage',
              route: 'OrderFormLayoutRoute',
              auth: ['Order:Create'],
              workspaceTypes: ['shopping'],
              // code: ['bsgo']
              workspaceAccess: [],
              priority: 3
            },
            {
              _id: '5e84145f09898e89d133e97c',
              to: '/orders/:orderId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'OrderFormEditPage',
              auth: ['Order:View'],
              workspaceTypes: ['shopping'],
              route: 'OrderFormLayoutRoute',
              workspaceAccess: [],
              priority: 2
            },
            ...require('./seedMenus.testing/shopping/orders').items
          ]
        },
        // product management navigations
        {
          _id: '5e8415446494d70017473d44',
          auth: ['Product:View'],
          workspaceTypes: ['shopping'],
          localeId: 'nav.product_manager',
          icon: 'AiOutlineCodeSandbox',
          items: [
            {
              _id: '5e8414514644f98111acf71e',
              to: '/products/create',
              localeId: 'nav.create',
              hideMenu: true,
              workspaceTypes: ['shopping'],
              component: 'ProductFormPage',
              auth: ['Product:Create'],
              priority: 3
            },
            {
              _id: '5e84145f09892229d133e97c',
              to: '/products/:productId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'ProductFormPage',
              workspaceTypes: ['shopping'],
              auth: ['Product:View', 'Product:Edit'],
              priority: 2
            },
            {
              _id: '5e841469211a010113a339a9',
              to: '/products',
              icon: 'AiOutlineCodeSandbox',
              localeId: 'nav.product_list',
              component: 'ProductPage',
              workspaceTypes: ['shopping'],
              auth: ['Product:View'],
              priority: 1
            },
            {
              _id: '5fe436a5104171f4265d42d8',
              to: '/productTypes/create',
              hideMenu: true,
              localeId: 'nav.create',
              workspaceTypes: ['shopping'],
              component: 'ProductTypeFormPage',
              auth: ['ProductType:Create'],
              priority: 3
            },
            {
              _id: '5fe436a953f58eb80ef94cfd',
              to: '/productTypes/:productTypeId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'ProductTypeFormEditPage',
              workspaceTypes: ['shopping'],
              auth: ['ProductType:Edit'],
              priority: 2
            },
            {
              _id: '5fe436b0c92c2e63370d40f5',
              to: '/productTypes',
              icon: 'AiOutlineInbox',
              localeId: 'nav.type',
              component: 'ProductTypePage',
              workspaceTypes: ['shopping'],
              auth: ['ProductType:View'],
              priority: 1
            },
            {
              _id: '5e84252c43916766d711ef99',
              to: '/category',
              icon: 'GiCheckboxTree',
              localeId: 'nav.categories',
              component: 'CategoryPage',
              auth: ['Category:View', 'Category:Create', 'Category:Edit'],
              priority: 1
            }
          ]
        },
        // event manager navigations
        {
          _id: '5e856c629c2224648c4c1411',
          localeId: 'nav.event_manager',
          auth: ['Event:Management:View'],
          workspaceTypes: ['shopping'],
          icon: 'MdEventNote',
          items: [
            {
              _id: '5e8414522644f9845dacf71e',
              to: '/events/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'EventFormPage',
              auth: ['Event:Create'],
              workspaceTypes: ['shopping'],
              workspaceAccess: [],
              priority: 3
            },
            {
              _id: '5e84141119c3d780023b9fb7',
              to: '/events/:eventId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'EventFormPage',
              auth: [],
              workspaceTypes: ['shopping'],
              priority: 2
            },
            {
              _id: '5e84149b81f6c111187d3c14',
              to: '/events',
              icon: 'MdEvent',
              localeId: 'nav.event_list',
              component: 'EventPage',
              auth: [],
              workspaceTypes: ['shopping'],
              priority: 1
            },
            {
              _id: '5e8414111f36307f94ea73b7',
              to: '/events-create',
              icon: 'MdAddCircle',
              localeId: 'nav.event_add',
              component: 'EventFormPage',
              auth: [],
              workspaceTypes: ['shopping'],
              priority: 1
            },
            {
              _id: '5f55eabbdfcf0d5d40519741',
              to: '/event-campaign-progress',
              icon: 'MdClass',
              localeId: 'nav.activity',
              auth: ['Event:View'],
              workspaceTypes: ['shopping'],
              component: 'EventCampaignProgressPage'
            },
            {
              _id: '5f3b6019227de5d9251804ab',
              to: '/event-schedule',
              icon: 'FaCalendarAlt',
              localeId: 'nav.event_schedule',
              auth: ['Event:View'],
              workspaceTypes: ['shopping'],
              component: 'EventSchedulePage'
            }
          ]
        },
        // courier
        {
          _id: '5f51dfa1a88b0eb0220b1617',
          auth: ['Courier:Management:View'],
          localeId: 'nav.courier_manager',
          workspaceTypes: [],
          workspaceAccess: [],
          icon: 'MdAirportShuttle',
          items: [
            {
              _id: '5f4f64a885c6cf8830d51172',
              to: '/couriers/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'CourierFormPage',
              auth: ['Courier:Create'],
              priority: 3
            },
            {
              _id: '5f4f64b555e2c454b86ff2a2',
              to: '/couriers/:courierId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'CourierEditFormPage',
              auth: ['Courier:View', 'Courier:Edit'],
              priority: 2
            },
            {
              _id: '5f4f64ba2e33aa12cad6bac0',
              to: '/couriers',
              icon: 'MdLocalShipping',
              localeId: 'nav.couriers',
              component: 'CourierPage',
              auth: ['Courier:View'],
              priority: 1
            }
          ]
        },
        {
          _id: '603f6484b9ac1698b231248d',
          auth: ['Store:Management:View'],
          localeId: 'nav.store_manager',
          workspaceTypes: ['shopping'],
          workspaceAccess: [],
          icon: 'MdStore',
          items: [
            // store
            {
              _id: '5f8977b9daf3d8573f1b3076',
              to: '/stores/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'StoreFormPage',
              auth: ['Store:Create'],
              workspaceTypes: ['shopping'],
              priority: 3
            },
            {
              _id: '5f8977b4ba9963796d0677b4',
              to: '/stores/:storeId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'StoreFormEditPage',
              auth: ['Store:Edit'],
              workspaceTypes: ['shopping'],
              priority: 2
            },
            {
              _id: '5f8977afb1667dad204eee9d',
              to: '/stores',
              localeId: 'nav.stores',
              icon: 'FaStore',
              component: 'StorePage',
              auth: ['Store:View'],
              workspaceTypes: ['shopping'],
              priority: 1
            },
            // store type
            {
              _id: '603f2f40a2e0c77cb032c59c',
              to: '/storeTypes/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'StoreTypeFormPage',
              auth: ['StoreType:Create'],
              workspaceTypes: ['shopping'],
              priority: 3
            },
            {
              _id: '603f2f3c6b632d3bb3833ff8',
              to: '/storeTypes/:storeTypeId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'StoreTypeFormEditPage',
              auth: ['StoreType:Edit'],
              workspaceTypes: ['shopping'],
              priority: 2
            },
            {
              _id: '603f2f3719e76ff5a2e8e8dc',
              to: '/storeTypes',
              localeId: 'nav.storeTypes',
              icon: 'FaStoreAlt',
              component: 'StoreTypePage',
              auth: ['StoreType:View'],
              workspaceTypes: ['shopping'],
              priority: 1
            }
          ]
        },
        {
          _id: '5e8414b2c8d95b8e4a8a04b4',
          localeId: 'nav.users',
          icon: 'MdAccountBox',
          auth: ['User:Management:View'],
          workspaceAccess: [],
          workspaceTypes: ['shopping'],
          // items
          ...require('./seedMenus.testing/shopping/users')
        },
        {
          _id: '5e8414b2c8d95b8e4a8a04b3',
          localeId: 'nav.users',
          icon: 'MdAccountBox',
          auth: ['User:Management:View'],
          workspaceAccess: [],
          workspaceTypes: ['company-website'],
          // items
          ...require('./seedMenus.testing/company-website/users')
        },
        // marketing navigations
        {
          _id: '5e856c629c53b4648c3c1411',
          localeId: 'nav.marketing',
          auth: ['Post:Management:View'],
          icon: 'MdQuestionAnswer',
          workspaceTypes: [],
          workspaceAccess: [],
          items: [
            {
              _id: '5e8414891f36307f94ea73b7',
              to: '/posts/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'PostFormPage',
              auth: ['Post:Create'],
              workspaceTypes: ['company-website', 'shopping'],
              priority: 3
            },
            {
              _id: '5e84149199c3d780023b9fb7',
              to: '/posts/:postId',
              hideMenu: true,
              localeId: 'nav.update',
              component: 'PostFormEditPage',
              auth: ['Post:Edit'],
              workspaceTypes: ['company-website', 'shopping'],
              priority: 2
            },
            {
              _id: '5e84149b81f6cc3f187d3c14',
              to: '/posts',
              icon: 'MdPlaylistAdd',
              localeId: 'nav.posts',
              component: 'PostPage',
              auth: ['Post:View'],
              workspaceTypes: ['company-website', 'shopping'],
              priority: 1
            },
            {
              _id: '5e84149b8226c93f187d3c14',
              to: '/tag/:text/image',
              localeId: 'nav.tag_edit_picture',
              hideMenu: true,
              component: 'TagImageFormPage',
              auth: ['TagImage:Create'],
              workspaceTypes: ['company-website', 'shopping'],
              priority: 3
            },
            {
              _id: '5e84149b81f6c93f187d3c14',
              to: '/tag/:text',
              hideMenu: true,
              component: 'TagFormPage',
              auth: ['Tag:View'],
              workspaceTypes: ['company-website', 'shopping'],
              priority: 2
            },
            {
              _id: '5e84149b81f6c83f187d3c14',
              to: '/tag',
              icon: 'FaTag',
              localeId: 'nav.tag',
              component: 'TagPage',
              auth: ['Tag:View'],
              workspaceTypes: ['company-website', 'shopping'],
              priority: 1
            },
            {
              _id: '5e84159fcfa523eb3e3889e7',
              to: '/notification-schedule',
              icon: 'MdAccessTime',
              localeId: 'nav.notificationSchedule',
              component: 'NotificationSchedulePage',
              auth: ['NotificationSchedule:View'],
              exact: true
            },
            {
              _id: '5e8415a776493e982d50f04f',
              hideMenu: true,
              to: '/notification-schedule/create',
              localeId: 'nav.create',
              component: 'NotificationScheduleFormPage',
              auth: ['NotificationSchedule:Create'],
              exact: true
            },
            {
              _id: '5e8415afd722fc8d7478851c',
              hideMenu: true,
              localeId: 'nav.update',
              to: '/notification-schedule/:_id',
              auth: ['NotificationSchedule:View'],
              component: 'NotificationScheduleFormEditPage',
              exact: true
            }
          ]
        },
        // Category Management
        {
          _id: '621f7eea41ee3e863cb4d2bb',
          auth: ['Category:View'],
          workspaceTypes: ['company-website'],
          localeId: 'nav.categories',
          icon: 'GiCheckboxTree',
          items: [
            {
              _id: '621f7efd77cb06e0698d09b6',
              to: '/category',
              icon: 'GiCheckboxTree',
              localeId: 'nav.categories',
              component: 'CategoryPage',
              auth: ['Category:Create', 'Category:Edit'],
              priority: 1
            }
          ]
        },
        // Coupon management navigations
        {
          _id: '5e8415aa3494d7c017473d33',
          auth: ['Coupon:Management:View'],
          localeId: 'nav.coupon_management',
          icon: 'FaMoneyCheckAlt',
          workspaceTypes: ['shopping'],
          workspaceAccess: [],
          items: [
            {
              _id: '5e74131a1f363c7f91ea73c6',
              to: '/coupons/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'CouponFormPage',
              auth: ['Coupon:Create'],
              workspaceTypes: ['shopping'],
              priority: 3
            },
            {
              _id: '5e84141c39c3a780123c9fd7',
              to: '/coupons/:couponId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'CouponFormPage',
              auth: ['Coupon:Edit'],
              workspaceTypes: ['shopping'],
              priority: 2
            },
            {
              _id: '5e81139b81f6c122187d3f11',
              to: '/coupons',
              icon: 'AiOutlineCreditCard',
              localeId: 'nav.coupons',
              component: 'CouponPage',
              auth: ['Coupon:View'],
              workspaceTypes: ['shopping'],
              priority: 1
            }
          ]
        },
        // service
        {
          _id: '5e84141a1f36317f94ea73b7',
          to: '/service/create',
          localeId: 'nav.create',
          hideMenu: true,
          component: 'ServiceFormPage',
          auth: ['Service:Create'],
          workspaceTypes: [],
          priority: 3
        },
        {
          _id: '5e84121139c3d780023c9fb7',
          to: '/service/:serviceId',
          localeId: 'nav.update',
          hideMenu: true,
          component: 'ServiceFormPage',
          auth: ['Service:Edit'],
          workspaceTypes: [],
          priority: 2
        },
        {
          _id: '5e84139b81f6c111187d3c14',
          to: '/service',
          icon: 'MdViewModule',
          localeId: 'nav.service',
          component: 'ServicePage',
          auth: ['Service:View'],
          workspaceTypes: ['shopping', 'company-website'],
          priority: 1
        },
        // report
        {
          _id: '5f475a9545370c6d66d57ed4',
          localeId: 'nav.reports_management',
          icon: 'MdReceipt',
          auth: ['Report:Management:View'],
          workspaceAccess: [],
          workspaceTypes: [],
          items: [
            {
              _id: '5e841429211a0102a21139a9',
              to: '/export-reports',
              icon: 'GoRepoPull',
              localeId: 'nav.reports',
              component: 'SystemReportPage',
              auth: ['Report:View'],
              priority: 1
            },
            {
              _id: '5f475b52646b40614758dffa',
              to: '/reports/:reportId',
              localeId: 'nav.update',
              hideMenu: true,
              component: 'ReportFormPage',
              auth: ['Report:Edit'],
              priority: 2
            },
            {
              _id: '5f475b0828c76a78013bcc12',
              to: '/reports',
              icon: 'GoBrowser',
              localeId: 'nav.reports_list',
              component: 'ReportPage',
              auth: ['Report:Create'],
              priority: 1
            }
          ]
        },
        // page management navigations
        {
          _id: '5e8415aa3494d7c017473d44',
          auth: ['Page:Management:View'],
          localeId: 'nav.page_management',
          icon: 'FaRegFileCode',
          workspaceTypes: [],
          workspaceAccess: [],
          items: [
            {
              _id: '5e84153298d9ab362092d3dd',
              localeId: 'nav.create',
              hideMenu: true,
              to: '/pages/create',
              component: 'PageFormPage',
              auth: ['Page:Create'],
              priority: 3
            },
            {
              _id: '5e84153ac4c2338aee12cfe9',
              localeId: 'nav.update',
              hideMenu: true,
              to: '/pages/:pageId',
              component: 'PageFormEditPage',
              auth: ['Page:Edit'],
              priority: 2
            },
            {
              _id: '5e841543673535f3b0051900',
              to: '/pages/:pageId/content',
              localeId: 'nav.update',
              hideMenu: true,
              route: 'FullLayoutRoute',
              component: 'PageContentEditPage',
              auth: ['Page:Edit'],
              priority: 3
            },
            {
              _id: '5e84154d044943fcc7fee7aa',
              to: '/pages',
              icon: 'FaRegFile',
              localeId: 'nav.pages',
              component: 'PageListPage',
              auth: ['Page:View'],
              priority: 1
            },
            {
              _id: '5e841561bb19961aa0550449',
              localeId: 'nav.create',
              hideMenu: true,
              to: '/page-templates/create',
              component: 'PageTemplatesCreatePage',
              auth: ['PageTemplate:Create'],
              priority: 3
            },
            {
              _id: '5e84156931fe8311852139b8',
              localeId: 'nav.update',
              hideMenu: true,
              to: '/page-templates/:pageId',
              component: 'PageTemplatesEditPage',
              auth: ['PageTemplate:Edit'],
              priority: 2
            },
            {
              _id: '5e841576ac9e32a7b3249671',
              to: '/page-templates/:pageId/content',
              hideMenu: true,
              localeId: 'nav.update',
              route: 'FullLayoutRoute',
              component: 'PageTemplatesContentEditPage',
              auth: ['PageTemplate:Edit'],
              priority: 3
            },
            {
              _id: '5e841580d36bf4f6f3231bf8',
              to: '/page-templates',
              icon: 'FaRegFileAlt',
              localeId: 'nav.pageTemplates',
              component: 'PageTemplatesPage',
              auth: ['Page:Management:View'],
              priority: 1
            },
            {
              _id: '5e8415612219961aa0550449',
              localeId: 'nav.create',
              hideMenu: true,
              to: '/page-section/create',
              component: 'PageSectionCreatePage',
              auth: ['Page:Create'],
              priority: 3
            },
            {
              _id: '5e84156931fe8333852139b8',
              localeId: 'nav.update',
              hideMenu: true,
              to: '/page-section/:pageId',
              component: 'PageSectionEditPage',
              auth: ['Page:Edit'],
              priority: 2
            },
            {
              _id: '5e841576ac2e32a7b3244671',
              to: '/page-section/:pageId/content',
              hideMenu: true,
              localeId: 'nav.update',
              route: 'FullLayoutRoute',
              component: 'PageSectionContentEditPage',
              auth: ['Page:Edit'],
              priority: 3
            },
            {
              _id: '5e845580d36bf4f2f3231bf1',
              to: '/page-section',
              icon: 'FaRegFileAlt',
              localeId: 'nav.pageSection',
              component: 'PageSectionPage',
              auth: [],
              priority: 1
            },
            {
              _id: '5f44e49d89e37e53e2ee53ae',
              localeId: 'nav.create',
              hideMenu: true,
              to: '/page-seo/create',
              component: 'PageSeoCreatePage',
              auth: ['Page:Create'],
              priority: 3
            },
            {
              _id: '5f44e4c173951ab6c050eabb',
              localeId: 'nav.update',
              hideMenu: true,
              to: '/page-seo/:pageId',
              component: 'PageSeoEditPage',
              auth: ['Page:Edit'],
              priority: 2
            },
            {
              _id: '5f44e4c70f01f5efe3e5b998',
              to: '/page-seo/:pageId/content',
              localeId: 'nav.update',
              hideMenu: true,
              route: 'FullLayoutRoute',
              component: 'PageSeoContentEditPage',
              auth: ['Page:Edit'],
              priority: 3
            },
            {
              _id: '5f44e4da6ef9a3767e5be849',
              to: '/page-seo',
              icon: 'FaRegFileAlt',
              localeId: 'nav.pageSeo',
              component: 'PageSeoPage',
              auth: [],
              priority: 1
            }
          ]
        },
        // fileMetas management navigations
        {
          _id: '5e8415aa3494d7c017473d22',
          auth: ['FileMeta:Management:View'],
          localeId: 'nav.filemetas_management',
          icon: 'IoMdImages',
          workspaceTypes: [],
          workspaceAccess: [],
          items: [
            {
              _id: '5e84131a1f363c7f91ea73b7',
              localeId: 'nav.create',
              to: '/files/create',
              hideMenu: true,
              component: 'FileMetaFormPage',
              auth: ['FileMeta:Create'],
              workspaceTypes: [],
              priority: 3
            },
            {
              _id: '5e84121c39c3a780123c9fb7',
              to: '/files/:fileMetaId',
              hideMenu: true,
              localeId: 'nav.update',
              component: 'FileMetaFormPage',
              auth: ['FileMeta:Edit'],
              workspaceTypes: [],
              priority: 2
            },
            {
              _id: '5e81139b81f6c122187d3c14',
              to: '/files',
              icon: 'FaFile',
              localeId: 'nav.filemetas',
              component: 'FileMetaPage',
              auth: ['FileMeta:View'],
              workspaceTypes: [],
              priority: 1
            }
          ]
        },

        // regions management navigations
        {
          _id: '5eaab8a70f97059328065a11',
          auth: ['Region:Management:View'],
          localeId: 'nav.regions_management',
          icon: 'FaChartArea',
          workspaceTypes: [],
          workspaceAccess: [],
          items: [
            {
              _id: '5e84152c43916766d711ef99',
              to: '/regions',
              icon: 'MdLocationCity',
              localeId: 'nav.regions',
              component: 'RegionPage',
              auth: ['Region:View'],
              priority: 1
            }
          ]
        },

        // device management navigations
        {
          _id: '5e8415ee3194d7c017473d22',
          auth: ['Device:Management:View'],
          localeId: 'nav.device_management',
          icon: 'MdDevices',
          workspaceTypes: [],
          workspaceAccess: [],
          items: [
            {
              _id: '5e84151c43916746d711ef99',
              to: '/device',
              icon: 'MdDeviceHub',
              localeId: 'nav.device_list',
              component: 'DevicePage',
              auth: ['Device:View'],
              priority: 1
            }
          ]
        },
        // system management navigations
        {
          _id: '5e8415223494d70017473d44',
          auth: ['System:Management:View'],
          localeId: 'nav.system',
          icon: 'FaCog',
          workspaceTypes: [],
          // [] for all company-website type
          // code: ['golpasal']
          workspaceAccess: [],
          items: [
            // Policy List
            {
              _id: '5e8414f1033319882bd47813',
              to: '/policies/create',
              localeId: 'nav.create',
              hideMenu: true,
              component: 'PolicyFormPage',
              auth: ['Policy:Create'],
              priority: 3
            },
            {
              _id: '5e84150be76811488cb393be',
              localeId: 'nav.update',
              to: '/policies/:policyId',
              hideMenu: true,
              component: 'PolicyFormPage',
              auth: ['Policy:Edit'],
              priority: 2
            },
            {
              _id: '5e841514a80d5b29116e6069',
              to: '/policies',
              icon: 'FaUsers',
              localeId: 'nav.policies',
              component: 'PolicyPage',
              auth: ['Policy:View'],
              priority: 1
            },
            {
              _id: '5e84152c42216766d711ef99',
              to: '/public-holiday',
              icon: 'FaRegCalendarAlt',
              localeId: 'nav.public_holiday',
              component: 'CalendarPage',
              auth: ['PublicHoliday:Edit'],
              priority: 1
            }
          ]
        },
        {
          _id: '5e8415d264d7b422ed7f7925',
          to: '/verify-code',
          hideMenu: true,
          route: 'AuthLayoutRoute',
          component: 'VerifyCodePage'
        },
        {
          _id: '5e8415dbc6c3075d0735e60b',
          to: '/login',
          hideMenu: true,
          route: 'AuthLayoutRoute',
          component: 'LoginPage'
        },
        {
          _id: '5e8415e401483509e99d6fd8',
          to: '/auth/validate-user-by-token',
          hideMenu: true,
          route: 'ValidateUserByTokenRoute',
          component: 'ValidateUserByToken',
          auth: []
        },
        {
          _id: '5e8415ed189a719dc7dc01b7',
          to: '/user/validate/:result',
          localeId: 'nav.update',
          hideMenu: true,
          route: 'AuthLayoutRoute',
          component: 'UserValidateStatusPage'
        }
      ]
    }
  ]
};
