module.exports = {
  model: 'Services',
  documents: [
    // taxi
    {
      _id: '5e3a2755ace376f0b940b76a',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'SEATS',
      name: {
        en: 'Seats',
        'zh-hk': '座位選擇',
        'zh-cn': '座位选择'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      alias: '座位選擇',
      type: 'preference',
      icon: '5ff7fa085d32c846cf1b408b',
      activeIcon: '5ff7fa085d32c846cf1b408b',
      idx: 1,
      unit: 'number',
      unitMeta: {
        min: 4,
        max: 5,
        interval: 1,
        default: 4
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      conditions: [],
      isConfigurable: true,
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '602b489778b234b0ab57701a',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'MODEL',
      name: {
        en: 'Comfort Hybrid',
        'zh-hk': '混能',
        'zh-cn': '混能'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      alias: null,
      type: 'preference',
      icon: null,
      activeIcon: null,
      idx: 2,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: true,
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5ff2ba44ede5d64bb214e16d',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'PASSENGER_SERVICE',
      name: {
        en: '85 (Price)',
        'zh-hk': '85(乘客議價)',
        'zh-cn': '85(乘客议价)'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      alias: '八五',
      type: 'preference',
      icon: '5ff6e9dae6719b78cd0d39ba',
      activeIcon: '5ff6e9dae6719b78cd0d39ba',
      idx: 3,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5ff2ba60739b6d7ed1df051f',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'PASSENGER_SERVICE',
      name: {
        en: '90 (Price)',
        'zh-hk': '90(乘客議價)',
        'zh-cn': '90(乘客议价)'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      alias: '九仔',
      type: 'preference',
      icon: '5ff6e9dae6719b78cd0d39ba',
      activeIcon: '5ff6e9dae6719b78cd0d39ba',
      idx: 2,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5fe16635e0be27b367f54017',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'Can Wait',
        'zh-hk': '可以等',
        'zh-cn': '可以等'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      alias: '可以等',
      type: 'preference',
      icon: '5ff6e97b544c2d61aa081533',
      activeIcon: '5ff6e97b544c2d61aa081533',
      idx: 2,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5fe166533ee886c2d21063f2',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'Receipt Required',
        'zh-hk': '要收據',
        'zh-cn': '要收据'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      alias: '要收據',
      type: 'preference',
      icon: '5ff6e9a08e760d191da30413',
      activeIcon: '5ff6e9a08e760d191da30413',
      idx: 3,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5fe1667443ea478485bb52ee',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'Rround Trip',
        'zh-hk': '來回',
        'zh-cn': '来回'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      alias: '來回',
      type: 'preference',
      icon: '5ff6e8064d5093ad075c370a',
      activeIcon: '5ff6e8064d5093ad075c370a',
      idx: 4,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5fe16961ae322832eeff25c9',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'Pets',
        'zh-hk': '有寵物',
        'zh-cn': '有宠物'
      },
      alias: '有寵物',
      type: 'preference',
      icon: '5ff6e9b4a7581c26598bb083',
      activeIcon: '5ff6e9b4a7581c26598bb083',
      idx: 5,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5fe166dedaee5db64bc2386c',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'Restricted Area',
        'zh-hk': '禁區車',
        'zh-cn': '禁区车'
      },
      alias: '禁區車',
      type: 'preference',
      icon: '5ff6e9c845d4cf0dd32354cd',
      activeIcon: '5ff6e9c845d4cf0dd32354cd',
      idx: 6,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '600000eb94bd0af134d8bf11',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'PASSENGER_SERVICE',
      name: {
        en: 'Original Price',
        'zh-hk': '原價',
        'zh-cn': '原价'
      },
      description: '原價',
      alias: '千足',
      type: 'preference',
      icon: '5ff6e9dae6719b78cd0d39ba',
      activeIcon: '5ff6e9dae6719b78cd0d39ba',
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['merchantApp', 'memberApp'],
      isConfigurable: false,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '60000483ba50157ba3c545ea',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'Pricing',
        'zh-hk': '定價',
        'zh-cn': '定价'
      },
      description: '全包',
      alias: '定食',
      type: 'preference',
      icon: null,
      activeIcon: null,
      idx: 7,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['merchantApp'],
      isConfigurable: false,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '600005c0c9e69f3bc0cb2bed',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'Add money of price',
        'zh-hk': '原價加錢',
        'zh-cn': '原价加钱'
      },
      description: '加錢',
      alias: '加錢',
      type: 'preference',
      icon: null,
      activeIcon: null,
      idx: 7,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['merchantApp'],
      isConfigurable: false,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '600ea43ee734e442402dc661',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      _category: 'OTHER_SERVICE',
      name: {
        en: 'One way tunnel',
        'zh-hk': '單程隧道',
        'zh-cn': '单程隧道'
      },
      alias: '單程隧道',
      type: 'preference',
      icon: '5ff6e98dd13d0f391931bbce',
      activeIcon: '60078c7b9ce61e20dd80ed53',
      idx: 8,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      platformTypes: ['admin', 'memberApp', 'merchantApp'],
      isConfigurable: false,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    // WTT
    {
      _id: '5fe169bd61a77b20ba0721a7',
      workspace: '5ea7f40f68a8e97c03d55326',
      _category: 'LOGI',
      name: {
        en: 'Passengers',
        'zh-hk': '跟車乘客',
        'zh-cn': '跟车乘客'
      },
      alias: '跟車乘客',
      type: 'preference',
      icon: '5e4d0832e3768ec386401989',
      idx: 1,
      unit: 'number',
      unitMeta: {
        min: 0,
        max: 5,
        interval: 1,
        default: 0
      },
      isConfigurable: true,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    {
      _id: '5fe169d3f3ae1f697d8a8adc',
      workspace: '5ea7f40f68a8e97c03d55326',
      _category: 'LOGI',
      name: {
        en: 'Freeze',
        'zh-hk': '冷凍',
        'zh-cn': '冷冻'
      },
      alias: '冷凍',
      type: 'preference',
      icon: '5e4d0832e3768ec386401989',
      idx: 2,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      isConfigurable: true,
      conditions: [],
      isActive: true,
      isMatchCriteria: false,
      isUserInfo: false
    },
    // Drikids
    {
      _id: '5f61e78b1d1fbae6ec756324',
      name: {
        en: ' Material Fee',
        'zh-hk': '教材費',
        'zh-cn': '教材费'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      type: 'material',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5e9fcae14fc78a87a9bc4c11'
    },
    {
      _id: '5f61e78eca4be4b9be8a0fc3',
      name: {
        en: 'Enrollment Fee',
        'zh-hk': '報名費',
        'zh-cn': '报名费'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      type: 'administrative',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5e9fcae14fc78a87a9bc4c11'
    },
    {
      _id: '5f87acc14d54fda85702884c',
      name: {
        en: 'Shipping Fee',
        'zh-hk': '運費',
        'zh-cn': '运费'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      type: 'logistics',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5e9fcae14fc78a87a9bc4c11'
    },
    {
      _id: '5f61e7946387d4784264c746',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      type: 'administrative',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5e9fcae14fc78a87a9bc4c11'
    },
    // POKEMON
    {
      _id: '5f86cc93bcfff7971dccbd59',
      name: {
        en: 'Logistics costs',
        'zh-hk': '物流費',
        'zh-cn': '物流费'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      type: 'administrative',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc02'
    },
    // SJS
    {
      _id: '5f15116752adb2171ff51d03',
      name: {
        en: 'Web Development / Content Management',
        'zh-hk': '網頁開發/後台管理',
        'zh-cn': '网页开发/后台管理'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f151dcd29ef57172b63a931',
      name: {
        en: 'E-commerce Development',
        'zh-hk': '電子商務發展',
        'zh-cn': '电子商务发展'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f152146f14b13ee16923c85',
      name: {
        en: 'Mobile Application',
        'zh-hk': '手機應用程式',
        'zh-cn': '手机应用程式'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1521b7e599ee8bb296e2d3',
      name: {
        en: 'Desktop Application',
        'zh-hk': '桌面應用程式',
        'zh-cn': '桌面应用程式'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15222e7cf5a7f3139eac09',
      name: {
        en: 'Chatbot',
        'zh-hk': '聊天機械人',
        'zh-cn': '聊天机械人'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15230230175b0c594a371a',
      name: {
        en: 'User Testing',
        'zh-hk': '用戶測試',
        'zh-cn': '用户测试'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15231543a1bb7504421dbd',
      name: {
        en: 'Online Courses',
        'zh-hk': '網上課程',
        'zh-cn': '网上课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f152345a8f2525a654b7f3d',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WEB_IT_&_SOFTWARE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153705484b7bfb665cc445',
      name: {
        en: 'Logo Design',
        'zh-hk': '標誌設計',
        'zh-cn': '标志设计'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15382237bfe8013c13cf19',
      name: {
        en: 'Leaflet Design',
        'zh-hk': '傳單設計',
        'zh-cn': '传单设计'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15382b4642dbe2a9ee7a12',
      name: {
        en: 'Business card and Stationery',
        'zh-hk': '名片和文具',
        'zh-cn': '名片和文具'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1538837e8122d4a8396345',
      name: {
        en: 'Book / Brochure / Catalogue / Menu Design',
        'zh-hk': '書籍/小冊子/目錄/餐牌設計',
        'zh-cn': '书籍/小册子/目录/餐牌设计'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1539c5b18ac435ea1de85b',
      name: {
        en: 'Exhibition Design',
        'zh-hk': '展覽設計',
        'zh-cn': '展览设计'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1539cc96b8b20c846a4de5',
      name: {
        en: 'Infographics Design',
        'zh-hk': '資訊圖表設計',
        'zh-cn': '资讯图表设计'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153a19d0a1bf7fae397547',
      name: {
        en: 'Package Design',
        'zh-hk': '包裝設計',
        'zh-cn': '包装设计'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153a20cc069ba1e501aaf5',
      name: {
        en: 'Storyboard',
        'zh-hk': '故事板',
        'zh-cn': '故事板'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153ae99cd6cff9d6e0cae5',
      name: {
        en: 'Photoshop Editing',
        'zh-hk': 'Photoshop編輯',
        'zh-cn': 'Photoshop编辑'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153b36f045297aa32283de',
      name: {
        en: 'Banner Advertisement',
        'zh-hk': '橫額廣告',
        'zh-cn': '横额广告'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153b68fa5bc5c39150e8da',
      name: {
        en: 'Online Courses',
        'zh-hk': '網上課程',
        'zh-cn': '网上课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153bc4e7a067d2a4b92bbb',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'GRAPHICS_&_DESIGN',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153cf3229c1bb7021d5ef6',
      name: {
        en: 'Search Engine Optimization',
        'zh-hk': '搜索引擎優化',
        'zh-cn': '搜索引擎优化'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153d0109bf3f2ddb11ffaa',
      name: {
        en: 'Social Media Marketing',
        'zh-hk': '社交平台推廣',
        'zh-cn': '社交平台推广'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153d67850efb64a1467a3a',
      name: {
        en: 'Content Marketing',
        'zh-hk': '內容行銷',
        'zh-cn': '内容行销'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153d6e158584cf808d92da',
      name: {
        en: 'Public Relationship',
        'zh-hk': '公共關系',
        'zh-cn': '公共关系'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153db561d414cec8d49878',
      name: {
        en: 'Campaign Assistance',
        'zh-hk': '選舉協助',
        'zh-cn': '选举协助'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153dc2df3c7f42dbef430c',
      name: {
        en: 'Video Marketing',
        'zh-hk': '影片行銷',
        'zh-cn': '影片行销'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153dca409da9d8ed741566',
      name: {
        en: 'Email Marketing',
        'zh-hk': '電郵推廣',
        'zh-cn': '电邮推广'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153e283f1fe335305d4166',
      name: {
        en: 'Influencer Marketing',
        'zh-hk': '影響力行銷',
        'zh-cn': '影响力行销'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153e327dac7afe849b8de0',
      name: {
        en: 'Telemarketing',
        'zh-hk': '電話銷售',
        'zh-cn': '电话销售'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153f833127877b18ebde9d',
      name: {
        en: 'Online Courses',
        'zh-hk': '網上課程',
        'zh-cn': '网上课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f153fd560ddf5e998cc8e1e',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'MARKETING_&_PUBLIC_RELATIONS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1540510f729865797e6bb0',
      name: {
        en: 'Creative Writing',
        'zh-hk': '創意寫作',
        'zh-cn': '创意写作'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WRITING',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1540cfdf65c0205227fa3b',
      name: {
        en: 'Articles and Blog Posts',
        'zh-hk': '文章和日誌文章',
        'zh-cn': '文章和日志文章'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WRITING',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1540d69a3639b5cfa1ef23',
      name: {
        en: 'Proofreading and Editing',
        'zh-hk': '校對和編輯',
        'zh-cn': '校对和编辑'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WRITING',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15412092fb10ec7985c7eb',
      name: {
        en: 'CV Writing and Cover Letter',
        'zh-hk': '簡歷寫作和求職信',
        'zh-cn': '简历写作和求职信'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WRITING',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15413574748615e1d078e3',
      name: {
        en: 'Press Release',
        'zh-hk': '新聞稿',
        'zh-cn': '新闻稿'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WRITING',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15426d50c622514474068b',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'WRITING',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154327ccdb022dd0f32238',
      name: {
        en: 'Translation ( English, French, German, Spanish, Chinese, Cantonese, others)',
        'zh-hk': '翻譯：語言（英語，法語，德語，西班牙語，中文，廣東話，其他）',
        'zh-cn': '翻译：语言（英语，法语，德语，西班牙语，中文，广东话，其他）'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'TRANSLATION_&_LANGUANGES',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15432ff6e23e85d0bbd2fc',
      name: {
        en: 'Online Courses',
        'zh-hk': '網上課程',
        'zh-cn': '网上课程 '
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'TRANSLATION_&_LANGUANGES',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1543731e6f730d31817686',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'TRANSLATION_&_LANGUANGES',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1543d29019c3f8f829d5d6',
      name: {
        en: '3D Rendering',
        'zh-hk': '3D渲染',
        'zh-cn': '3D渲染'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'ENGINEERING_&_ARCHITECTURE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15443835dd4c830d107854',
      name: {
        en: 'Inferior design',
        'zh-hk': '室內設計',
        'zh-cn': '室内设计'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'ENGINEERING_&_ARCHITECTURE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15444eeab5b858ac0fbb1f',
      name: {
        en: 'Online Courses',
        'zh-hk': '網上課程',
        'zh-cn': '网上课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'ENGINEERING_&_ARCHITECTURE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1544988077a2d5e7a83cc5',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'ENGINEERING_&_ARCHITECTURE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15461dbd627a70dbfc03a4',
      name: {
        en: 'Whiteboard animation',
        'zh-hk': '白板動畫',
        'zh-cn': '白板动画'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15462586710053d0fea4ea',
      name: {
        en: '2D/3D Animation',
        'zh-hk': '2D / 3D動畫',
        'zh-cn': '2D / 3D动画'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154670a620011f306efd6c',
      name: {
        en: 'Video Editing',
        'zh-hk': '影片編輯',
        'zh-cn': '影片编辑'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1546775fd33211d500afc2',
      name: {
        en: 'Video Advertising',
        'zh-hk': '短片廣告',
        'zh-cn': '短片广告'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1546b8caa42262d58a4f1f',
      name: {
        en: 'GIF Animation',
        'zh-hk': 'GIF動畫',
        'zh-cn': 'GIF动画'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1546bf94a16437d9c9f73c',
      name: {
        en: 'Logo Animation',
        'zh-hk': '商標動畫',
        'zh-cn': '商标动画'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15470c5d1270c02d931509',
      name: {
        en: 'Intros & outros',
        'zh-hk': '簡介與特集',
        'zh-cn': '简介与特集'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15471abf96f90c59768df3',
      name: {
        en: 'Subtitle and Caption',
        'zh-hk': '字幕',
        'zh-cn': '字幕'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1547537ec4efa06a7ffe2f',
      name: {
        en: 'Product Photography',
        'zh-hk': '産品攝影',
        'zh-cn': '产品摄影'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154764fe967efb3eb9ffb2',
      name: {
        en: 'Online Courses',
        'zh-hk': '網上課程',
        'zh-cn': '网上课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154790ad3201d43f508c05',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'VIDEO_&_ANIMATION',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154930a37816afb9338d0c',
      name: {
        en: 'Data Entry / Data Processing',
        'zh-hk': '數據輸入/數據處理',
        'zh-cn': '数据输入/数据处理'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'BUSINESS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f15497dd4c271b959bde73b',
      name: {
        en: 'Market Survey',
        'zh-hk': '市場調查',
        'zh-cn': '市场调查'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'BUSINESS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f1549a1655c0cb72b77d532',
      name: {
        en: 'Online Research',
        'zh-hk': '網路研究',
        'zh-cn': '网络研究'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'BUSINESS',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154a4659c2f58a1fd12507',
      name: {
        en: 'Online Fitness Class',
        'zh-hk': '網上健身課程',
        'zh-cn': '网上健身课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'LIFESTYLE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154a8e96d713b6a12737a4',
      name: {
        en: 'Online Cooking Class',
        'zh-hk': '網上烹飪課程',
        'zh-cn': '网上烹饪课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'LIFESTYLE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154a9733723e0c91e58029',
      name: {
        en: 'Online Handicraft Course',
        'zh-hk': '網上手工藝課程',
        'zh-cn': '网上手工艺课程'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'LIFESTYLE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    {
      _id: '5f154ad7091169428da5eb69',
      name: {
        en: 'Other',
        'zh-hk': '其他',
        'zh-cn': '其他'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      _category: 'LIFESTYLE',
      type: 'skill',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5ea95dce2b462f77bf7acc04'
    },
    // fstravel
    {
      _id: '6007ce7751ca9d063513a25e',
      name: {
        en: 'Service charge',
        'zh-hk': '服務費',
        'zh-cn': '服务费'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      platformTypes: ['web', 'memberApp', 'merchantApp', 'admin'],
      isConfigurable: true,
      isMatchCriteria: true,
      isUserInfo: false,
      isActive: true,
      _category: 'STAR_BUS',
      type: 'administrative',
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      icon: null,
      idx: 1,
      workspace: '5fd83be73db74d57b304cb82',
      conditions: []
    },
    {
      _id: '6007cea651ca9d063513a25f',
      name: {
        en: 'Postage',
        'zh-hk': '郵費',
        'zh-cn': '邮费'
      },
      description: {
        en: '',
        'zh-hk': '',
        'zh-cn': ''
      },
      isConfigurable: false,
      isMatchCriteria: true,
      isUserInfo: false,
      type: 'administrative',
      icon: null,
      idx: 1,
      unit: 'boolean',
      unitMeta: {
        default: false
      },
      conditions: [],
      isActive: true,
      workspace: '5fd83be73db74d57b304cb82'
    }
  ]
};
