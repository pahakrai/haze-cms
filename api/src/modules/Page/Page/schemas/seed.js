const SeedTemp = require('./seedContent/seedTemp.json');

module.exports = {
  model: 'Pages',
  documents: [
    {
      ...SeedTemp,
      _id: '5c998603d55de123675f127e',
      path: '/terms',
      remarks: 'remarks of terms',
      title: {
        en: 'Terms',
        'zh-cn': '服务条款',
        'zh-hk': '服務條款'
      },
      isTemplate: true,
      preview: '5fd702cde570a63a797614e6',
      meta: {
        description: 'terms',
        keywords: 'terms'
      },
      content: require('./seedContent/terms.json')
    },
    {
      ...SeedTemp,
      _id: '5b5fc144ff6c5330ecf11111',
      path: '/privacy',
      isTemplate: true,
      preview: '5fd702db70add064fb5ceb0d',
      title: {
        en: 'Privacy',
        'zh-hk': '隱私政策',
        'zh-cn': '隐私政策'
      },
      content: require('./seedContent/privacy.json')
    },
    {
      _id: '5dd209746a12ef54b39a4e85',
      type: 'layout',
      title: {
        en: 'PageLayout-1',
        'zh-hk': '頁面設計-1',
        'zh-cn': '页面布局-1'
      },
      workspace: '5ae68a4647d3e98d1944ec13',
      path: '/5dd209746a12ef54b39a4e85',
      createdAt: '2018-10-03T04:15:00.818Z',
      updatedAt: '2018-10-03T04:15:00.818Z',
      version: 1,
      diffNodes: [
        {
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []},
          date: '2018-10-03T04:15:00.818Z'
        }
      ],
      content: require('./seedContent/layout.json'),
      __v: 0
    },
    {
      ...SeedTemp,
      _id: '5b5fc144ff6c5330ecf1f2c2',
      title: {
        en: 'Section Banner',
        'zh-hk': 'Section Banner',
        'zh-cn': 'Section Banner'
      },
      isSystem: true,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      content: '<p> it is banner <p>'
    },
    // golpasal
    {
      _id: '5b5fbfb7ff6c5330ecf1f151',
      type: 'content',
      layout: '5faa70b3f52851d4b1447325',
      title: {
        en: 'Terms',
        'zh-cn': '服务条款',
        'zh-hk': '服務條款'
      },
      meta: {
        description: 'golpasal terms',
        keywords: 'golpasal terms'
      },
      version: 1,
      diffNodes: [
        {
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []},
          date: '2018-10-03T04:15:00.818Z'
        }
      ],
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      isActive: true,
      content: require('./seedContent/golpasal/terms.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43',
      path: '/terms',
      remarks: 'remarks of terms'
    },
    {
      _id: '5b5fc144ff6c5330ecf1f2b2',
      type: 'content',
      layout: '5faa70b3f52851d4b1447325',
      title: {
        en: 'privacy',
        'zh-cn': '隐私政策',
        'zh-hk': '隱私政策'
      },
      meta: {
        description: 'golpasal privacy',
        keywords: 'golpasal privacy'
      },
      path: '/privacy',
      remarks: 'remarks of privacy',
      version: 1,
      diffNodes: [
        {
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []},
          date: '2018-10-03T04:15:00.818Z'
        }
      ],
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      isActive: true,
      content: require('./seedContent/golpasal/privacy.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      _id: '5bb44244bdcd995b8f314e8f',
      type: 'content',
      layout: '5faa70b3f52851d4b1447325',
      title: {
        en: 'FAQ',
        'zh-cn': '常见问题',
        'zh-hk': '常見問題'
      },
      path: '/faq',
      createdAt: '2018-10-03T04:15:00.818Z',
      updatedAt: '2018-10-03T04:15:00.818Z',
      version: 1,
      diffNodes: [
        {
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []},
          date: '2018-10-03T04:15:00.818Z'
        }
      ],
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/faq.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      _id: '5faa70b3f52851d4b1447325',
      type: 'content',
      title: {
        en: 'PageLayout-1',
        'zh-cn': '页面布局-1',
        'zh-hk': '页面布局-1'
      },
      workspace: '5e9fcae14fc78a87a9bc4c43',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      isActive: true,
      path: '/layout',
      version: 1,
      diffNodes: [
        {
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []}
        }
      ],
      content: require('./seedContent/golpasal/layout.json')
    },
    {
      ...SeedTemp,
      _id: '5c998603d523e26f326f127e',
      path: '/',
      title: {
        en: 'Home',
        'zh-cn': '首頁',
        'zh-hk': '首頁'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/home.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d55de26f326f127e',
      path: '/technologies',
      title: {
        en: 'Technologies',
        'zh-cn': '技术',
        'zh-hk': '技術'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/technologies.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5df2f9d0b2db4f701cd45280',
      path: '/news/:_id',
      title: {
        en: 'News Detail',
        'zh-cn': '新闻详情',
        'zh-hk': '新聞詳情'
      },
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      meta: {
        'og:title': 'golpasal',
        'og:type': 'website'
      },
      version: 1,
      type: 'content',
      layout: '5faa70b3f52851d4b1447325',
      diffNodes: [
        {
          _id: '5df2f9d0b2db4f701cd45281',
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []},
          date: '2018-10-03T04:15:00.818Z'
        }
      ],
      content: require('./seedContent/golpasal/newDetail.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },

    {
      ...SeedTemp,
      _id: '5c998603d55de26f675f127e',
      path: '/about',
      title: {
        en: 'about',
        'zh-cn': '关于我们',
        'zh-hk': '關於我們'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/about.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },

    {
      ...SeedTemp,
      _id: '5c998603d552326f675f110e',
      path: '/services/web-development',
      title: {
        en: 'Web development',
        'zh-cn': '网页开发',
        'zh-hk': '網頁開發'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/web-development.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f220e',
      path: '/services/app-development',
      title: {
        en: 'App-development',
        'zh-cn': '应用程式开发',
        'zh-hk': '應用程式開發'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/app-development.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f330e',
      path: '/services/cloud-service',
      title: {
        en: 'Cloud-service',
        'zh-cn': '云端服务',
        'zh-hk': '雲端服務'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/cloud-service.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f440e',
      path: '/services/maintenance',
      title: {
        en: 'Maintenance',
        'zh-cn': '维护和支持',
        'zh-hk': '維護和支持'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/maintenance.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f660e',
      path: '/services/fund/tvp',
      title: {
        en: 'TVP',
        'zh-cn': '科技券计划',
        'zh-hk': '科技券計劃'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/tvp.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f550e',
      path: '/services/fund/bud',
      title: {
        en: 'BUD FUND',
        'zh-cn': 'BUD专项基金',
        'zh-hk': 'BUD專項基金'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/bud.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f770e',
      path: '/services/fund/retaas',
      title: {
        en: 'RETAAS',
        'zh-cn': '零售业人力需求管理科技应用支援计划',
        'zh-hk': '零售業人力需求管理科技應用支援計劃'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/retaas.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f890e',
      path: '/services/fund/sme',
      title: {
        en: 'SME',
        'zh-cn': '中小企业市场推广基金',
        'zh-hk': '中小企業市場推廣基金'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/services/sme.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f127e',
      path: '/contact-us',
      title: {
        en: 'Contact Us',
        'zh-cn': '联络我们',
        'zh-hk': '聯絡我們'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/contact-us.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f675f777e',
      path: '/news',
      title: {
        en: 'News',
        'zh-cn': '新闻',
        'zh-hk': '新聞'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/news.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998603d552326f095f777e',
      path: '/industries',
      title: {
        en: 'Industries',
        'zh-cn': '行业',
        'zh-hk': '行業'
      },
      layout: '5faa70b3f52851d4b1447325',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/golpasal/industries.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      _id: '5dd23e13dff15866bb053b86',
      type: 'layout',
      title: {
        en: 'PageLayout',
        'zh-cn': '页面布局模板',
        'zh-hk': '页面布局模板'
      },
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      path: '/5dd23e13dff15866bb053b86',
      createdAt: '2018-10-03T04:15:00.818Z',
      updatedAt: '2018-10-03T04:15:00.818Z',
      version: 1,
      diffNodes: [
        {
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []},
          date: '2018-10-03T04:15:00.818Z'
        }
      ],
      content: require('./seedContent/golpasal/5dd23e13dff15866bb053b86.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      _id: '5bb44244bdcd995b8f567e8f',
      type: 'content',
      layout: '5faa70b3f52851d4b1447325',
      title: {
        en: 'PageTemplate',
        'zh-cn': '页面模板',
        'zh-hk': '頁面模板'
      },
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false,
      path: '/5bb44244bdcd995b8f567e8f',
      createdAt: '2018-10-03T04:15:00.818Z',
      updatedAt: '2018-10-03T04:15:00.818Z',
      version: 1,
      diffNodes: [
        {
          version: 1,
          up: {layout: [], widgets: []},
          down: {layout: [], widgets: []},
          date: '2018-10-03T04:15:00.818Z'
        }
      ],
      content: require('./seedContent/golpasal/5bb44244bdcd995b8f567e8f.json'),
      workspace: '5e9fcae14fc78a87a9bc4c43'
    },
    {
      ...SeedTemp,
      _id: '5c998113d552326f675f127e',
      path: '/about',
      title: {
        en: 'About us',
        'zh-cn': '关于我们',
        'zh-hk': '關於我們'
      },
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: true,
      workspace: '5e9fcae14fc78a87a9bc4c11'
    },
    // pokemon --START
    {
      ...SeedTemp,
      _id: '5ecf8bf55eb1c620b7ea18c1',
      path: '/terms',
      remarks: 'remarks of terms',
      title: {
        en: 'Terms',
        'zh-cn': '服务条款',
        'zh-hk': '服務條款'
      },
      meta: {
        description: 'terms',
        keywords: 'terms'
      },
      content: require('./seedContent/pokemon/terms.json'),
      workspace: '5ea95dce2b462f77bf7acc02',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '5ecf8bf55eb1c620b7ea18c2',
      path: '/privacy',
      remarks: 'remarks of terms',
      title: {
        en: 'Privacy',
        'zh-hk': '隱私政策',
        'zh-cn': '隐私政策'
      },
      meta: {
        description: 'terms',
        keywords: 'terms'
      },
      content: require('./seedContent/pokemon/privacy.json'),
      workspace: '5ea95dce2b462f77bf7acc02',
      isSystem: false,
      isSection: false,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '5fbf85ff722dff71aa677a61',
      path: '/home/banner',
      title: {
        en: 'Home Banner',
        'zh-hk': '首頁 Banner',
        'zh-cn': '首页 Banner'
      },
      content: require('./seedContent/pokemon/home/banner.json'),
      workspace: '5ea95dce2b462f77bf7acc02',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '5fbf8522722dff71aa677a61',
      path: '/product/delivery-and-payment',
      title: {
        en: 'Delivery and payment methods',
        'zh-hk': '送貨及付款方式',
        'zh-cn': '送货及付款方式'
      },
      content: require('./seedContent/pokemon/product/delivery-and-payment.json'),
      workspace: '5ea95dce2b462f77bf7acc02',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '5feaede6001f9df416f64229',
      path: '/contact-us/banner',
      title: {
        en: 'Contact us banner',
        'zh-hk': '聯繫方式banner',
        'zh-cn': '联系方式banner'
      },
      content: require('./seedContent/pokemon/contact-us/banner.json'),
      workspace: '5ea95dce2b462f77bf7acc02',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '5feb061c4c170804a094af11',
      title: {
        en: 'Faq banner',
        'zh-hk': '常見問題banner',
        'zh-cn': '常见问题banner'
      },
      path: '/faq/banner',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/pokemon/faq/banner.json'),
      workspace: '5ea95dce2b462f77bf7acc02'
    },
    {
      ...SeedTemp,
      _id: '5feb0615921c716e81789aaf',
      title: {
        en: 'Faq list',
        'zh-hk': '常見問題列表',
        'zh-cn': '常见问题列表'
      },
      path: '/faq/questions-list',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/pokemon/faq/questionsList.json'),
      workspace: '5ea95dce2b462f77bf7acc02'
    },
    // pokemon --END
    // fstravel --START
    {
      ...SeedTemp,
      _id: '5ff6e6c5d2d88b4badff6e67',
      path: '/home/banner',
      title: {
        en: 'Home Banner',
        'zh-hk': '首頁 Banner',
        'zh-cn': '首页 Banner'
      },
      content: require('./seedContent/fstravel/home/banner.json'),
      workspace: '5fd83be73db74d57b304cb82',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '60374772c5297595b6290f71',
      path: '/home/banner2',
      title: {
        en: 'Home Banner2',
        'zh-hk': '首頁 Banner2',
        'zh-cn': '首页 Banner2'
      },
      content: require('./seedContent/fstravel/home/banner2.json'),
      workspace: '5fd83be73db74d57b304cb82',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '5ff7d1998049f9ab41e1a7c6',
      title: {
        en: 'About Us Banner',
        'zh-hk': '關於我們 Banner',
        'zh-cn': '关于我们 Banner'
      },
      path: '/about/banner',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/fstravel/about/banner.json'),
      workspace: '5fd83be73db74d57b304cb82'
    },
    {
      ...SeedTemp,
      _id: '5ff80514c6d0f123322069fc',
      path: '/contact-us/banner',
      title: {
        en: 'Contact us banner',
        'zh-hk': '聯繫方式banner',
        'zh-cn': '联系方式banner'
      },
      content: require('./seedContent/fstravel/contact-us/banner.json'),
      workspace: '5fd83be73db74d57b304cb82',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false
    },
    {
      ...SeedTemp,
      _id: '5ff95f850b3a4d0f5876ba4f',
      title: {
        en: 'Faq banner',
        'zh-hk': '常見問題banner',
        'zh-cn': '常见问题banner'
      },
      path: '/faq/banner',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/fstravel/faq/banner.json'),
      workspace: '5fd83be73db74d57b304cb82'
    },
    {
      ...SeedTemp,
      _id: '5ff95f7ffb329c1aa6164058',
      title: {
        en: 'Faq list',
        'zh-hk': '常見問題列表',
        'zh-cn': '常见问题列表'
      },
      path: '/faq/questions-list',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/fstravel/faq/questionsList.json'),
      workspace: '5fd83be73db74d57b304cb82'
    },
    {
      ...SeedTemp,
      _id: '5ff9824f756bec2951927752',
      title: {
        en: 'Destination banner',
        'zh-hk': '目的地 banner',
        'zh-cn': '目的地 banner'
      },
      path: '/destination/banner',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      content: require('./seedContent/fstravel/destination/banner.json'),
      workspace: '5fd83be73db74d57b304cb82'
    },
    {
      ...SeedTemp,
      _id: '5ffc2a721b2ddc62a1825433',
      title: {
        en: 'Terms and conditions',
        'zh-hk': '條款及細則',
        'zh-cn': '条款及细则'
      },
      isTemplate: false,
      isSection: false,
      isSystem: false,
      isActive: true,
      isSeo: false,
      path: '/terms',
      content: require('./seedContent/fstravel/terms.json'),
      workspace: '5fd83be73db74d57b304cb82'
    },
    {
      ...SeedTemp,
      _id: '5ffc2b87648da197bd308f9f',
      title: {
        en: 'Privacy',
        'zh-hk': '隱私及聲明',
        'zh-cn': '隐私及声明'
      },
      isTemplate: false,
      isSection: false,
      isSystem: false,
      isActive: true,
      isSeo: false,
      path: '/privacy',
      content: require('./seedContent/fstravel/privacy.json'),
      workspace: '5fd83be73db74d57b304cb82'
    },
    {
      ...SeedTemp,
      _id: '600297d20164dfa5f61ec6cf',
      title: {
        en: 'Why choose us',
        'zh-hk': '為什麼選擇我們',
        'zh-cn': '为什么选择我们'
      },
      isTemplate: false,
      isSection: true,
      isSystem: false,
      isActive: false,
      isSeo: false,
      path: '/home/why-choose-us',
      content: require('./seedContent/fstravel/home/whyChooseUs.json'),
      workspace: '5fd83be73db74d57b304cb82'
    },
    {
      ...SeedTemp,
      _id: '5fbf8522721dff7caa677a61',
      path: '/product/delivery-and-payment',
      title: {
        en: 'Delivery and payment methods',
        'zh-hk': '送貨及付款方式',
        'zh-cn': '送货及付款方式'
      },
      content: require('./seedContent/fstravel/product/delivery-and-payment.json'),
      workspace: '5fd83be73db74d57b304cb82',
      isSystem: false,
      isSection: true,
      isTemplate: false,
      isSeo: false,
      isActive: false
    }
    // fstravel --END
  ]
};
