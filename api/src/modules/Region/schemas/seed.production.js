module.exports = {
  model: 'Regions',
  documents: [
    // Hong Kong
    {
      _id: '5f9f7a3c8c0dfb5222fccbf7',
      code: 'HONG_KONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      ancestors: [],
      parent: null,
      isActive: true,
      isAddress: true,
      __v: 0
    },

    // 3 main regions of Hong Kong
    {
      _id: '5f9f7a52168d9addf5bb3721',
      code: 'KOWLOON',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7'],
      parent: '5f9f7a3c8c0dfb5222fccbf7',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7a8505589d09a0a7874b',
      code: 'NEW_TERRITORIES',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7'],
      parent: '5f9f7a3c8c0dfb5222fccbf7',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7ba356de91cd8cfc1f85',
      code: 'HONG_KONG_ISLAND',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7'],
      parent: '5f9f7a3c8c0dfb5222fccbf7',
      isActive: true,
      isAddress: true,
      __v: 0
    },

    // 18 districts
    // Hong Kong Island
    {
      _id: '5f9f7bd11f1d1dd7686cbc52',
      code: 'CENTRAL_AND_WESTERN_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Central and Western',
        'zh-hk': '中西區',
        'zh-cn': '中西区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7ba356de91cd8cfc1f85'],
      parent: '5f9f7ba356de91cd8cfc1f85',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7bdb93e340359b7f4e2b',
      code: 'EASTERN_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Eastern',
        'zh-hk': '東區',
        'zh-cn': '东区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7ba356de91cd8cfc1f85'],
      parent: '5f9f7ba356de91cd8cfc1f85',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7c04cd7d9a3c73966a96',
      code: 'SOUTHERN_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Southern',
        'zh-hk': '南區',
        'zh-cn': '南区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7ba356de91cd8cfc1f85'],
      parent: '5f9f7ba356de91cd8cfc1f85',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7c1b49dbf83141d15c13',
      code: 'WAN_CHAI_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Wan Chai',
        'zh-hk': '灣仔區',
        'zh-cn': '湾仔区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7'],
      parent: '5f9f7ba356de91cd8cfc1f85',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    // Kowloon
    {
      _id: '5f9f7c54c9a59b884b8dad47',
      code: 'KOWLOON_CITY_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍城區',
        'zh-cn': '九龙城区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a52168d9addf5bb3721'],
      parent: '5f9f7a52168d9addf5bb3721',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7c6fbb7b9a5458b25c55',
      code: 'KWUN_TONG_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kwun Tong',
        'zh-hk': '觀塘區',
        'zh-cn': '观塘区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a52168d9addf5bb3721'],
      parent: '5f9f7a52168d9addf5bb3721',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7ca9c84d7451f3de325d',
      code: 'WONG_TAI_SIN_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Wong Tai Sin',
        'zh-hk': '黃大仙區',
        'zh-cn': '黄大仙区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a52168d9addf5bb3721'],
      parent: '5f9f7a52168d9addf5bb3721',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7ced7a83e42feb21165d',
      code: 'YAU_TSIM_MONG_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Yau Tsim Mong',
        'zh-hk': '油尖旺區',
        'zh-cn': '油尖旺区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a52168d9addf5bb3721'],
      parent: '5f9f7a52168d9addf5bb3721',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7d027a42a65146b5977c',
      code: 'SHAM_SHUI_PO_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Sham Shui Po',
        'zh-hk': '深水埗區',
        'zh-cn': '深水埗区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a52168d9addf5bb3721'],
      parent: '5f9f7a52168d9addf5bb3721',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    // New Territories
    {
      _id: '5f9f7d24209d34f1367188d6',
      code: 'ISLANDS_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Islands',
        'zh-hk': '離島區',
        'zh-cn': '离岛区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7d4ac0e3657dde0958c6',
      code: 'KWAI_TSING_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kwai Tsing',
        'zh-hk': '葵青區',
        'zh-cn': '葵青区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7d9379fd9fde3d85d330',
      code: 'NORTH_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'North',
        'zh-hk': '北區',
        'zh-cn': '北区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7dabd351f75ce39b9a2c',
      code: 'SAI_KUNG_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Sai Kung',
        'zh-hk': '西貢區',
        'zh-cn': '西贡区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7dc0febb55178361c406',
      code: 'SHA_TIN_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Sha Tin',
        'zh-hk': '沙田區',
        'zh-cn': '沙田区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7dd4a712b8455244e186',
      code: '_TAI_PO_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tai Po',
        'zh-hk': '大埔區',
        'zh-cn': '大埔区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7e015e706449212813bb',
      code: 'TSUEN_WAN_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tsuen Wan',
        'zh-hk': '荃灣區',
        'zh-cn': '荃湾区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7e18539bd2a3fe2b7780',
      code: 'TUEN_MUN_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tuen Mun',
        'zh-hk': '屯門區',
        'zh-cn': '屯门区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7e4cecbdbaeb8e4c2950',
      code: 'YUEN_LONG_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Yuen Long',
        'zh-hk': '元朗區',
        'zh-cn': '元朗区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },
    {
      _id: '5f9f7e64c31626d3f1f7f7ff',
      code: 'TSEUNG_KWAN_O_DISTRICT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tseung Kwan O',
        'zh-hk': '將軍澳區',
        'zh-cn': '将军澳区'
      },
      ancestors: ['5f9f7a3c8c0dfb5222fccbf7', '5f9f7a8505589d09a0a7874b'],
      parent: '5f9f7a8505589d09a0a7874b',
      isActive: true,
      isAddress: true,
      __v: 0
    },

    // selectable regions
    // Kowloon
    {
      _id: '5f9f7e745f5503b20553bc72',
      code: 'BEACON_HILL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Beacon Hill',
        'zh-hk': '畢架山',
        'zh-cn': '毕架山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.169193, 22.349561]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f7efcd13ff02d94fe3bc1',
      code: 'CHOI_HUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Choi Hung',
        'zh-hk': '彩虹',
        'zh-cn': '彩虹'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.209002, 22.334963]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f7f04b8264a3d4045d7fc',
      code: 'CITY_UNIVERSITY_OF_HONG_KONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'City University of Hong Kong',
        'zh-hk': '城市大學',
        'zh-cn': '城市大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.172393, 22.336759]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f7f0f6a70b260530903fd',
      code: 'DIAMOND_HILL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Diamond Hill',
        'zh-hk': '鑽石山',
        'zh-cn': '钻石山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.202845, 22.343959]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f7f22c2909a6bd0907efb',
      code: 'FEI_NGO_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Fei Ngo Shan',
        'zh-hk': '飛鵝山',
        'zh-cn': '飞鹅山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.223119, 22.338614]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f801d57f7b10306c13bc3',
      code: 'HONG_KONG_BAPTIST_UNIVERSITY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Baptist University',
        'zh-hk': '浸會大學',
        'zh-cn': '浸会大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.181909, 22.338724]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f802f3dc7ab6d83407569',
      code: 'KAI_TAK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kai Tak',
        'zh-hk': '啟德',
        'zh-cn': '启德'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.199674, 22.330592]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8063b371edd5463d17d9',
      code: 'KOWLOON_CITY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍城',
        'zh-cn': '九龙城'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.190676, 22.330513]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80a276562c31d80b9a5e',
      code: 'KOWLOON_TONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kowloon Tong',
        'zh-hk': '九龍塘',
        'zh-cn': '九龙塘'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.176028, 22.337119]
        }
      }
    },
    {
      _id: '5f9f80b8f3479a35632dbdb4',
      code: 'KWUN_YAM_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwun Yam Shan',
        'zh-hk': '觀音山',
        'zh-cn': '观音山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.119198, 22.427012]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80d083940b46e60761f8',
      code: 'LOK_FU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lok Fu',
        'zh-hk': '樂富',
        'zh-cn': '乐富'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.188061, 22.336773]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80da9d5c43c855c1c6d2',
      code: 'SAN_PO_KONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'San Po Kong',
        'zh-hk': '新蒲崗',
        'zh-cn': '新蒲岗'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.198975, 22.336305]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80e9dab4d6977fcebdc3',
      code: 'TO_KWA_WAH',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'To Kwa Wah',
        'zh-hk': '土瓜灣',
        'zh-cn': '土瓜湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.18918, 22.316787]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80fdfafd3ce1e2b3fd2c',
      code: 'TSZ_WAN_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tsz Wan Shan',
        'zh-hk': '慈雲山',
        'zh-cn': '慈云山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.202163, 22.34911]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8116b40e6a2ec6de2a43',
      code: 'WANG_TAU_HOM',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wang Tau Hom',
        'zh-hk': '橫頭磡',
        'zh-cn': '横头磡'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.186687, 22.340699]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f812d4388038901cf12cc',
      code: 'WANG_TAI_SIN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wong Tai Sin',
        'zh-hk': '黃大仙',
        'zh-cn': '黄大仙'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c54c9a59b884b8dad47'
      ],
      parent: '5f9f7c54c9a59b884b8dad47',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.194113, 22.342192]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f813ef817c66bdabd5a1b',
      code: 'KWUN_TONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwun Tong',
        'zh-hk': '觀塘',
        'zh-cn': '观塘'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.224435, 22.311359]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81a8312f85f31c04e8fa',
      code: 'KAI_TAK_CRUISE_TERMINAL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kai Tak Cruise Terminal',
        'zh-hk': '啟德郵輪碼頭',
        'zh-cn': '启德邮轮码头'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.213819, 22.306121]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81be05008c6e6852684e',
      code: 'KOWLOON_BAY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kowloon Bay',
        'zh-hk': '九龍灣',
        'zh-cn': '九龙湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.209033, 22.325615]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81d4466a29e1678a4dfa',
      code: 'LAM_TIN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lam Tin',
        'zh-hk': '藍田',
        'zh-cn': '蓝田'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.238496, 22.310262]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81ddf2a2f07e6157f44b',
      code: 'NGAU_TAU_KOK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ngau Tau Kok',
        'zh-hk': '牛頭角',
        'zh-cn': '牛头角'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.218771, 22.321293]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81eb37508d755285ace9',
      code: 'SAU_MAU_PING',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sau Mau Ping',
        'zh-hk': '秀茂坪',
        'zh-cn': '秀茂坪'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.231881, 22.319801]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81feaba33753915eddba',
      code: 'SUN_LEE_ESTATE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sun Lee Estate',
        'zh-hk': '順利邨',
        'zh-cn': '顺利村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.225924, 22.331665]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f820d806a9d8a4dd452c6',
      code: 'TSEUNG_KWAN_O_CHINESE_PERMANENT_CEMETERY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tseung Kwan O Chinese Permanent Cemetery',
        'zh-hk': '將軍澳墳場',
        'zh-cn': '将军澳坟场'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.248031, 22.296509]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8220731c528d28491d59',
      code: 'YAU_TONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Yau Tong',
        'zh-hk': '油塘',
        'zh-cn': '油塘'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b25c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b25c55',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.236988, 22.297877]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8236a91550e3f90ad77c',
      code: 'CALDECOTT_HILL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Caldecott Hill',
        'zh-hk': '郝德傑山',
        'zh-cn': '郝德杰山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.149834, 22.344909]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f827360bd11b3f479721e',
      code: 'CHEUNG_SHA_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Cheung Sha Wan',
        'zh-hk': '長沙灣',
        'zh-cn': '长沙湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.153335, 22.334322]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f82cc5f67f97f0a430f64',
      code: 'LAI_CHI_KOK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lai Chi Kok',
        'zh-hk': '荔枝角',
        'zh-cn': '荔枝角'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.147522, 22.337172]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f82e0df8643dd034aeacb',
      code: 'MEI_FOO',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mei Foo',
        'zh-hk': '美孚',
        'zh-cn': '美孚'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.139114, 22.33717]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f82ec27264304246413a9',
      code: 'NAM_CHEONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Nam Cheong',
        'zh-hk': '南昌',
        'zh-cn': '南昌'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.155631, 22.326145]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f82fe42d4f0b067a54751',
      code: 'OLYMPIC',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Olympic',
        'zh-hk': '奧運',
        'zh-cn': '奥运'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.16055, 22.317878]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f830a0d89a616bf285557',
      code: 'SHAM_SHUI_PO',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sham Shui Po',
        'zh-hk': '深水埗',
        'zh-cn': '深水埗'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.159122, 22.329894]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f83191167f961bad0799a',
      code: 'SHEK_KIP_MEI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shek Kip Mei',
        'zh-hk': '石硤尾',
        'zh-cn': '石硖尾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.166966, 22.333323]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f832a4cc596ae8ff39c5d',
      code: 'STONECUTTERS_ISLAND',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Stonecutters Island',
        'zh-hk': '昂船洲',
        'zh-cn': '昂船洲'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.134365, 22.323395]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f833ac3b108faa9cfa2be',
      code: 'TAI_KOK_TSU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Kok Tsu',
        'zh-hk': '大角嘴',
        'zh-cn': '大角嘴'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7d027a42a65146b5977c'
      ],
      parent: '5f9f7d027a42a65146b5977c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.162003, 22.322091]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8349b3805c6bf4a3fe07',
      code: 'YAU_MA_TEI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Yau Ma Tei',
        'zh-hk': '油麻地',
        'zh-cn': '油麻地'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.170608, 22.313168]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f835a3d6aa71f2d4cb627',
      code: 'HO_MAN_TIN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ho Man Tin',
        'zh-hk': '何文田',
        'zh-cn': '何文田'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.178022, 22.317684]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8368693c8dd63b4f1b6e',
      code: 'HUNG_HOM',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hung Hom',
        'zh-hk': '紅磡',
        'zh-cn': '红磡'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.184809, 22.307413]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f83e226d722aa8a685ca2',
      code: 'JORDAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Jordan',
        'zh-hk': '佐敦',
        'zh-cn': '佐敦'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.170187, 22.305123]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f83f1f75acec523a3a6df',
      code: 'MONG_KOK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mong Kok',
        'zh-hk': '旺角',
        'zh-cn': '旺角'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.169515, 22.318871]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8401a4a884753a681fb3',
      code: 'PRINCE_EDWARD',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Prince Edward',
        'zh-hk': '太子',
        'zh-cn': '太子'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.168271, 22.325104]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f840e4c8e95bc76273e8a',
      code: 'THE_HONG_KONG_POLYTECHNIC_UNIVERSITY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'The Hong Kong Polytechnic University',
        'zh-hk': '理工大學',
        'zh-cn': '理工大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.179669, 22.304011]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f841f3ab367ced6660aa1',
      code: 'TSIM_SHA_TSUI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tsim Sha Tsui',
        'zh-hk': '尖沙嘴',
        'zh-cn': '尖沙嘴'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7ced7a83e42feb21165d'
      ],
      parent: '5f9f7ced7a83e42feb21165d',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.17214, 22.29795]
        }
      },
      __v: 0
    },
    // Hong Kong Island
    {
      _id: '5f9f842aa0942e411e4d772b',
      code: 'CENTRAL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Central',
        'zh-hk': '中環',
        'zh-cn': '中环'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.157275, 22.282701]
        }
      },
      __v: 0
    },
    // New Territories
    {
      _id: '5f9f84391e269e6359f73718',
      code: 'FO_TAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Fo Tan',
        'zh-hk': '火炭',
        'zh-cn': '火炭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.190819, 22.400337]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8446c340debc20314954',
      code: 'HONG_KONG_INTERNATION_AIRPORT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Internation Airport',
        'zh-hk': '機場',
        'zh-cn': '机场'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.919854, 22.322022]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f872d4b718c0593c29489',
      code: 'TUNG_CHUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tung Chung',
        'zh-hk': '東涌',
        'zh-cn': '东涌'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.947074, 22.290106]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f876b347f886c8cde93d7',
      code: 'ASIA_WORLD_EXPO',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Asia World-Expo',
        'zh-hk': '博覽館',
        'zh-cn': '博览馆'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.943312, 22.32183]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8784fcef66cc5cf291a0',
      code: 'DISCOVERY_BAY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Discovery Bay',
        'zh-hk': '愉景灣',
        'zh-cn': '愉景湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.011807, 22.294069]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f878fd65c67aa667e2ea5',
      code: 'HONG_KONG_DISNEYLAND',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Disneyland',
        'zh-hk': '迪士尼樂園',
        'zh-cn': '迪士尼乐园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.041296, 22.31318]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f87f079ef0fe033611688',
      code: 'HONG_KONG_ZHUHAI_MACAU_BRIDGE_BORDER',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong-Zhuhai-Macau Bridge Border',
        'zh-hk': '機場人工島',
        'zh-cn': '机场人工岛'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.041296, 22.31318]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f87e742378d05c569a1c3',
      code: 'MA_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ma Wan',
        'zh-hk': '馬灣',
        'zh-cn': '马湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.05926, 22.351182]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f87ddcae9d1cb9b9aa737',
      code: 'SIU_HO_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Siu Ho Wan',
        'zh-hk': '小蠔灣',
        'zh-cn': '小蚝湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d24209d34f1367188d6'
      ],
      parent: '5f9f7d24209d34f1367188d6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.997817, 22.315353]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f87d5ea567e6b2b3d79f9',
      code: 'KWAI_CHUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwai Chung',
        'zh-hk': '葵涌',
        'zh-cn': '葵涌'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.131114, 22.361526]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f884af7861e90b517271a',
      code: 'TUSEN_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tusen Wan',
        'zh-hk': '荃灣',
        'zh-cn': '荃湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.106371, 22.377074]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8859dcbf24f64c231356',
      code: 'SHAM_TSENG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sham Tseng',
        'zh-hk': '深井',
        'zh-cn': '深井'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.058981, 22.368014]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8862474cdce8271616db',
      code: 'KWAI_TSING_CONTAINER_TERMINAL_1-8',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwai Tsing Container Terminal 1-8',
        'zh-hk': '貨櫃碼頭1-8號',
        'zh-cn': '货柜码头1-8号'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.124746, 22.345396]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8871ac65d79252d63245',
      code: 'KWAI_TSING_CONTAINER_TERMINAL_9',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwai Tsing Container Terminal 9',
        'zh-hk': '貨櫃碼頭9號',
        'zh-cn': '货柜码头9号'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.113416, 22.333419]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f887ebd3dbd81a9625fac',
      code: 'LAI_KING',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lai King',
        'zh-hk': '荔景',
        'zh-cn': '荔景'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.127905, 22.348514]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8892a1fc166ff0f110f9',
      code: 'LEI_MUK_SHUE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lei Muk Shue',
        'zh-hk': '梨木樹',
        'zh-cn': '梨木树'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.135627, 22.37878]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f88ae48047fc3da1f02ad',
      code: 'LO_WAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lo Wai',
        'zh-hk': '老圍',
        'zh-cn': '老围'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.136492, 22.384782]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f88c1ca4c9d7cd07ffe24',
      code: 'MUK_MIN_HA_TSUEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Muk Min Ha Tsuen',
        'zh-hk': '木棉下村',
        'zh-cn': '木棉下村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.118433, 22.379016]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f88cabf299600f80dc5f8',
      code: 'SHEK_LEI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shek Lei',
        'zh-hk': '石籬',
        'zh-cn': '石篱'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.138378, 22.365446]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f88daa2e67dc6effc8acd',
      code: 'SHING_MUN_RESERVOIR_BARBECUE_AREA',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shing Mun Reservoir Barbecue Area',
        'zh-hk': '城門水塘燒烤場',
        'zh-cn': '城门水塘烧烤场'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.144451, 22.37993]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f88e6ba061b478fb43042',
      code: 'SHING_MUN_RESERVOIR_GATE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shing Mun Reservoir Gate',
        'zh-hk': '城門水塘閘口',
        'zh-cn': '城门水塘闸口'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.143936, 22.386991]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f88f5ea9a6f6d8eade8ca',
      code: 'TAI_MO_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Mo Shan',
        'zh-hk': '大帽山',
        'zh-cn': '大帽山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.138036, 22.409798]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8904de995405336ac448',
      code: 'TING_KAU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ting Kau',
        'zh-hk': '汀九',
        'zh-cn': '汀九'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.073447, 22.379389]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8913adb9be45bf7985cd',
      code: 'TSING_YI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tsing Yi',
        'zh-hk': '青衣',
        'zh-cn': '青衣'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.102108, 22.34912]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f891e48d1e25fd765853e',
      code: 'TSING_YI_SAI_TSO_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tsing Yi Sai Tso Wan',
        'zh-hk': '青衣西草灣',
        'zh-cn': '青衣西草湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.093168, 22.34126]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8930c97681c7865c7e4c',
      code: 'TSO_KUNG_TAM_OUTDOOR_RECREATION_CENTRE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tso Kung Tam Outdoor Recreation Centre',
        'zh-hk': '曹公潭戶外康樂中心',
        'zh-cn': '曹公潭户外康乐中心'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.106059, 22.386374]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f89427dbe215933a6a3bf',
      code: 'WONDERLAND_VILLAS',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wonderland Villas',
        'zh-hk': '華景山莊',
        'zh-cn': '华景山庄'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d4ac0e3657dde0958c6'
      ],
      parent: '5f9f7d4ac0e3657dde0958c6',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.135697, 22.353906]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8952c04ea54d6b234ade',
      code: 'FANLING',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Fanling',
        'zh-hk': '粉嶺',
        'zh-cn': '粉岭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.14164, 22.492753]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f89b6abb39523236a9a75',
      code: 'HONG_KONG_GOLF_CLUB',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Golf Club',
        'zh-hk': '粉嶺高爾夫球會',
        'zh-cn': '粉岭高尔夫球会'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.120934, 22.496556]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f89c42e3512c88eca6959',
      code: 'KAU_LUNG_HANG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kau Lung Hang',
        'zh-hk': '九龍坑',
        'zh-cn': '九龙坑'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.15327, 22.485985]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f89d5532b0aaaea94d882',
      code: 'KWAN_TEI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwan Tei',
        'zh-hk': '軍地',
        'zh-cn': '军地'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.163526, 22.506552]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b104206a574c8f5755a',
      code: 'KWU_TUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwu Tung',
        'zh-hk': '古洞',
        'zh-cn': '古洞'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.100361, 22.504818]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b22a73f5677d0d05759',
      code: 'LOK_MA_CHAU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lok Ma Chau',
        'zh-hk': '落馬洲',
        'zh-cn': '落马洲'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.082011, 22.511296]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b2db1b4079461ca6f06',
      code: 'LUNG_SHAN_TAMPLE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lung Shan Tample',
        'zh-hk': '龍山寺',
        'zh-cn': '龙山寺'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.156934, 22.497539]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b42ad688459ce31f63a',
      code: 'PAT_SIN_LENG_COUNTRY_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Pat Sin Leng Country Park',
        'zh-hk': '八仙嶺',
        'zh-cn': '八仙岭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.216624, 22.484443]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b55d47d720a49c56106',
      code: 'PING_CHE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ping Che',
        'zh-hk': '坪輋',
        'zh-cn': '坪輋'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.167233, 22.523073]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b6814034b9f47fab250',
      code: 'SANDY_RIDGE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sandy Ridge',
        'zh-hk': '沙嶺',
        'zh-cn': '沙岭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.128355, 22.53004]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b6fdbcdee22f54eceb3',
      code: 'SHA_TAU_KOK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sha Tau Kok',
        'zh-hk': '沙頭角',
        'zh-cn': '沙头角'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.19662, 22.53816]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b8a5534770e6190fd6a',
      code: 'SHEUNG_SHUI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sheung Shui',
        'zh-hk': '上水',
        'zh-cn': '上水'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.126862, 22.508629]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8b9967d6dcd726e8976c',
      code: 'SHEUNG_SHUI_WA_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sheung Shui Wa Shan',
        'zh-hk': '上水華山',
        'zh-cn': '上水华山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.136583, 22.517455]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ba7af28bc7068b379ce',
      code: 'TA_KWU_LING',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ta Kwu Ling',
        'zh-hk': '打鼓嶺',
        'zh-cn': '打鼓岭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.164354, 22.547571]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8bb6aa3b95436506ea5a',
      code: 'TA_SHEK_WU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ta Shek Wu',
        'zh-hk': '打石湖',
        'zh-cn': '打石湖'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.107867, 22.463333]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8bcb093d9ff7024cc50d',
      code: 'TSIU_KENG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tsiu Keng',
        'zh-hk': '蕉徑',
        'zh-cn': '蕉径'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.11131, 22.477357]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8bd82b567f0bc603b9c9',
      code: 'WO_HOP_SHEK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wo Hop Shek',
        'zh-hk': '和合石',
        'zh-cn': '和合石'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.141638, 22.477898]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8be55b01fb621a6605ec',
      code: 'WO_HOP_SHEK_CEMETERY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wo Hop Shek Cemetery',
        'zh-hk': '和合石墳場',
        'zh-cn': '和合石坟场'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7d9379fd9fde3d85d330'
      ],
      parent: '5f9f7d9379fd9fde3d85d330',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.138055, 22.475658]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8bf45b91e053d609fdbf',
      code: 'HIGH_ISLAND_RESERVOIR',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'High Island Reservoir',
        'zh-hk': '萬宜水庫',
        'zh-cn': '万宜水库'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.354964, 22.373541]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8c4474f4358eda233a82',
      code: 'HO_CHUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ho Chung',
        'zh-hk': '蠔涌',
        'zh-cn': '蚝涌'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.24585, 22.3566]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8c63786f2816eb61eea1',
      code: 'HONG_KONG_UNIVERSITY_OF_SCIENCE_AND_TECHNOLOGY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong University of Science and Technology',
        'zh-hk': '科技大學',
        'zh-cn': '科技大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.265412, 22.336628]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8c719c54490a57fa1691',
      code: 'LADY_MACLEHOSE_HOLIDY_VILLAGE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lady MacLehose Holiday Village',
        'zh-hk': '麥理浩夫人度假村',
        'zh-cn': '麦理浩夫人度假村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.321335, 22.408278]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8c7ebfcd9476074e8263',
      code: 'PAK_TAM_CHUNG_GATE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Pak Tam Chung Gate',
        'zh-hk': '北潭涌閘口',
        'zh-cn': '北潭涌闸口'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.319325, 22.397479]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8c89ec0da09d27188d20',
      code: 'PO_TOI_O',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Po Toi O',
        'zh-hk': '布袋澳',
        'zh-cn': '布袋澳'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.295724, 22.276371]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ca0db987e82832e04bc',
      code: 'SAI_KUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sai Kung',
        'zh-hk': '西貢',
        'zh-cn': '西贡'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.329205, 22.416225]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8caf563b896a46e95e9f',
      code: 'SHAP_SZE_HEUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shap Sze Heung',
        'zh-hk': '十四鄉',
        'zh-cn': '十四乡'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.261654, 22.42011]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8cbe2a214e997b1509d3',
      code: 'SILVERSTRAND',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Silverstrand',
        'zh-hk': '銀線灣',
        'zh-cn': '银线湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.277054, 22.326507]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ccfc482d6e3075b302c',
      code: 'TAI_AU_MUN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Au Mun',
        'zh-hk': '大坳門',
        'zh-cn': '大坳门'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.291826, 22.297092]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8cd718158f5f71b002a8',
      code: 'TAI_MONG_TSAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Mong Tsai',
        'zh-hk': '大網仔',
        'zh-cn': '大网仔'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.299032, 22.39337]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8cf7d4764be855eec002',
      code: 'TSENG_LAN_SHUE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tseng Lan Shue',
        'zh-hk': '井欄樹',
        'zh-cn': '井栏树'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.238321, 22.334559]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8d01e1e26498291c7241',
      code: 'WONG_SHEK_PIER',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wong Shek Pier',
        'zh-hk': '黃石碼頭',
        'zh-cn': '黄石码头'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dabd351f75ce39b9a2c'
      ],
      parent: '5f9f7dabd351f75ce39b9a2c',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.337314, 22.435798]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8d1919c64393a7995123',
      code: 'KAM_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kam Shan',
        'zh-hk': '金山',
        'zh-cn': '金山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.150148, 22.368248]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8d6efd59aa71ee221bf5',
      code: 'KAU_TO_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kau To Shan',
        'zh-hk': '九肚山',
        'zh-cn': '九肚山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.202331, 22.411155]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8d7a56dae87cc9c3a842',
      code: 'MA_LIU_SHUI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ma Liu Shui',
        'zh-hk': '馬料水',
        'zh-cn': '马料水'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.206019, 22.421595]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8d879ad96761ffc0fa10',
      code: 'MA_ON_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ma On Shan',
        'zh-hk': '馬鞍山',
        'zh-cn': '马鞍山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.239667, 22.402045]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8d95b02d6924141558f2',
      code: 'MA_ON_SHAN_TSUEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ma On Shan Tsuen',
        'zh-hk': '馬鞍山村',
        'zh-cn': '马鞍山村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.23383, 22.414892]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8d9ddacef77574fa8500',
      code: 'PO_FOOK_MEMORIAL_HALL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Po Fook Memorial Hall',
        'zh-hk': '寶福紀念館',
        'zh-cn': '宝福纪念馆'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.170363, 22.374331]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8dafc3fee9899246de3d',
      code: 'SAI_SHA',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sai Sha',
        'zh-hk': '西沙',
        'zh-cn': '西沙'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.265699, 22.415962]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8dbf2614c7bfa7b0f5ce',
      code: 'SAH_TIN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sha Tin',
        'zh-hk': '沙田',
        'zh-cn': '沙田'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.200774, 22.384531]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8dcc584748c8cbc774a9',
      code: 'SAHTIN_HOSPITAL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shatin Hospital',
        'zh-hk': '沙田醫院',
        'zh-cn': '沙田医院'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.212798, 22.398298]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ddddd6f1e0d8b7f9334',
      code: 'TAI_WAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Wai',
        'zh-hk': '大圍',
        'zh-cn': '大围'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.178454, 22.376972]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8deaa164be0a4a67fee1',
      code: 'TAO_FONG_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tao Fong Shan',
        'zh-hk': '道風山',
        'zh-cn': '道风山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.182089, 22.384419]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8df7d67f18e7fbeece97',
      code: 'THE_CHINESE_UNIVERSITY_OF_HONG_KONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'The Chinese University of Hong Kong',
        'zh-hk': '中文大學',
        'zh-cn': '中文大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.206691, 22.419145]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e034386ca8217a1a0b7',
      code: 'TSENG_TAU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tseng Tau',
        'zh-hk': '井頭',
        'zh-cn': '井头'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.269397, 22.428895]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e0ffc29d60230800485',
      code: 'WU_KAI_SHA',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wu Kai Sha',
        'zh-hk': '烏溪沙',
        'zh-cn': '乌溪沙'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.236425, 22.42949]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e1fe95fa848120f6d14',
      code: 'YUNG_SHUE_O',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Yung Shue O',
        'zh-hk': '榕樹澳',
        'zh-cn': '榕树澳'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dc0febb55178361c406'
      ],
      parent: '5f9f7dc0febb55178361c406',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.293303, 22.428895]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e2b8d34feddce2a80f4',
      code: 'BRIDES_POOL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Brides Pool',
        'zh-hk': '新娘潭',
        'zh-cn': '新娘潭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.239171, 22.503568]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e4d64ff7caa1a16a927',
      code: 'FUNG_YUEN_ROAD',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Fung Yuen Road',
        'zh-hk': '大埔鳳園路',
        'zh-cn': '大埔凤园路'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.180411, 22.462213]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e593f9360bbf6485b44',
      code: 'HONG_LOK_YUEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Lok Yuen',
        'zh-hk': '康樂園',
        'zh-cn': '康乐园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.153989, 22.46223]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e6f78d5d98a4a800ed4',
      code: 'KADOORIE_FARM_AND_BOTANIC_GARDEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kadoorie Farm and Botanic Garden',
        'zh-hk': '嘉道理農場',
        'zh-cn': '嘉道理农场'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.117138, 22.433513]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e7b4e0ee72a858a7696',
      code: 'LUK_KENG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Luk Keng',
        'zh-hk': '鹿頸',
        'zh-cn': '鹿颈'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.213856, 22.521382]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e919097c8de19dc13c3',
      code: 'NG_TUNG_CHAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ng Tung Chai',
        'zh-hk': '梧桐寨',
        'zh-cn': '梧桐寨'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.127663, 22.437429]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8e9dd95fc938bcec6aca',
      code: 'SAM_MUN_TSAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sam Mun Tsai',
        'zh-hk': '三門仔',
        'zh-cn': '三门仔'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.215036, 22.455991]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ea92967cfdf955bb3b5',
      code: 'SEIENCE_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Seience Park',
        'zh-hk': '科學園',
        'zh-cn': '科学园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.210093, 22.427195]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8eb6a03d82711cd5bc66',
      code: 'TAI_MEI_TUK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Mei Tuk',
        'zh-hk': '大尾篤',
        'zh-cn': '大尾笃'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.235093, 22.473934]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ec67327cc5bf3ebf34b',
      code: 'TAI_PO',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Po',
        'zh-hk': '大埔',
        'zh-cn': '大埔'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.163847, 22.449399]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ed44beb1b5542e13f97',
      code: 'TAI_PO_INDUSTRIAL_ESTATE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Po Industrial Estate',
        'zh-hk': '大埔工業邨',
        'zh-cn': '大埔工业村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.185629, 22.457042]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ee05115a5190ecfcba1',
      code: 'TAI_PO_LAM_TSUEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Po Lam Tsuen',
        'zh-hk': '大埔林村',
        'zh-cn': '大埔林村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.128624, 22.451957]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8ef02b34b43a31a979c3',
      code: 'TAI_PO_ROAD_TAI_PO_KAU_SECTION',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Po Road Tai Po Kau Section',
        'zh-hk': '大埔滘',
        'zh-cn': '大埔滘'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.183916, 22.42529]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8efe0bb2df820e3764c6',
      code: 'TAI_PO_WUN_YIU_ROAD',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Po Wun Yiu Road',
        'zh-hk': '大埔碗窰路',
        'zh-cn': '大埔碗窑路'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.163071, 22.430504]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8f0adb49523cfe649fd9',
      code: 'TAI_WO',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Wo',
        'zh-hk': '太和',
        'zh-cn': '太和'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.161489, 22.451386]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8f195c32578295fd1f1e',
      code: 'THE_HONG_KONG_INSTUTUTE_OF_EDUCATION',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'The Hong Kong Institute of Education',
        'zh-hk': '教育學院',
        'zh-cn': '教育学院'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.193095, 22.471024]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8f29e2599b742e825cfd',
      code: 'WU_KAU_TANG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wu Kau Tang',
        'zh-hk': '烏蚊騰',
        'zh-cn': '乌蚊腾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7dd4a712b8455244e186'
      ],
      parent: '5f9f7dd4a712b8455244e186',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.244401, 22.506936]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8f4ccbdc785e07488678',
      code: 'LOHAS_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lohas Park',
        'zh-hk': '日出康城',
        'zh-cn': '日出康城'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e64c31626d3f1f7f7ff'
      ],
      parent: '5f9f7e64c31626d3f1f7f7ff',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.270279, 22.294914]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8f9d3411dbf882e8f204',
      code: 'MA_YAU_TONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ma Yau Tong',
        'zh-hk': '馬游塘',
        'zh-cn': '马游塘'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e64c31626d3f1f7f7ff'
      ],
      parent: '5f9f7e64c31626d3f1f7f7ff',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.244095, 22.322916]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8fbcb3b7c61c16e692e6',
      code: 'TSEUNG_KWAN_O',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tseung Kwan O',
        'zh-hk': '將軍澳',
        'zh-cn': '将军澳'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e64c31626d3f1f7f7ff'
      ],
      parent: '5f9f7e64c31626d3f1f7f7ff',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.259981, 22.308337]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8fca5d40ebb21bcf0e87',
      code: 'TSEUNG_KWAN_O_INDUSTRIAL_ESTATE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tseung Kwan O Industrial Estate',
        'zh-hk': '將軍澳工業邨',
        'zh-cn': '将军澳工业村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e64c31626d3f1f7f7ff'
      ],
      parent: '5f9f7e64c31626d3f1f7f7ff',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.272121, 22.285283]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8fd67aa4392149b6c6ad',
      code: 'BUTTERFIY_BEACH',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Butterfly Beach',
        'zh-hk': '屯門蝴蝶灣',
        'zh-cn': '屯门蝴蝶湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.957247, 22.373767]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f8fe92dd0fc9d81e2d6ce',
      code: 'HUNG_SHUI_KIU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hung Shui Kiu',
        'zh-hk': '洪水橋',
        'zh-cn': '洪水桥'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.997235, 22.4325]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f901067fb91667d7df737',
      code: 'LAM_TEI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lam Tei',
        'zh-hk': '藍地',
        'zh-cn': '蓝地'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.982306, 22.425085]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f901fcad06be9c6e1437f',
      code: 'LINGNAN_UNIVERSITY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lingnan University',
        'zh-hk': '嶺南大學',
        'zh-cn': '岭南大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.981379, 22.411993]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f902e6dcc817665b82257',
      code: 'LUNG_KWU_TAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lung Kwu Tan',
        'zh-hk': '龍鼓灘',
        'zh-cn': '龙鼓滩'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.928952, 22.39631]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f903da56430864d5b4f59',
      code: 'SIU_LAM',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Siu Lam',
        'zh-hk': '小欖',
        'zh-cn': '小榄'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.010239, 22.369489]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9057e01613959c378bd0',
      code: 'TAI_LAM',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Lam',
        'zh-hk': '大欖',
        'zh-cn': '大榄'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.055713, 22.401595]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f906637ebdeb8164c20ec',
      code: 'TUEN_MUN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tuen Mun',
        'zh-hk': '屯門',
        'zh-cn': '屯门'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.970207, 22.398258]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f907968729b0aef6f99e2',
      code: 'TUEN_MUN_RIVER_TRADE_TERMINAL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tuen Mun River Trade Terminal',
        'zh-hk': '屯門內河碼頭',
        'zh-cn': '屯门内河码头'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e18539bd2a3fe2b7780'
      ],
      parent: '5f9f7e18539bd2a3fe2b7780',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.933527, 22.370821]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9086f7d532d442e8f6e8',
      code: 'FAIRVIEW_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Fairview Park',
        'zh-hk': '錦繡花園',
        'zh-cn': '锦绣花园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.045593, 22.479707]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f90ad42b39abdafd1a365',
      code: 'KAM_TIN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kam Tin',
        'zh-hk': '錦田',
        'zh-cn': '锦田'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.060557, 22.449952]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f90c34103affc728fd844',
      code: 'LAU_FAU_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lau Fau Shan',
        'zh-hk': '流浮山',
        'zh-cn': '流浮山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.984618, 22.469202]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f90d1c1fcceae6df4c869',
      code: 'MAI_PO_NATURAL_RESERVE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mai Po Natural Reserve',
        'zh-hk': '米埔',
        'zh-cn': '米埔'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.034045, 22.495567]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f90dc46da88d1a541e7f3',
      code: 'MONG_TSENG_WAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mong Tseng Wai',
        'zh-hk': '輞井圍',
        'zh-cn': '辋井围'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.008635, 22.48203]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f90e9a6235378def817c5',
      code: 'NAM_SANG_WAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Nam Sang Wai',
        'zh-hk': '南生圍',
        'zh-cn': '南生围'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.037828, 22.463011]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f90f70397ee9bed2cf8bc',
      code: 'NIM_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Nim Wan',
        'zh-hk': '稔灣',
        'zh-cn': '稔湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.937545, 22.425979]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9103f97fac091bd82a73',
      code: 'PALM_SPRINGS',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Palm Springs',
        'zh-hk': '加州花園',
        'zh-cn': '加州花园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.053482, 22.485903]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f910d437e999d55e2714b',
      code: 'PAT_HEUNG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Pat Heung',
        'zh-hk': '八鄉',
        'zh-cn': '八乡'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.095901, 22.450453]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f911b2952bdb34c40ed64',
      code: 'PING_SHAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ping Shan',
        'zh-hk': '屏山',
        'zh-cn': '屏山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.008388, 22.441931]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91295240e54d33a592af',
      code: 'SHEK_KONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shek Kong',
        'zh-hk': '石崗',
        'zh-cn': '石岗'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.082244, 22.433168]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9138406f644c3c984d3c',
      code: 'SHEUNG_HA_PAK_NAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sheung/Ha Pak Nai',
        'zh-hk': '上/下白泥',
        'zh-cn': '上/下白泥'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.952264, 22.43528]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9143913577e27305c2a3',
      code: 'TAI_TONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Tong',
        'zh-hk': '大棠',
        'zh-cn': '大棠'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.03309, 22.4192]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9153b35cf876286ca6cd',
      code: 'TAI_TONG_COUNTRY_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Tong Country Park',
        'zh-hk': '大棠郊野公園',
        'zh-cn': '大棠郊野公园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.032142, 22.41601]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f915e031efc8bc1597fe9',
      code: 'TAI_TONG_LYCHEE_VALLEY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Tong Lychee Valley',
        'zh-hk': '荔枝山莊',
        'zh-cn': '荔枝山庄'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.025536, 22.413758]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f916a2321a87ff9665185',
      code: 'TIN_SHUI_WAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tin Shui Wai',
        'zh-hk': '天水圍',
        'zh-cn': '天水围'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.001031, 22.460598]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91777248d2f836e7853e',
      code: 'TONG_YAN_SAN_TSUEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tong Yan San Tsuen',
        'zh-hk': '唐人新村',
        'zh-cn': '唐人新村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.010357, 22.436229]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9186f834d35b67994892',
      code: 'YUEN_LONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Yuen Long',
        'zh-hk': '元朗',
        'zh-cn': '元朗'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7a8505589d09a0a7874b',
        '5f9f7e4cecbdbaeb8e4c2950'
      ],
      parent: '5f9f7e4cecbdbaeb8e4c2950',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.028115, 22.446287]
        }
      },
      __v: 0
    },
    // HONG KONG ISLANDS
    {
      _id: '5f9f9194112ba5780e95a1c7',
      code: 'CENTRAL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Central',
        'zh-hk': '中環',
        'zh-cn': '中环'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.160462, 22.282198]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91ac658df141ff0529bb',
      code: 'ADMIRALTY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Admiralty',
        'zh-hk': '金鐘',
        'zh-cn': '金钟'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.165615, 22.280222]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91be5c448007add3cac9',
      code: 'KENNEDY_TOWN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kennedy Town',
        'zh-hk': '堅尼地城',
        'zh-cn': '坚尼地城'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.128155, 22.282524]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91d08c431e8cc2ce30da',
      code: 'MIN_LEVELS_CENTRAL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mid-Levels Central',
        'zh-hk': '中半山',
        'zh-cn': '中半山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.155353, 22.275626]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91ddfd17a00c22f62589',
      code: 'MIN_LEVELS_WEST',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mid-Levels West',
        'zh-hk': '西半山',
        'zh-cn': '西半山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.144024, 22.281424]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91eb191b727078badc54',
      code: 'MOUNT_DAVIS',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mount Davis',
        'zh-hk': '摩星嶺',
        'zh-cn': '摩星岭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.122786, 22.278368]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f91f8cab847c89fa7b65c',
      code: 'SAI_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sai Wan',
        'zh-hk': '西環',
        'zh-cn': '西环'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.135189, 22.286195]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9202cb18740d59a6c22d',
      code: 'SAI_YING_PUN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sai Ying Pun',
        'zh-hk': '西營盤',
        'zh-cn': '西营盘'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.141796, 22.287648]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f922192fd86e7cfca234a',
      code: 'SHEUNG_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sheung Wan',
        'zh-hk': '上環',
        'zh-cn': '上环'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.149964, 22.287383]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9216683a75826e014325',
      code: 'THE_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'The Peak',
        'zh-hk': '山頂',
        'zh-cn': '山顶'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.145515, 22.277451]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92300e639ccc503d6a5e',
      code: 'THE_UNIVERSITY_OF_HONG_KONG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'The University of Hong Kong',
        'zh-hk': '香港大學',
        'zh-cn': '香港大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bd11f1d1dd7686cbc52'
      ],
      parent: '5f9f7bd11f1d1dd7686cbc52',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.137176, 22.283843]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9243e5d94d5b6b842cd3',
      code: 'BRAEMAR_HILL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Braemar Hill',
        'zh-hk': '寶馬山',
        'zh-cn': '宝马山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.198108, 22.290811]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92501411ccf42ba41642',
      code: 'CAPE_COLLINSOON_ROAD',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Cape Collinson Road',
        'zh-hk': '歌連臣角',
        'zh-cn': '歌连臣角'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.253268, 22.259094]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f925d76597f8468918f2b',
      code: 'CHAI_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Chai Wan',
        'zh-hk': '柴灣',
        'zh-cn': '柴湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.240003, 22.267066]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f926825960e74a8d8f214',
      code: 'FORTRESS_HILL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Fortress  Hill',
        'zh-hk': '砲台山',
        'zh-cn': '炮台山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.194689, 22.287828]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9279bfcdc2585580649f',
      code: 'HENG_FA_CHUEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Heng Fa Chuen',
        'zh-hk': '杏花邨',
        'zh-cn': '杏花村'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.240501, 22.27828]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f929c97ae919b04ebdfce',
      code: 'HONG_KONG_SHUE_YAN_UNIVERSITY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Shue Yan University',
        'zh-hk': '樹仁大學',
        'zh-cn': '树仁大学'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.197783, 22.286417]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92aad6845189517e687d',
      code: 'NORTH_POINT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'North Point',
        'zh-hk': '北角',
        'zh-cn': '北角'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.197352, 22.290883]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92b891bbe150bcedbf71',
      code: 'QUARRY_BAY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Quarry Bay',
        'zh-hk': '鰂魚涌',
        'zh-cn': '鲗鱼涌'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.214664, 22.287759]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92c81f5ce3926dbe40ac',
      code: 'SAI_WAN_HO',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sai Wan Ho',
        'zh-hk': '西灣河',
        'zh-cn': '西湾河'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.220659, 22.281884]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92d6b05e87b10f91e33e',
      code: 'SHAU_KEI_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shau Kei Wan',
        'zh-hk': '筲箕灣',
        'zh-cn': '筲箕湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.226947, 22.277534]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92e5153655ac99581556',
      code: 'SIU_SAI_WAN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Siu Sai Wan',
        'zh-hk': '小西灣',
        'zh-cn': '小西湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.249203, 22.263658]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f92f34aff8576f7688294',
      code: 'TAI_KOO',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Koo',
        'zh-hk': '太古',
        'zh-cn': '太古'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.216136, 22.287147]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93045c9d37c6691ecf16',
      code: 'TAI_TAM_ROAD_CHAI_WAN_SECTION',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Tam Road Chai Wan Section',
        'zh-hk': '大潭道 (柴灣段)',
        'zh-cn': '大潭道 (柴湾段)'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7bdb93e340359b7f4e2b'
      ],
      parent: '5f9f7bdb93e340359b7f4e2b',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.233398, 22.271496]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93163a8044c775580a45',
      code: 'ABERDEEN',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Aberdeen',
        'zh-hk': '香港仔',
        'zh-cn': '香港仔'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.156436, 22.251009]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93213b581c2e8b2f09df',
      code: 'AP_LEI_CHAU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ap Lei Chau',
        'zh-hk': '鴨脷洲',
        'zh-cn': '鸭脷洲'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.152936, 22.242575]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f932cfbcce1dca1bd5c4d',
      code: 'BRICK_HILL',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Brick Hill',
        'zh-hk': '南朗山',
        'zh-cn': '南朗山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.172175, 22.243464]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f933918199210da8bcf92',
      code: 'CAPE_D_AGUILAR',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Cape D_Aguilar',
        'zh-hk': '鶴咀',
        'zh-cn': '鹤咀'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.26671, 22.2175]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9349c4a29c08cd3f4c4c',
      code: 'CHUNG_HOM_KOK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Chung Hom Kok',
        'zh-hk': '春坎角',
        'zh-cn': '春坎角'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.202791, 22.21682]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9358669f8fa37ea8d31b',
      code: 'CYBERPORT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Cyberport',
        'zh-hk': '數碼港',
        'zh-cn': '数码港'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.130721, 22.262442]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9364f849ae0ece474c92',
      code: 'DEEP_WATER_BAY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Deep Water Bay',
        'zh-hk': '深水灣',
        'zh-cn': '深水湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.185387, 22.249438]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f936fc7b79df5daec7505',
      code: 'HONG_KONH_PARKVIEW',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Parkview',
        'zh-hk': '陽明山莊',
        'zh-cn': '阳明山庄'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.198497, 22.258131]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f937d774b98ff985ddfc7',
      code: 'OCEAN_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ocean Park',
        'zh-hk': '海洋公園',
        'zh-cn': '海洋公园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.170281, 22.23529]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f938a189ceb64aee0f615',
      code: 'POK_FU_LAM',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Pok Fu Lam',
        'zh-hk': '薄扶林',
        'zh-cn': '薄扶林'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.136794, 22.260483]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f939549ee7b9df18ba3a2',
      code: 'REPULSE_BAY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Repulse Bay',
        'zh-hk': '淺水灣',
        'zh-cn': '浅水湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.194891, 22.236374]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93a28cbbfa9bdb9472a1',
      code: 'SHEK_O',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Shek O',
        'zh-hk': '石澳',
        'zh-cn': '石澳'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.242683, 22.23676]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93b0932e562c2f49d096',
      code: 'STANLEY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Stanley',
        'zh-hk': '赤柱',
        'zh-cn': '赤柱'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.213458, 22.218933]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93bca0a2c29c99ec5193',
      code: 'TAI_TAM',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Tam',
        'zh-hk': '大潭',
        'zh-cn': '大潭'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.210894, 22.261029]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93c7e07d715d159ef307',
      code: 'WONG_CHUK_HANG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wong Chuk Hang',
        'zh-hk': '黃竹坑',
        'zh-cn': '黄竹坑'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c04cd7d9a3c73966a96'
      ],
      parent: '5f9f7c04cd7d9a3c73966a96',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.170808, 22.241508]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93d5540805382a916f5e',
      code: 'CAUSEWAY_BAY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Causeway Bay',
        'zh-hk': '銅鑼灣',
        'zh-cn': '铜锣湾'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.188286, 22.281712]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93e1f962f1492849f6cf',
      code: 'HAPPY_VALLEY',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Happy Valley',
        'zh-hk': '跑馬地',
        'zh-cn': '跑马地'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.184146, 22.269803]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93f1933d173c0026da32',
      code: 'HONG_KONG_CONVENTION_AND_EXHIBITION_CENTRE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Convention and Exhibition Centre',
        'zh-hk': '香港會議展覽中心',
        'zh-cn': '香港会议展览中心'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.173155, 22.283466]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f93fd027578681f037f0d',
      code: 'JARDINES_LOOKOUT',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Jardines Lookout',
        'zh-hk': '渣甸山',
        'zh-cn': '渣甸山'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.200213, 22.267612]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f940bccfe9e280dfc5628',
      code: 'KENNEDY_ROAD',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kennedy Road',
        'zh-hk': '堅尼地道',
        'zh-cn': '坚尼地道'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.16602, 22.275572]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f941db4cc735de2d9c72a',
      code: 'MOUNT_BUTLER_FIRING_RANGE',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Mount Butler Firing Range',
        'zh-hk': '畢拉山靶場',
        'zh-cn': '毕拉山靶场'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.211246, 22.268419]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9429019123ff4a57815f',
      code: 'STUBBS_ROAD',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Stubbs Road',
        'zh-hk': '司徒拔道',
        'zh-cn': '司徒拔道'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.178498, 22.269973]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f9434d6e483d85e68f878',
      code: 'TAI_HANG',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tai Hang',
        'zh-hk': '大坑',
        'zh-cn': '大坑'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.193634, 22.276869]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f94431889606ef10f66b9',
      code: 'TIN_HAU',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tin Hau',
        'zh-hk': '天后',
        'zh-cn': '天后'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.192541, 22.282978]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f944f49fa9e94eb4ac30f',
      code: 'VICTORIA_PARK',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Victoria Park',
        'zh-hk': '維多利亞公園',
        'zh-cn': '维多利亚公园'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.188729, 22.282654]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f945d87998aa36696d20d',
      code: 'WAN_CHAI',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wan Chai',
        'zh-hk': '灣仔',
        'zh-cn': '湾仔'
      },
      ancestors: [
        '5f9f7a3c8c0dfb5222fccbf7',
        '5f9f7ba356de91cd8cfc1f85',
        '5f9f7c1b49dbf83141d15c13'
      ],
      parent: '5f9f7c1b49dbf83141d15c13',
      isActive: true,
      isAddress: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.174647, 22.277499]
        }
      },
      __v: 0
    },

    // SJS
    // Hong Kong
    {
      _id: '5f9fa9b7262f8563b9d0a898',
      code: 'HONG_KONG',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      ancestors: [],
      parent: null,
      isActive: true
    },

    // 4 main regions of Hong Kong
    {
      _id: '5f9faa8aee462e9b776bf8c0',
      code: 'HONG_KONG_ISLAND',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898'],
      parent: '5f9fa9b7262f8563b9d0a898',
      isActive: true
    },
    {
      _id: '5f9fa9f5ef2938d1ab4e2033',
      code: 'KOWLOON',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898'],
      parent: '5f9fa9b7262f8563b9d0a898',
      isActive: true
    },
    {
      _id: '5f9fa9fc1426e67d49107fe8',
      code: 'NEW_TERRITORIES',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898'],
      parent: '5f9fa9b7262f8563b9d0a898',
      isActive: true
    },
    {
      _id: '5f9fab18804ba4f08a9ee140',
      code: 'ISLANDS',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Islands',
        'zh-hk': '離島',
        'zh-cn': '離島'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898'],
      parent: '5f9fa9b7262f8563b9d0a898',
      isActive: true
    },

    // Districts
    // Hong Kong Island
    {
      _id: '5f9fae139e76bb630c05a5ec',
      code: 'CENTRAL_AND_WESTERN_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Central and Western',
        'zh-hk': '中西區',
        'zh-cn': '中西区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9faa8aee462e9b776bf8c0'],
      parent: '5f9faa8aee462e9b776bf8c0',
      isActive: true
    },
    {
      _id: '5f9fae1941c8c388856de880',
      code: 'EASTERN_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Eastern',
        'zh-hk': '東區',
        'zh-cn': '东区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9faa8aee462e9b776bf8c0'],
      parent: '5f9faa8aee462e9b776bf8c0',
      isActive: true
    },
    {
      _id: '5f9fae206713dcafe8ca39f4',
      code: 'SOUTHERN_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Southern',
        'zh-hk': '南區',
        'zh-cn': '南区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9faa8aee462e9b776bf8c0'],
      parent: '5f9faa8aee462e9b776bf8c0',
      isActive: true
    },
    // Kowloon
    {
      _id: '5f9fae2793c20f4d29cdd096',
      code: 'KOWLOON_EAST',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍東',
        'zh-cn': '九龙東'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9fa9f5ef2938d1ab4e2033'],
      parent: '5f9fa9f5ef2938d1ab4e2033',
      isActive: true
    },
    {
      _id: '5faa581878e3be6b44176adc',
      code: 'KOWLOON_WEST',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kowloon West',
        'zh-hk': '九龍西',
        'zh-cn': '九龙西'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9fa9f5ef2938d1ab4e2033'],
      parent: '5f9fa9f5ef2938d1ab4e2033',
      isActive: true
    },
    // New Territories
    {
      _id: '5f9fae2d55cd558576e699ed',
      code: 'NT_NORTH',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'NT North',
        'zh-hk': '新界北',
        'zh-cn': '新界北'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9fa9fc1426e67d49107fe8'],
      parent: '5f9fa9fc1426e67d49107fe8',
      isActive: true
    },
    {
      _id: '5f9fae34a1316391b6c18eb2',
      code: 'NT_WEST',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'NT West',
        'zh-hk': '新界西',
        'zh-cn': '新界西'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9fa9fc1426e67d49107fe8'],
      parent: '5f9fa9fc1426e67d49107fe8',
      isActive: true
    },
    {
      _id: '5f9fae3a2faf1ccd8c80a234',
      code: 'NT_EAST',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'NT East',
        'zh-hk': '新界東',
        'zh-cn': '新界東'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9fa9fc1426e67d49107fe8'],
      parent: '5f9fa9fc1426e67d49107fe8',
      isActive: true
    },
    // Islands
    {
      _id: '5f9fae3f8dbaee741b13a0a4',
      code: 'ISLANDS_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Islands',
        'zh-hk': '離島區',
        'zh-cn': '离岛区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0a898', '5f9fab18804ba4f08a9ee140'],
      parent: '5f9fab18804ba4f08a9ee140',
      isActive: true
    },

    // selectable regions (neighborhood)
    // Hong Kong Island
    {
      _id: '5f9faf2e3a11a134583f6696',
      code: 'CENTRAL',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Central',
        'zh-hk': '中環',
        'zh-cn': '中环'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9faa8aee462e9b776bf8c0',
        '5f9fae139e76bb630c05a5ec'
      ],
      parent: '5f9fae139e76bb630c05a5ec',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.157275, 22.282701]
        }
      }
    },
    {
      _id: '5f9fafd1a5b6da029d9b8a6f',
      code: 'QUARRY_BAY',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Quarry Bay',
        'zh-hk': '鰂魚涌',
        'zh-cn': '鲗鱼涌'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9faa8aee462e9b776bf8c0',
        '5f9fae1941c8c388856de880'
      ],
      parent: '5f9fae1941c8c388856de880',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.214664, 22.287759]
        }
      },
      __v: 0
    },
    {
      _id: '5f9fb0902f64850c8d301085',
      code: 'ABERDEEN',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Aberdeen',
        'zh-hk': '香港仔',
        'zh-cn': '香港仔'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9faa8aee462e9b776bf8c0',
        '5f9fae206713dcafe8ca39f4'
      ],
      parent: '5f9fae206713dcafe8ca39f4',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.156436, 22.251009]
        }
      }
    },
    {
      _id: '5f9fb08d0e59564d760c8bf1',
      code: 'AP_LEI_CHAU',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ap Lei Chau',
        'zh-hk': '鴨脷洲',
        'zh-cn': '鸭脷洲'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9faa8aee462e9b776bf8c0',
        '5f9fae206713dcafe8ca39f4'
      ],
      parent: '5f9fae206713dcafe8ca39f4',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.152936, 22.242575]
        }
      }
    },
    // Kowloon East
    {
      _id: '5f9fb0884a87ba75a1008cee',
      code: 'KWUN_TONG',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwun Tong',
        'zh-hk': '觀塘',
        'zh-cn': '观塘'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9f7a52168d9addf5bb3721',
        '5f9fae2793c20f4d29cdd096'
      ],
      parent: '5f9fae2793c20f4d29cdd096',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.224435, 22.311359]
        }
      }
    },
    {
      _id: '5faa5f14fe545ae6af2ad2a2',
      code: 'SHAM_SHUI_PO',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sham Shui Po',
        'zh-hk': '深水埗',
        'zh-cn': '深水埗'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9fa9f5ef2938d1ab4e2033',
        '5faa581878e3be6b44176adc'
      ],
      parent: '5faa581878e3be6b44176adc',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.159122, 22.329894]
        }
      }
    },
    // New Territories
    {
      _id: '5f9fb1f86ef90e1a4a22c790',
      code: 'SHATIN',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sha Tin',
        'zh-hk': '沙田',
        'zh-cn': '沙田'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9fa9fc1426e67d49107fe8',
        '5f9fae2793c20f4d29cdd096'
      ],
      parent: '5f9fae2793c20f4d29cdd096',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.200774, 22.384531]
        }
      }
    },
    {
      _id: '5f9fb2676bd102b7cf037aa0',
      code: 'TUEN_MUN',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tuen Mun',
        'zh-hk': '屯門',
        'zh-cn': '屯门'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9fa9fc1426e67d49107fe8',
        '5f9fae34a1316391b6c18eb2'
      ],
      parent: '5f9fae34a1316391b6c18eb2',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.970207, 22.398258]
        }
      }
    },
    // Islands
    {
      _id: '5f9fb2dac024f3a7a171f0ce',
      code: 'TUNG_CHUNG',
      workspace: '5ea95dce2b462f77bf7acc04',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tung Chung',
        'zh-hk': '東涌',
        'zh-cn': '東涌'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0a898',
        '5f9fab18804ba4f08a9ee140',
        '5f9fae3f8dbaee741b13a0a4'
      ],
      parent: '5f9fae3f8dbaee741b13a0a4',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.060557, 22.449952]
        }
      }
    },
    // fstravel start
    {
      _id: '5ff2e82b6f7bf969ba8183de',
      code: 'LONDON',
      workspace: '5fd83be73db74d57b304cb82',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'London',
        'zh-hk': '倫敦',
        'zh-cn': '伦敦'
      },
      filemeta: '5ff2f382faf1b184c8f3df06',
      ancestors: [],
      parent: null,
      isActive: true,
      isAddress: false
    },
    {
      _id: '5ff2e8023eed8d9cd84298db',
      code: 'TOKYO',
      workspace: '5fd83be73db74d57b304cb82',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Tokyo',
        'zh-hk': '東京',
        'zh-cn': '东京'
      },
      filemeta: '5ff2f3903e7b8c226b3be868',
      ancestors: [],
      parent: null,
      isActive: true,
      isAddress: false
    },
    {
      _id: '5ff2e821eec052a0e098d0d9',
      code: 'SEOUL',
      workspace: '5fd83be73db74d57b304cb82',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Seoul',
        'zh-hk': '首爾',
        'zh-cn': '首尔'
      },
      filemeta: '5ff2f387a6359ae7027d285a',
      ancestors: [],
      parent: null,
      isActive: true,
      isAddress: false
    },
    {
      _id: '5ff2e826620f198a725e262a',
      code: 'PARIS',
      workspace: '5fd83be73db74d57b304cb82',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Paris',
        'zh-hk': '巴黎',
        'zh-cn': '巴黎'
      },
      filemeta: '5ff2f38c330adb2b52d1a4f8',
      ancestors: [],
      parent: null,
      isActive: true,
      isAddress: false
    },
    {
      _id: '60010215b7241c0bf5785760',
      code: 'HONG_KONG',
      workspace: '5fd83be73db74d57b304cb82',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      ancestors: [],
      isActive: true,
      isAddress: true,
      parent: null
    },
    {
      _id: '60010252b7241c0bf5785761',
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['60010215b7241c0bf5785760'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010215b7241c0bf5785760',
      code: 'HONG_KONG_ISLAND'
    },
    {
      _id: '6001028fb7241c0bf5785762',
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['60010215b7241c0bf5785760'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010215b7241c0bf5785760',
      code: 'KOWLOON'
    },
    {
      _id: '600102aab7241c0bf5785763',
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['60010215b7241c0bf5785760'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010215b7241c0bf5785760',
      code: 'NEW_TERRITORIES'
    },
    {
      _id: '60010315b7241c0bf5785764',
      name: {
        en: 'Islands',
        'zh-hk': '離島',
        'zh-cn': '离岛'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['60010215b7241c0bf5785760'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010215b7241c0bf5785760',
      code: 'ISLANDS'
    },
    {
      _id: '60010354b7241c0bf5785765',
      name: {
        en: 'Central and Western',
        'zh-hk': '中西區',
        'zh-cn': '中西区'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '60010252b7241c0bf5785761'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010252b7241c0bf5785761',
      code: 'CENTRAL_AND_WESTERN_DISTRICT'
    },
    {
      _id: '60010378b7241c0bf5785766',
      name: {
        en: 'Eastern',
        'zh-hk': '東區',
        'zh-cn': '东区'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '60010252b7241c0bf5785761'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010252b7241c0bf5785761',
      code: 'EASTERN_DISTRICT'
    },
    {
      _id: '60010390b7241c0bf5785767',
      name: {
        en: 'Southern',
        'zh-hk': '南區',
        'zh-cn': '南区'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '60010252b7241c0bf5785761'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010252b7241c0bf5785761',
      code: '东区'
    },
    {
      _id: '600103b7b7241c0bf5785768',
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍東',
        'zh-cn': '九龙東'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '6001028fb7241c0bf5785762'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '6001028fb7241c0bf5785762',
      code: 'KOWLOON_EAST'
    },
    {
      _id: '600103d0b7241c0bf5785769',
      name: {
        en: 'Kowloon West',
        'zh-hk': '九龍西',
        'zh-cn': '九龙西'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '6001028fb7241c0bf5785762'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '6001028fb7241c0bf5785762',
      code: 'KOWLOON_WEST'
    },
    {
      _id: '600103efb7241c0bf578576a',
      name: {
        en: 'NT North',
        'zh-hk': '新界北',
        'zh-cn': '新界北'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '600102aab7241c0bf5785763'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '600102aab7241c0bf5785763',
      code: 'NT_NORTH'
    },
    {
      _id: '60010412b7241c0bf578576b',
      name: {
        en: 'NT West',
        'zh-hk': '新界西',
        'zh-cn': '新界西'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '600102aab7241c0bf5785763'],
      isActive: true,
      isAddress: true,
      idx: 1,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '600102aab7241c0bf5785763',
      code: 'NT_WEST'
    },
    {
      _id: '60010430b7241c0bf578576c',
      name: {
        en: 'NT East',
        'zh-hk': '新界東',
        'zh-cn': '新界东'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '600102aab7241c0bf5785763'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '600102aab7241c0bf5785763',
      code: 'NT_EAST'
    },
    {
      _id: '60010453b7241c0bf578576d',
      name: {
        en: 'Islands',
        'zh-hk': '離島區',
        'zh-cn': '离岛区'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['60010215b7241c0bf5785760', '60010315b7241c0bf5785764'],
      isActive: true,
      isAddress: true,
      workspace: '5fd83be73db74d57b304cb82',
      parent: '60010315b7241c0bf5785764',
      code: 'ISLANDS_DISTRICT'
    },
    // fstravel end
    {
      _id: '5f9fa9b7262f8563b9d0b898',
      code: 'HONG_KONG',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      ancestors: [],
      parent: null,
      isActive: true
    },

    {
      _id: '5f9faa8aee462e9b776be8c0',
      code: 'HONG_KONG_ISLAND',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898'],
      parent: '5f9fa9b7262f8563b9d0b898',
      isActive: true
    },
    {
      _id: '5f9fa9f5ef2938d1ab4e3033',
      code: 'KOWLOON',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898'],
      parent: '5f9fa9b7262f8563b9d0b898',
      isActive: true
    },
    {
      _id: '5f9fa9fc1426e67d49108fe8',
      code: 'NEW_TERRITORIES',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898'],
      parent: '5f9fa9b7262f8563b9d0b898',
      isActive: true
    },
    {
      _id: '5f9fab18804ba4f08a9ef140',
      code: 'ISLANDS',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Islands',
        'zh-hk': '離島',
        'zh-cn': '離島'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898'],
      parent: '5f9fa9b7262f8563b9d0b898',
      isActive: true
    },

    {
      _id: '5f9fae139e76bb630c05b5ec',
      code: 'CENTRAL_AND_WESTERN_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Central and Western',
        'zh-hk': '中西區',
        'zh-cn': '中西区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9faa8aee462e9b776be8c0'],
      parent: '5f9faa8aee462e9b776be8c0',
      isActive: true
    },
    {
      _id: '5f9fae1941c8c388856df880',
      code: 'EASTERN_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Eastern',
        'zh-hk': '東區',
        'zh-cn': '东区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9faa8aee462e9b776be8c0'],
      parent: '5f9faa8aee462e9b776be8c0',
      isActive: true
    },
    {
      _id: '5f9fae206713dcafe8ca49f4',
      code: 'SOUTHERN_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Southern',
        'zh-hk': '南區',
        'zh-cn': '南区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9faa8aee462e9b776be8c0'],
      parent: '5f9faa8aee462e9b776be8c0',
      isActive: true
    },

    {
      _id: '5f9fae2793c20f4d29cde096',
      code: 'KOWLOON_EAST',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍東',
        'zh-cn': '九龙東'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9fa9f5ef2938d1ab4e3033'],
      parent: '5f9fa9f5ef2938d1ab4e3033',
      isActive: true
    },
    {
      _id: '5f9f7c6fbb7b9a5458b26c55',
      code: 'KOWLOON_WEST',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kwun Tong',
        'zh-hk': '九龍西',
        'zh-cn': '九龙西'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9fa9f5ef2938d1ab4e3033'],
      parent: '5f9fa9f5ef2938d1ab4e3033',
      isActive: true
    },

    {
      _id: '5f9fae2d55cd558576e6a9ed',
      code: 'NT_NORTH',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'NT North',
        'zh-hk': '新界北',
        'zh-cn': '新界北'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9fa9fc1426e67d49108fe8'],
      parent: '5f9fa9fc1426e67d49108fe8',
      isActive: true
    },
    {
      _id: '5f9fae34a1316391b6c19eb2',
      code: 'NT_WEST',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'NT West',
        'zh-hk': '新界西',
        'zh-cn': '新界西'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9fa9fc1426e67d49108fe8'],
      parent: '5f9fa9fc1426e67d49108fe8',
      isActive: true
    },
    {
      _id: '5f9fae3a2faf1ccd8c80b234',
      code: 'NT_EAST',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'NT East',
        'zh-hk': '新界東',
        'zh-cn': '新界東'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9fa9fc1426e67d49108fe8'],
      parent: '5f9fa9fc1426e67d49108fe8',
      isActive: true
    },

    {
      _id: '5f9fae3f8dbaee741b13b0a4',
      code: 'ISLANDS_DISTRICT',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Islands',
        'zh-hk': '離島區',
        'zh-cn': '离岛区'
      },
      ancestors: ['5f9fa9b7262f8563b9d0b898', '5f9fab18804ba4f08a9ef140'],
      parent: '5f9fab18804ba4f08a9ef140',
      isActive: true
    },

    {
      _id: '5f9faf2e3a11a134583f7696',
      code: 'CENTRAL',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Central',
        'zh-hk': '中環',
        'zh-cn': '中环'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9faa8aee462e9b776be8c0',
        '5f9fae139e76bb630c05b5ec'
      ],
      parent: '5f9fae139e76bb630c05b5ec',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.157275, 22.282701]
        }
      }
    },
    {
      _id: '5f9fafd1a5b6da029d9b9a6f',
      code: 'QUARRY_BAY',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Quarry Bay',
        'zh-hk': '鰂魚涌',
        'zh-cn': '鲗鱼涌'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9faa8aee462e9b776be8c0',
        '5f9fae1941c8c388856df880'
      ],
      parent: '5f9fae1941c8c388856df880',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.214664, 22.287759]
        }
      },
      __v: 0
    },
    {
      _id: '5f9fb0902f64850c8d302085',
      code: 'ABERDEEN',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Aberdeen',
        'zh-hk': '香港仔',
        'zh-cn': '香港仔'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9faa8aee462e9b776be8c0',
        '5f9fae206713dcafe8ca49f4'
      ],
      parent: '5f9fae206713dcafe8ca49f4',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.156436, 22.251009]
        }
      }
    },
    {
      _id: '5f9fb08d0e59564d760c9bf1',
      code: 'AP_LEI_CHAU',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ap Lei Chau',
        'zh-hk': '鴨脷洲',
        'zh-cn': '鸭脷洲'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9faa8aee462e9b776be8c0',
        '5f9fae206713dcafe8ca49f4'
      ],
      parent: '5f9fae206713dcafe8ca49f4',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.152936, 22.242575]
        }
      }
    },

    {
      _id: '5f9fb0884a87ba75a1009cee',
      code: 'KWUN_TONG',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwun Tong',
        'zh-hk': '觀塘',
        'zh-cn': '观塘'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9f7a52168d9addf5bb3721',
        '5f9f7c6fbb7b9a5458b26c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b26c55',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.224435, 22.311359]
        }
      }
    },
    {
      _id: '5f9f830a0d89a616bf286557',
      code: 'SHAM_SHUI_PO',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sham Shui Po',
        'zh-hk': '深水埗',
        'zh-cn': '深水埗'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9fa9f5ef2938d1ab4e3033',
        '5f9f7c6fbb7b9a5458b26c55'
      ],
      parent: '5f9f7c6fbb7b9a5458b26c55',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.159122, 22.329894]
        }
      }
    },
    {
      _id: '5f9fb1f86ef90e1a4a22d790',
      code: 'SHATIN',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sha Tin',
        'zh-hk': '沙田',
        'zh-cn': '沙田'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9fa9fc1426e67d49108fe8',
        '5f9fae2793c20f4d29cde096'
      ],
      parent: '5f9fae2793c20f4d29cde096',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.200774, 22.384531]
        }
      }
    },
    {
      _id: '5f9fb2676bd102b7cf038aa0',
      code: 'TUEN_MUN',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tuen Mun',
        'zh-hk': '屯門',
        'zh-cn': '屯门'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9fa9fc1426e67d49108fe8',
        '5f9fae34a1316391b6c19eb2'
      ],
      parent: '5f9fae34a1316391b6c19eb2',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [113.970207, 22.398258]
        }
      }
    },
    {
      _id: '5f9fb2dac024f3a7a171f1ce',
      code: 'TUNG_CHUNG',
      workspace: '5ea95dce2b462f77bf7acc02',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tung Chung',
        'zh-hk': '東涌',
        'zh-cn': '東涌'
      },
      ancestors: [
        '5f9fa9b7262f8563b9d0b898',
        '5f9fab18804ba4f08a9ef140',
        '5f9fae3f8dbaee741b13b0a4'
      ],
      parent: '5f9fae3f8dbaee741b13b0a4',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.060557, 22.449952]
        }
      }
    },
    // ECOMM_CART END

    // WTT  Hong Kong
    {
      _id: '5fd730fd4a8ae5133ca9e54a',
      code: 'HONG_KONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['country'],
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      ancestors: [],
      parent: null,
      isActive: true,
      __v: 0
    },

    // 3 main regions of Hong Kong
    {
      _id: '5fd7310dd2835074d00ff89b',
      code: 'KOWLOON',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a'],
      parent: '5fd730fd4a8ae5133ca9e54a',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd73118134227bdee8b0436',
      code: 'NEW_TERRITORIES',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a'],
      parent: '5fd730fd4a8ae5133ca9e54a',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd73120f67f4fe5c8163dbe',
      code: 'HONG_KONG_ISLAND',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a'],
      parent: '5fd730fd4a8ae5133ca9e54a',
      isActive: true,
      __v: 0
    },

    // 18 districts
    // Hong Kong Island
    {
      _id: '5fd73129630061632f643796',
      code: 'CENTRAL_AND_WESTERN_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Central and Western',
        'zh-hk': '中西區',
        'zh-cn': '中西区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73120f67f4fe5c8163dbe'],
      parent: '5fd73120f67f4fe5c8163dbe',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd731367ebf9313d69b2285',
      code: 'EASTERN_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Eastern',
        'zh-hk': '東區',
        'zh-cn': '东区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73120f67f4fe5c8163dbe'],
      parent: '5fd73120f67f4fe5c8163dbe',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd731ca591fe1995fe697e8',
      code: 'SOUTHERN_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Southern',
        'zh-hk': '南區',
        'zh-cn': '南区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73120f67f4fe5c8163dbe'],
      parent: '5fd73120f67f4fe5c8163dbe',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd731d44aff7e9cd40d3f57',
      code: 'WAN_CHAI_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Wan Chai',
        'zh-hk': '灣仔區',
        'zh-cn': '湾仔区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a'],
      parent: '5fd73120f67f4fe5c8163dbe',
      isActive: true,
      __v: 0
    },
    // Kowloon
    {
      _id: '5fd731ddf8b217ddac3292d8',
      code: 'KOWLOON_CITY_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍城區',
        'zh-cn': '九龙城区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd7310dd2835074d00ff89b'],
      parent: '5fd7310dd2835074d00ff89b',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd731e6bdcd392a0c9069cf',
      code: 'KWUN_TONG_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kwun Tong',
        'zh-hk': '觀塘區',
        'zh-cn': '观塘区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd7310dd2835074d00ff89b'],
      parent: '5fd7310dd2835074d00ff89b',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd731efa38f4b3e9e51afe3',
      code: 'WONG_TAI_SIN_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Wong Tai Sin',
        'zh-hk': '黃大仙區',
        'zh-cn': '黄大仙区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd7310dd2835074d00ff89b'],
      parent: '5fd7310dd2835074d00ff89b',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd732013c5b73bd08ad116a',
      code: 'YAU_TSIM_MONG_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Yau Tsim Mong',
        'zh-hk': '油尖旺區',
        'zh-cn': '油尖旺区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd7310dd2835074d00ff89b'],
      parent: '5fd7310dd2835074d00ff89b',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd7320b7d8179bdd59e2c8c',
      code: 'SHAM_SHUI_PO_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Sham Shui Po',
        'zh-hk': '深水埗區',
        'zh-cn': '深水埗区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd7310dd2835074d00ff89b'],
      parent: '5fd7310dd2835074d00ff89b',
      isActive: true,
      __v: 0
    },
    // New Territories
    {
      _id: '5fd732144cc3fdeb98fb7806',
      code: 'ISLANDS_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Islands',
        'zh-hk': '離島區',
        'zh-cn': '离岛区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd7321db3bfe15272c2352b',
      code: 'KWAI_TSING_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Kwai Tsing',
        'zh-hk': '葵青區',
        'zh-cn': '葵青区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd73226a3dbe0c698f27027',
      code: 'NORTH_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'North',
        'zh-hk': '北區',
        'zh-cn': '北区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd7322fdb7f8b1643992325',
      code: 'SAI_KUNG_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Sai Kung',
        'zh-hk': '西貢區',
        'zh-cn': '西贡区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd7323796ca16726c3bae47',
      code: 'SHA_TIN_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Sha Tin',
        'zh-hk': '沙田區',
        'zh-cn': '沙田区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd73242939b936f90fd8de2',
      code: '_TAI_PO_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tai Po',
        'zh-hk': '大埔區',
        'zh-cn': '大埔区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd7324d511cb00d92972526',
      code: 'TSUEN_WAN_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tsuen Wan',
        'zh-hk': '荃灣區',
        'zh-cn': '荃湾区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd73255660ce7d73fe1ba06',
      code: 'TUEN_MUN_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tuen Mun',
        'zh-hk': '屯門區',
        'zh-cn': '屯门区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd7325ecc4e070998360cce',
      code: 'YUEN_LONG_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Yuen Long',
        'zh-hk': '元朗區',
        'zh-cn': '元朗区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },
    {
      _id: '5fd73268ef93434474db222d',
      code: 'TSEUNG_KWAN_O_DISTRICT',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['district'],
      name: {
        en: 'Tseung Kwan O',
        'zh-hk': '將軍澳區',
        'zh-cn': '将军澳区'
      },
      ancestors: ['5fd730fd4a8ae5133ca9e54a', '5fd73118134227bdee8b0436'],
      parent: '5fd73118134227bdee8b0436',
      isActive: true,
      __v: 0
    },

    // selectable regions
    // Kowloon
    {
      _id: '5fd732714c0dca21ef6ea5f8',
      code: 'BEACON_HILL',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Beacon Hill',
        'zh-hk': '畢架山',
        'zh-cn': '毕架山'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.169193, 22.349561]
        }
      },
      __v: 0
    },
    {
      _id: '5fd7327b1ca1c27c4b34c3b4',
      code: 'CHOI_HUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Choi Hung',
        'zh-hk': '彩虹',
        'zh-cn': '彩虹'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.209002, 22.334963]
        }
      },
      __v: 0
    },
    {
      _id: '5fd7328665c3eca223cae805',
      code: 'CITY_UNIVERSITY_OF_HONG_KONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'City University of Hong Kong',
        'zh-hk': '城市大學',
        'zh-cn': '城市大学'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.172393, 22.336759]
        }
      },
      __v: 0
    },
    {
      _id: '5fd7328f826ea19b4faec57c',
      code: 'DIAMOND_HILL',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Diamond Hill',
        'zh-hk': '鑽石山',
        'zh-cn': '钻石山'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.202845, 22.343959]
        }
      },
      __v: 0
    },
    {
      _id: '5fd73ba10829440fe0956898',
      code: 'FEI_NGO_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Fei Ngo Shan',
        'zh-hk': '飛鵝山',
        'zh-cn': '飞鹅山'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.223119, 22.338614]
        }
      },
      __v: 0
    },
    {
      _id: '5fd732a530a62dd25e0c7747',
      code: 'HONG_KONG_BAPTIST_UNIVERSITY',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Hong Kong Baptist University',
        'zh-hk': '浸會大學',
        'zh-cn': '浸会大学'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.181909, 22.338724]
        }
      },
      __v: 0
    },
    {
      _id: '5fd733396183804cf827bb0d',
      code: 'KAI_TAK',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kai Tak',
        'zh-hk': '啟德',
        'zh-cn': '启德'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.199674, 22.330592]
        }
      },
      __v: 0
    },
    {
      _id: '5fd73343ea27ec11d7e15348',
      code: 'KOWLOON_CITY',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍城',
        'zh-cn': '九龙城'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.190676, 22.330513]
        }
      },
      __v: 0
    },
    {
      _id: '5fd7334e505a296ce99ea226',
      code: 'KOWLOON_TONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kowloon Tong',
        'zh-hk': '九龍塘',
        'zh-cn': '九龙塘'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.176028, 22.337119]
        }
      }
    },
    {
      _id: '5f9f80b8f3479a35632dbdb1',
      code: 'KWUN_YAM_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwun Yam Shan',
        'zh-hk': '觀音山',
        'zh-cn': '观音山'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.119198, 22.427012]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80d083940b46e60761f2',
      code: 'LOK_FU',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lok Fu',
        'zh-hk': '樂富',
        'zh-cn': '乐富'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.188061, 22.336773]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80da9d5c43c855c1c6a2',
      code: 'SAN_PO_KONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'San Po Kong',
        'zh-hk': '新蒲崗',
        'zh-cn': '新蒲岗'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.198975, 22.336305]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80e9dab4d6977fcebdc1',
      code: 'TO_KWA_WAH',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'To Kwa Wah',
        'zh-hk': '土瓜灣',
        'zh-cn': '土瓜湾'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.18918, 22.316787]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f80fdfafd3ce1e2b3fd2a',
      code: 'TSZ_WAN_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tsz Wan Shan',
        'zh-hk': '慈雲山',
        'zh-cn': '慈云山'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.202163, 22.34911]
        }
      },
      __v: 0
    },
    {
      _id: '5fd7338463d08be9724b242d',
      code: 'WANG_TAU_HOM',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wang Tau Hom',
        'zh-hk': '橫頭磡',
        'zh-cn': '横头磡'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.186687, 22.340699]
        }
      },
      __v: 0
    },
    {
      _id: '5fd733bc91cc63c4dd6f98e7',
      code: 'WANG_TAI_SIN',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Wong Tai Sin',
        'zh-hk': '黃大仙',
        'zh-cn': '黄大仙'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731ddf8b217ddac3292d8'
      ],
      parent: '5fd731ddf8b217ddac3292d8',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.194113, 22.342192]
        }
      },
      __v: 0
    },
    {
      _id: '5fd733c7bb1cff520323b600',
      code: 'KWUN_TONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kwun Tong',
        'zh-hk': '觀塘',
        'zh-cn': '观塘'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.224435, 22.311359]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81a8312f85f31c04e8f1',
      code: 'KAI_TAK_CRUISE_TERMINAL',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kai Tak Cruise Terminal',
        'zh-hk': '啟德郵輪碼頭',
        'zh-cn': '启德邮轮码头'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.213819, 22.306121]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81be05008c6e6852684d',
      code: 'KOWLOON_BAY',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Kowloon Bay',
        'zh-hk': '九龍灣',
        'zh-cn': '九龙湾'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.209033, 22.325615]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81d4466a29e1678a4df1',
      code: 'LAM_TIN',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Lam Tin',
        'zh-hk': '藍田',
        'zh-cn': '蓝田'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.238496, 22.310262]
        }
      },
      __v: 0
    },
    {
      _id: '5f9f81ddf2a2f07e6157f44a',
      code: 'NGAU_TAU_KOK',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Ngau Tau Kok',
        'zh-hk': '牛頭角',
        'zh-cn': '牛头角'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.218771, 22.321293]
        }
      },
      __v: 0
    },
    {
      _id: '5fd733f23eb9a35e25323103',
      code: 'SAU_MAU_PING',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sau Mau Ping',
        'zh-hk': '秀茂坪',
        'zh-cn': '秀茂坪'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.231881, 22.319801]
        }
      },
      __v: 0
    },
    {
      _id: '5fd733fc6910bb2be2be0bb1',
      code: 'SUN_LEE_ESTATE',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Sun Lee Estate',
        'zh-hk': '順利邨',
        'zh-cn': '顺利村'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.225924, 22.331665]
        }
      },
      __v: 0
    },
    {
      _id: '5fd73bf5da51f4d61f2ab33b',
      code: 'TSEUNG_KWAN_O_CHINESE_PERMANENT_CEMETERY',
      workspace: '5ea7f40f68a8e97c03d55326',
      type: 'region',
      subTypes: ['neighborhood'],
      name: {
        en: 'Tseung Kwan O Chinese Permanent Cemetery',
        'zh-hk': '將軍澳墳場',
        'zh-cn': '将军澳坟场'
      },
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      parent: '5fd731e6bdcd392a0c9069cf',
      isActive: true,
      location: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [114.248031, 22.296509]
        }
      },
      __v: 0
    },

    {
      _id: '5fd735bd106d36515f8af0e3',
      name: {
        en: 'Yau Tong',
        'zh-hk': '油塘',
        'zh-cn': '油塘'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.236988, 22.297877]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd731e6bdcd392a0c9069cf'
      ],
      isActive: true,
      code: 'YAU_TONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731e6bdcd392a0c9069cf',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0e4',
      name: {
        en: 'Caldecott Hill',
        'zh-hk': '郝德傑山',
        'zh-cn': '郝德杰山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.149834, 22.344909]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'CALDECOTT_HILL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0e5',
      name: {
        en: 'Cheung Sha Wan',
        'zh-hk': '長沙灣',
        'zh-cn': '长沙湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.153335, 22.334322]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'CHEUNG_SHA_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0e6',
      name: {
        en: 'Lai Chi Kok',
        'zh-hk': '荔枝角',
        'zh-cn': '荔枝角'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.147522, 22.337172]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'LAI_CHI_KOK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0e7',
      name: {
        en: 'Mei Foo',
        'zh-hk': '美孚',
        'zh-cn': '美孚'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.139114, 22.33717]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'MEI_FOO',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0e8',
      name: {
        en: 'Nam Cheong',
        'zh-hk': '南昌',
        'zh-cn': '南昌'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.155631, 22.326145]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'NAM_CHEONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0e9',
      name: {
        en: 'Olympic',
        'zh-hk': '奧運',
        'zh-cn': '奥运'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.16055, 22.317878]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'OLYMPIC',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0ea',
      name: {
        en: 'Sham Shui Po',
        'zh-hk': '深水埗',
        'zh-cn': '深水埗'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.159122, 22.329894]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'SHAM_SHUI_PO',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0eb',
      name: {
        en: 'Shek Kip Mei',
        'zh-hk': '石硤尾',
        'zh-cn': '石硖尾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.166966, 22.333323]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'SHEK_KIP_MEI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0ec',
      name: {
        en: 'Stonecutters Island',
        'zh-hk': '昂船洲',
        'zh-cn': '昂船洲'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.134365, 22.323395]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'STONECUTTERS_ISLAND',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.498Z',
      updatedAt: '2020-12-14T09:51:57.498Z'
    },

    {
      _id: '5fd735bd106d36515f8af0ed',
      name: {
        en: 'Tai Kok Tsu',
        'zh-hk': '大角嘴',
        'zh-cn': '大角嘴'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.162003, 22.322091]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd7320b7d8179bdd59e2c8c'
      ],
      isActive: true,
      code: 'TAI_KOK_TSU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7320b7d8179bdd59e2c8c',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0ee',
      name: {
        en: 'Yau Ma Tei',
        'zh-hk': '油麻地',
        'zh-cn': '油麻地'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.170608, 22.313168]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'YAU_MA_TEI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0ef',
      name: {
        en: 'Ho Man Tin',
        'zh-hk': '何文田',
        'zh-cn': '何文田'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.178022, 22.317684]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'HO_MAN_TIN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f0',
      name: {
        en: 'Hung Hom',
        'zh-hk': '紅磡',
        'zh-cn': '红磡'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.184809, 22.307413]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'HUNG_HOM',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f1',
      name: {
        en: 'Jordan',
        'zh-hk': '佐敦',
        'zh-cn': '佐敦'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.170187, 22.305123]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'JORDAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f2',
      name: {
        en: 'Mong Kok',
        'zh-hk': '旺角',
        'zh-cn': '旺角'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.169515, 22.318871]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'MONG_KOK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f3',
      name: {
        en: 'Prince Edward',
        'zh-hk': '太子',
        'zh-cn': '太子'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.168271, 22.325104]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'PRINCE_EDWARD',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f4',
      name: {
        en: 'The Hong Kong Polytechnic University',
        'zh-hk': '理工大學',
        'zh-cn': '理工大学'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.179669, 22.304011]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'THE_HONG_KONG_POLYTECHNIC_UNIVERSITY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f5',
      name: {
        en: 'Tsim Sha Tsui',
        'zh-hk': '尖沙嘴',
        'zh-cn': '尖沙嘴'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.17214, 22.29795]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd7310dd2835074d00ff89b',
        '5fd732013c5b73bd08ad116a'
      ],
      isActive: true,
      code: 'TSIM_SHA_TSUI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732013c5b73bd08ad116a',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f6',
      name: {
        en: 'Central',
        'zh-hk': '中環',
        'zh-cn': '中环'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.157275, 22.282701]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'CENTRAL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f7',
      name: {
        en: 'Fo Tan',
        'zh-hk': '火炭',
        'zh-cn': '火炭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.190819, 22.400337]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'FO_TAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f8',
      name: {
        en: 'Hong Kong Internation Airport',
        'zh-hk': '機場',
        'zh-cn': '机场'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.919854, 22.322022]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'HONG_KONG_INTERNATION_AIRPORT',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0f9',
      name: {
        en: 'Tung Chung',
        'zh-hk': '東涌',
        'zh-cn': '东涌'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.947074, 22.290106]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'TUNG_CHUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0fa',
      name: {
        en: 'Asia World-Expo',
        'zh-hk': '博覽館',
        'zh-cn': '博览馆'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.943312, 22.32183]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'ASIA_WORLD_EXPO',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0fb',
      name: {
        en: 'Discovery Bay',
        'zh-hk': '愉景灣',
        'zh-cn': '愉景湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.011807, 22.294069]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'DISCOVERY_BAY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0fc',
      name: {
        en: 'Hong Kong Disneyland',
        'zh-hk': '迪士尼樂園',
        'zh-cn': '迪士尼乐园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.041296, 22.31318]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'HONG_KONG_DISNEYLAND',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0fd',
      name: {
        en: 'Hong Kong-Zhuhai-Macau Bridge Border',
        'zh-hk': '機場人工島',
        'zh-cn': '机场人工岛'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.041296, 22.31318]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'HONG_KONG_ZHUHAI_MACAU_BRIDGE_BORDER',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0fe',
      name: {
        en: 'Ma Wan',
        'zh-hk': '馬灣',
        'zh-cn': '马湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.05926, 22.351182]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'MA_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af0ff',
      name: {
        en: 'Siu Ho Wan',
        'zh-hk': '小蠔灣',
        'zh-cn': '小蚝湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.997817, 22.315353]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd732144cc3fdeb98fb7806'
      ],
      isActive: true,
      code: 'SIU_HO_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd732144cc3fdeb98fb7806',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af100',
      name: {
        en: 'Kwai Chung',
        'zh-hk': '葵涌',
        'zh-cn': '葵涌'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.131114, 22.361526]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'KWAI_CHUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af101',
      name: {
        en: 'Tusen Wan',
        'zh-hk': '荃灣',
        'zh-cn': '荃湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.106371, 22.377074]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'TUSEN_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af102',
      name: {
        en: 'Sham Tseng',
        'zh-hk': '深井',
        'zh-cn': '深井'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.058981, 22.368014]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'SHAM_TSENG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af103',
      name: {
        en: 'Kwai Tsing Container Terminal 1-8',
        'zh-hk': '貨櫃碼頭1-8號',
        'zh-cn': '货柜码头1-8号'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.124746, 22.345396]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'KWAI_TSING_CONTAINER_TERMINAL_1-8',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af104',
      name: {
        en: 'Kwai Tsing Container Terminal 9',
        'zh-hk': '貨櫃碼頭9號',
        'zh-cn': '货柜码头9号'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.113416, 22.333419]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'KWAI_TSING_CONTAINER_TERMINAL_9',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.499Z',
      updatedAt: '2020-12-14T09:51:57.499Z'
    },

    {
      _id: '5fd735bd106d36515f8af105',
      name: {
        en: 'Lai King',
        'zh-hk': '荔景',
        'zh-cn': '荔景'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.127905, 22.348514]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'LAI_KING',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.500Z',
      updatedAt: '2020-12-14T09:51:57.500Z'
    },

    {
      _id: '5fd735bd106d36515f8af106',
      name: {
        en: 'Lei Muk Shue',
        'zh-hk': '梨木樹',
        'zh-cn': '梨木树'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.135627, 22.37878]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'LEI_MUK_SHUE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.500Z',
      updatedAt: '2020-12-14T09:51:57.500Z'
    },

    {
      _id: '5fd735bd106d36515f8af107',
      name: {
        en: 'Lo Wai',
        'zh-hk': '老圍',
        'zh-cn': '老围'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.136492, 22.384782]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'LO_WAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.500Z',
      updatedAt: '2020-12-14T09:51:57.500Z'
    },

    {
      _id: '5fd735bd106d36515f8af108',
      name: {
        en: 'Muk Min Ha Tsuen',
        'zh-hk': '木棉下村',
        'zh-cn': '木棉下村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.118433, 22.379016]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'MUK_MIN_HA_TSUEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.500Z',
      updatedAt: '2020-12-14T09:51:57.500Z'
    },

    {
      _id: '5fd735bd106d36515f8af109',
      name: {
        en: 'Shek Lei',
        'zh-hk': '石籬',
        'zh-cn': '石篱'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.138378, 22.365446]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'SHEK_LEI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.500Z',
      updatedAt: '2020-12-14T09:51:57.500Z'
    },

    {
      _id: '5fd735bd106d36515f8af10a',
      name: {
        en: 'Shing Mun Reservoir Barbecue Area',
        'zh-hk': '城門水塘燒烤場',
        'zh-cn': '城门水塘烧烤场'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.144451, 22.37993]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'SHING_MUN_RESERVOIR_BARBECUE_AREA',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.501Z',
      updatedAt: '2020-12-14T09:51:57.501Z'
    },

    {
      _id: '5fd735bd106d36515f8af10b',
      name: {
        en: 'Shing Mun Reservoir Gate',
        'zh-hk': '城門水塘閘口',
        'zh-cn': '城门水塘闸口'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.143936, 22.386991]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'SHING_MUN_RESERVOIR_GATE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af10c',
      name: {
        en: 'Tai Mo Shan',
        'zh-hk': '大帽山',
        'zh-cn': '大帽山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.138036, 22.409798]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'TAI_MO_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af10d',
      name: {
        en: 'Ting Kau',
        'zh-hk': '汀九',
        'zh-cn': '汀九'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.073447, 22.379389]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'TING_KAU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af10e',
      name: {
        en: 'Tsing Yi',
        'zh-hk': '青衣',
        'zh-cn': '青衣'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.102108, 22.34912]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'TSING_YI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af10f',
      name: {
        en: 'Tsing Yi Sai Tso Wan',
        'zh-hk': '青衣西草灣',
        'zh-cn': '青衣西草湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.093168, 22.34126]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'TSING_YI_SAI_TSO_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af110',
      name: {
        en: 'Tso Kung Tam Outdoor Recreation Centre',
        'zh-hk': '曹公潭戶外康樂中心',
        'zh-cn': '曹公潭户外康乐中心'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.106059, 22.386374]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'TSO_KUNG_TAM_OUTDOOR_RECREATION_CENTRE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af111',
      name: {
        en: 'Wonderland Villas',
        'zh-hk': '華景山莊',
        'zh-cn': '华景山庄'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.135697, 22.353906]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7321db3bfe15272c2352b'
      ],
      isActive: true,
      code: 'WONDERLAND_VILLAS',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7321db3bfe15272c2352b',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af112',
      name: {
        en: 'Fanling',
        'zh-hk': '粉嶺',
        'zh-cn': '粉岭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.14164, 22.492753]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'FANLING',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af113',
      name: {
        en: 'Hong Kong Golf Club',
        'zh-hk': '粉嶺高爾夫球會',
        'zh-cn': '粉岭高尔夫球会'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.120934, 22.496556]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'HONG_KONG_GOLF_CLUB',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af114',
      name: {
        en: 'Kau Lung Hang',
        'zh-hk': '九龍坑',
        'zh-cn': '九龙坑'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.15327, 22.485985]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'KAU_LUNG_HANG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af115',
      name: {
        en: 'Kwan Tei',
        'zh-hk': '軍地',
        'zh-cn': '军地'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.163526, 22.506552]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'KWAN_TEI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af116',
      name: {
        en: 'Kwu Tung',
        'zh-hk': '古洞',
        'zh-cn': '古洞'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.100361, 22.504818]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'KWU_TUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.502Z',
      updatedAt: '2020-12-14T09:51:57.502Z'
    },

    {
      _id: '5fd735bd106d36515f8af117',
      name: {
        en: 'Lok Ma Chau',
        'zh-hk': '落馬洲',
        'zh-cn': '落马洲'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.082011, 22.511296]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'LOK_MA_CHAU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af118',
      name: {
        en: 'Lung Shan Tample',
        'zh-hk': '龍山寺',
        'zh-cn': '龙山寺'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.156934, 22.497539]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'LUNG_SHAN_TAMPLE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af119',
      name: {
        en: 'Pat Sin Leng Country Park',
        'zh-hk': '八仙嶺',
        'zh-cn': '八仙岭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.216624, 22.484443]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'PAT_SIN_LENG_COUNTRY_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af11a',
      name: {
        en: 'Ping Che',
        'zh-hk': '坪輋',
        'zh-cn': '坪輋'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.167233, 22.523073]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'PING_CHE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af11b',
      name: {
        en: 'Sandy Ridge',
        'zh-hk': '沙嶺',
        'zh-cn': '沙岭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.128355, 22.53004]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'SANDY_RIDGE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af11c',
      name: {
        en: 'Sha Tau Kok',
        'zh-hk': '沙頭角',
        'zh-cn': '沙头角'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.19662, 22.53816]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'SHA_TAU_KOK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af11d',
      name: {
        en: 'Sheung Shui',
        'zh-hk': '上水',
        'zh-cn': '上水'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.126862, 22.508629]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'SHEUNG_SHUI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af11e',
      name: {
        en: 'Sheung Shui Wa Shan',
        'zh-hk': '上水華山',
        'zh-cn': '上水华山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.136583, 22.517455]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'SHEUNG_SHUI_WA_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af11f',
      name: {
        en: 'Ta Kwu Ling',
        'zh-hk': '打鼓嶺',
        'zh-cn': '打鼓岭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.164354, 22.547571]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'TA_KWU_LING',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af120',
      name: {
        en: 'Ta Shek Wu',
        'zh-hk': '打石湖',
        'zh-cn': '打石湖'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.107867, 22.463333]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'TA_SHEK_WU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af121',
      name: {
        en: 'Tsiu Keng',
        'zh-hk': '蕉徑',
        'zh-cn': '蕉径'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.11131, 22.477357]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'TSIU_KENG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af122',
      name: {
        en: 'Wo Hop Shek',
        'zh-hk': '和合石',
        'zh-cn': '和合石'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.141638, 22.477898]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'WO_HOP_SHEK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af123',
      name: {
        en: 'Wo Hop Shek Cemetery',
        'zh-hk': '和合石墳場',
        'zh-cn': '和合石坟场'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.138055, 22.475658]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73226a3dbe0c698f27027'
      ],
      isActive: true,
      code: 'WO_HOP_SHEK_CEMETERY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73226a3dbe0c698f27027',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af124',
      name: {
        en: 'High Island Reservoir',
        'zh-hk': '萬宜水庫',
        'zh-cn': '万宜水库'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.354964, 22.373541]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'HIGH_ISLAND_RESERVOIR',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af125',
      name: {
        en: 'Ho Chung',
        'zh-hk': '蠔涌',
        'zh-cn': '蚝涌'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.24585, 22.3566]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'HO_CHUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af126',
      name: {
        en: 'Hong Kong University of Science and Technology',
        'zh-hk': '科技大學',
        'zh-cn': '科技大学'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.265412, 22.336628]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'HONG_KONG_UNIVERSITY_OF_SCIENCE_AND_TECHNOLOGY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af127',
      name: {
        en: 'Lady MacLehose Holiday Village',
        'zh-hk': '麥理浩夫人度假村',
        'zh-cn': '麦理浩夫人度假村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.321335, 22.408278]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'LADY_MACLEHOSE_HOLIDY_VILLAGE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af128',
      name: {
        en: 'Pak Tam Chung Gate',
        'zh-hk': '北潭涌閘口',
        'zh-cn': '北潭涌闸口'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.319325, 22.397479]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'PAK_TAM_CHUNG_GATE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af129',
      name: {
        en: 'Po Toi O',
        'zh-hk': '布袋澳',
        'zh-cn': '布袋澳'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.295724, 22.276371]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'PO_TOI_O',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af12a',
      name: {
        en: 'Sai Kung',
        'zh-hk': '西貢',
        'zh-cn': '西贡'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.329205, 22.416225]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'SAI_KUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af12b',
      name: {
        en: 'Shap Sze Heung',
        'zh-hk': '十四鄉',
        'zh-cn': '十四乡'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.261654, 22.42011]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'SHAP_SZE_HEUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af12c',
      name: {
        en: 'Silverstrand',
        'zh-hk': '銀線灣',
        'zh-cn': '银线湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.277054, 22.326507]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'SILVERSTRAND',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.503Z',
      updatedAt: '2020-12-14T09:51:57.503Z'
    },

    {
      _id: '5fd735bd106d36515f8af12d',
      name: {
        en: 'Tai Au Mun',
        'zh-hk': '大坳門',
        'zh-cn': '大坳门'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.291826, 22.297092]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'TAI_AU_MUN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af12e',
      name: {
        en: 'Tai Mong Tsai',
        'zh-hk': '大網仔',
        'zh-cn': '大网仔'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.299032, 22.39337]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'TAI_MONG_TSAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af12f',
      name: {
        en: 'Tseng Lan Shue',
        'zh-hk': '井欄樹',
        'zh-cn': '井栏树'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.238321, 22.334559]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'TSENG_LAN_SHUE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af130',
      name: {
        en: 'Wong Shek Pier',
        'zh-hk': '黃石碼頭',
        'zh-cn': '黄石码头'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.337314, 22.435798]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7322fdb7f8b1643992325'
      ],
      isActive: true,
      code: 'WONG_SHEK_PIER',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7322fdb7f8b1643992325',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af131',
      name: {
        en: 'Kam Shan',
        'zh-hk': '金山',
        'zh-cn': '金山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.150148, 22.368248]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'KAM_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af132',
      name: {
        en: 'Kau To Shan',
        'zh-hk': '九肚山',
        'zh-cn': '九肚山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.202331, 22.411155]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'KAU_TO_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af133',
      name: {
        en: 'Ma Liu Shui',
        'zh-hk': '馬料水',
        'zh-cn': '马料水'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.206019, 22.421595]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'MA_LIU_SHUI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af134',
      name: {
        en: 'Ma On Shan',
        'zh-hk': '馬鞍山',
        'zh-cn': '马鞍山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.239667, 22.402045]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'MA_ON_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af135',
      name: {
        en: 'Ma On Shan Tsuen',
        'zh-hk': '馬鞍山村',
        'zh-cn': '马鞍山村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.23383, 22.414892]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'MA_ON_SHAN_TSUEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af136',
      name: {
        en: 'Po Fook Memorial Hall',
        'zh-hk': '寶福紀念館',
        'zh-cn': '宝福纪念馆'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.170363, 22.374331]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'PO_FOOK_MEMORIAL_HALL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af137',
      name: {
        en: 'Sai Sha',
        'zh-hk': '西沙',
        'zh-cn': '西沙'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.265699, 22.415962]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'SAI_SHA',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af138',
      name: {
        en: 'Sha Tin',
        'zh-hk': '沙田',
        'zh-cn': '沙田'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.200774, 22.384531]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'SAH_TIN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af139',
      name: {
        en: 'Shatin Hospital',
        'zh-hk': '沙田醫院',
        'zh-cn': '沙田医院'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.212798, 22.398298]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'SAHTIN_HOSPITAL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af13a',
      name: {
        en: 'Tai Wai',
        'zh-hk': '大圍',
        'zh-cn': '大围'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.178454, 22.376972]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'TAI_WAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af13b',
      name: {
        en: 'Tao Fong Shan',
        'zh-hk': '道風山',
        'zh-cn': '道风山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.182089, 22.384419]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'TAO_FONG_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af13c',
      name: {
        en: 'The Chinese University of Hong Kong',
        'zh-hk': '中文大學',
        'zh-cn': '中文大学'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.206691, 22.419145]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'THE_CHINESE_UNIVERSITY_OF_HONG_KONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af13d',
      name: {
        en: 'Tseng Tau',
        'zh-hk': '井頭',
        'zh-cn': '井头'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.269397, 22.428895]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'TSENG_TAU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af13e',
      name: {
        en: 'Wu Kai Sha',
        'zh-hk': '烏溪沙',
        'zh-cn': '乌溪沙'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.236425, 22.42949]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'WU_KAI_SHA',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af13f',
      name: {
        en: 'Yung Shue O',
        'zh-hk': '榕樹澳',
        'zh-cn': '榕树澳'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.293303, 22.428895]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7323796ca16726c3bae47'
      ],
      isActive: true,
      code: 'YUNG_SHUE_O',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7323796ca16726c3bae47',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af140',
      name: {
        en: 'Brides Pool',
        'zh-hk': '新娘潭',
        'zh-cn': '新娘潭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.239171, 22.503568]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'BRIDES_POOL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af141',
      name: {
        en: 'Fung Yuen Road',
        'zh-hk': '大埔鳳園路',
        'zh-cn': '大埔凤园路'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.180411, 22.462213]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'FUNG_YUEN_ROAD',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af142',
      name: {
        en: 'Hong Lok Yuen',
        'zh-hk': '康樂園',
        'zh-cn': '康乐园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.153989, 22.46223]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'HONG_LOK_YUEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af143',
      name: {
        en: 'Kadoorie Farm and Botanic Garden',
        'zh-hk': '嘉道理農場',
        'zh-cn': '嘉道理农场'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.117138, 22.433513]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'KADOORIE_FARM_AND_BOTANIC_GARDEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af144',
      name: {
        en: 'Luk Keng',
        'zh-hk': '鹿頸',
        'zh-cn': '鹿颈'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.213856, 22.521382]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'LUK_KENG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.504Z',
      updatedAt: '2020-12-14T09:51:57.504Z'
    },

    {
      _id: '5fd735bd106d36515f8af145',
      name: {
        en: 'Ng Tung Chai',
        'zh-hk': '梧桐寨',
        'zh-cn': '梧桐寨'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.127663, 22.437429]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'NG_TUNG_CHAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af146',
      name: {
        en: 'Sam Mun Tsai',
        'zh-hk': '三門仔',
        'zh-cn': '三门仔'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.215036, 22.455991]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'SAM_MUN_TSAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af147',
      name: {
        en: 'Seience Park',
        'zh-hk': '科學園',
        'zh-cn': '科学园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.210093, 22.427195]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'SEIENCE_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af148',
      name: {
        en: 'Tai Mei Tuk',
        'zh-hk': '大尾篤',
        'zh-cn': '大尾笃'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.235093, 22.473934]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'TAI_MEI_TUK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af149',
      name: {
        en: 'Tai Po',
        'zh-hk': '大埔',
        'zh-cn': '大埔'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.163847, 22.449399]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'TAI_PO',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af14a',
      name: {
        en: 'Tai Po Industrial Estate',
        'zh-hk': '大埔工業邨',
        'zh-cn': '大埔工业村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.185629, 22.457042]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'TAI_PO_INDUSTRIAL_ESTATE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af14b',
      name: {
        en: 'Tai Po Lam Tsuen',
        'zh-hk': '大埔林村',
        'zh-cn': '大埔林村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.128624, 22.451957]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'TAI_PO_LAM_TSUEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af14c',
      name: {
        en: 'Tai Po Road Tai Po Kau Section',
        'zh-hk': '大埔滘',
        'zh-cn': '大埔滘'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.183916, 22.42529]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'TAI_PO_ROAD_TAI_PO_KAU_SECTION',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af14d',
      name: {
        en: 'Tai Po Wun Yiu Road',
        'zh-hk': '大埔碗窰路',
        'zh-cn': '大埔碗窑路'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.163071, 22.430504]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'TAI_PO_WUN_YIU_ROAD',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af14e',
      name: {
        en: 'Tai Wo',
        'zh-hk': '太和',
        'zh-cn': '太和'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.161489, 22.451386]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'TAI_WO',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af14f',
      name: {
        en: 'The Hong Kong Institute of Education',
        'zh-hk': '教育學院',
        'zh-cn': '教育学院'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.193095, 22.471024]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'THE_HONG_KONG_INSTUTUTE_OF_EDUCATION',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af150',
      name: {
        en: 'Wu Kau Tang',
        'zh-hk': '烏蚊騰',
        'zh-cn': '乌蚊腾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.244401, 22.506936]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73242939b936f90fd8de2'
      ],
      isActive: true,
      code: 'WU_KAU_TANG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73242939b936f90fd8de2',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af151',
      name: {
        en: 'Lohas Park',
        'zh-hk': '日出康城',
        'zh-cn': '日出康城'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.270279, 22.294914]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73268ef93434474db222d'
      ],
      isActive: true,
      code: 'LOHAS_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73268ef93434474db222d',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af152',
      name: {
        en: 'Ma Yau Tong',
        'zh-hk': '馬游塘',
        'zh-cn': '马游塘'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.244095, 22.322916]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73268ef93434474db222d'
      ],
      isActive: true,
      code: 'MA_YAU_TONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73268ef93434474db222d',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af153',
      name: {
        en: 'Tseung Kwan O',
        'zh-hk': '將軍澳',
        'zh-cn': '将军澳'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.259981, 22.308337]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73268ef93434474db222d'
      ],
      isActive: true,
      code: 'TSEUNG_KWAN_O',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73268ef93434474db222d',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af154',
      name: {
        en: 'Tseung Kwan O Industrial Estate',
        'zh-hk': '將軍澳工業邨',
        'zh-cn': '将军澳工业村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.272121, 22.285283]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73268ef93434474db222d'
      ],
      isActive: true,
      code: 'TSEUNG_KWAN_O_INDUSTRIAL_ESTATE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73268ef93434474db222d',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af155',
      name: {
        en: 'Butterfly Beach',
        'zh-hk': '屯門蝴蝶灣',
        'zh-cn': '屯门蝴蝶湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.957247, 22.373767]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'BUTTERFIY_BEACH',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af156',
      name: {
        en: 'Hung Shui Kiu',
        'zh-hk': '洪水橋',
        'zh-cn': '洪水桥'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.997235, 22.4325]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'HUNG_SHUI_KIU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af157',
      name: {
        en: 'Lam Tei',
        'zh-hk': '藍地',
        'zh-cn': '蓝地'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.982306, 22.425085]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'LAM_TEI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af158',
      name: {
        en: 'Lingnan University',
        'zh-hk': '嶺南大學',
        'zh-cn': '岭南大学'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.981379, 22.411993]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'LINGNAN_UNIVERSITY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af159',
      name: {
        en: 'Lung Kwu Tan',
        'zh-hk': '龍鼓灘',
        'zh-cn': '龙鼓滩'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.928952, 22.39631]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'LUNG_KWU_TAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af15a',
      name: {
        en: 'Siu Lam',
        'zh-hk': '小欖',
        'zh-cn': '小榄'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.010239, 22.369489]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'SIU_LAM',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.505Z',
      updatedAt: '2020-12-14T09:51:57.505Z'
    },

    {
      _id: '5fd735bd106d36515f8af15b',
      name: {
        en: 'Tai Lam',
        'zh-hk': '大欖',
        'zh-cn': '大榄'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.055713, 22.401595]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'TAI_LAM',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af15c',
      name: {
        en: 'Tuen Mun',
        'zh-hk': '屯門',
        'zh-cn': '屯门'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.970207, 22.398258]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'TUEN_MUN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af15d',
      name: {
        en: 'Tuen Mun River Trade Terminal',
        'zh-hk': '屯門內河碼頭',
        'zh-cn': '屯门内河码头'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.933527, 22.370821]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd73255660ce7d73fe1ba06'
      ],
      isActive: true,
      code: 'TUEN_MUN_RIVER_TRADE_TERMINAL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73255660ce7d73fe1ba06',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af15e',
      name: {
        en: 'Fairview Park',
        'zh-hk': '錦繡花園',
        'zh-cn': '锦绣花园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.045593, 22.479707]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'FAIRVIEW_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af15f',
      name: {
        en: 'Kam Tin',
        'zh-hk': '錦田',
        'zh-cn': '锦田'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.060557, 22.449952]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'KAM_TIN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af160',
      name: {
        en: 'Lau Fau Shan',
        'zh-hk': '流浮山',
        'zh-cn': '流浮山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.984618, 22.469202]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'LAU_FAU_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af161',
      name: {
        en: 'Mai Po Natural Reserve',
        'zh-hk': '米埔',
        'zh-cn': '米埔'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.034045, 22.495567]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'MAI_PO_NATURAL_RESERVE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af162',
      name: {
        en: 'Mong Tseng Wai',
        'zh-hk': '輞井圍',
        'zh-cn': '辋井围'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.008635, 22.48203]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'MONG_TSENG_WAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af163',
      name: {
        en: 'Nam Sang Wai',
        'zh-hk': '南生圍',
        'zh-cn': '南生围'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.037828, 22.463011]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'NAM_SANG_WAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af164',
      name: {
        en: 'Nim Wan',
        'zh-hk': '稔灣',
        'zh-cn': '稔湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.937545, 22.425979]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'NIM_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af165',
      name: {
        en: 'Palm Springs',
        'zh-hk': '加州花園',
        'zh-cn': '加州花园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.053482, 22.485903]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'PALM_SPRINGS',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af166',
      name: {
        en: 'Pat Heung',
        'zh-hk': '八鄉',
        'zh-cn': '八乡'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.095901, 22.450453]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'PAT_HEUNG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af167',
      name: {
        en: 'Ping Shan',
        'zh-hk': '屏山',
        'zh-cn': '屏山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.008388, 22.441931]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'PING_SHAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af168',
      name: {
        en: 'Shek Kong',
        'zh-hk': '石崗',
        'zh-cn': '石岗'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.082244, 22.433168]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'SHEK_KONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af169',
      name: {
        en: 'Ha Pak Nai',
        'zh-hk': '下白泥',
        'zh-hk': '下白泥'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [113.952264, 22.43528]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'SHEUNG_HA_PAK_NAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af16a',
      name: {
        en: 'Tai Tong',
        'zh-hk': '大棠',
        'zh-cn': '大棠'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.03309, 22.4192]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'TAI_TONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af16b',
      name: {
        en: 'Tai Tong Country Park',
        'zh-hk': '大棠郊野公園',
        'zh-cn': '大棠郊野公园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.032142, 22.41601]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'TAI_TONG_COUNTRY_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.506Z',
      updatedAt: '2020-12-14T09:51:57.506Z'
    },

    {
      _id: '5fd735bd106d36515f8af16c',
      name: {
        en: 'Tai Tong Lychee Valley',
        'zh-hk': '荔枝山莊',
        'zh-cn': '荔枝山庄'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.025536, 22.413758]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'TAI_TONG_LYCHEE_VALLEY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af16d',
      name: {
        en: 'Tin Shui Wai',
        'zh-hk': '天水圍',
        'zh-cn': '天水围'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.001031, 22.460598]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'TIN_SHUI_WAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af16e',
      name: {
        en: 'Tong Yan San Tsuen',
        'zh-hk': '唐人新村',
        'zh-cn': '唐人新村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.010357, 22.436229]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'TONG_YAN_SAN_TSUEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af16f',
      name: {
        en: 'Yuen Long',
        'zh-hk': '元朗',
        'zh-cn': '元朗'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.028115, 22.446287]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73118134227bdee8b0436',
        '5fd7325ecc4e070998360cce'
      ],
      isActive: true,
      code: 'YUEN_LONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd7325ecc4e070998360cce',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af170',
      name: {
        en: 'Central',
        'zh-hk': '中環',
        'zh-cn': '中环'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.160462, 22.282198]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'CENTRAL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af171',
      name: {
        en: 'Admiralty',
        'zh-hk': '金鐘',
        'zh-cn': '金钟'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.165615, 22.280222]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'ADMIRALTY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af172',
      name: {
        en: 'Kennedy Town',
        'zh-hk': '堅尼地城',
        'zh-cn': '坚尼地城'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.128155, 22.282524]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'KENNEDY_TOWN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af173',
      name: {
        en: 'Mid-Levels Central',
        'zh-hk': '中半山',
        'zh-cn': '中半山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.155353, 22.275626]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'MIN_LEVELS_CENTRAL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af174',
      name: {
        en: 'Mid-Levels West',
        'zh-hk': '西半山',
        'zh-cn': '西半山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.144024, 22.281424]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'MIN_LEVELS_WEST',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af175',
      name: {
        en: 'Mount Davis',
        'zh-hk': '摩星嶺',
        'zh-cn': '摩星岭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.122786, 22.278368]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'MOUNT_DAVIS',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af176',
      name: {
        en: 'Sai Wan',
        'zh-hk': '西環',
        'zh-cn': '西环'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.135189, 22.286195]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'SAI_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af177',
      name: {
        en: 'Sai Ying Pun',
        'zh-hk': '西營盤',
        'zh-cn': '西营盘'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.141796, 22.287648]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'SAI_YING_PUN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af178',
      name: {
        en: 'Sheung Wan',
        'zh-hk': '上環',
        'zh-cn': '上环'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.149964, 22.287383]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'SHEUNG_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af179',
      name: {
        en: 'The Peak',
        'zh-hk': '山頂',
        'zh-cn': '山顶'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.145515, 22.277451]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'THE_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af17a',
      name: {
        en: 'The University of Hong Kong',
        'zh-hk': '香港大學',
        'zh-cn': '香港大学'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.137176, 22.283843]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd73129630061632f643796'
      ],
      isActive: true,
      code: 'THE_UNIVERSITY_OF_HONG_KONG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd73129630061632f643796',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af17b',
      name: {
        en: 'Braemar Hill',
        'zh-hk': '寶馬山',
        'zh-cn': '宝马山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.198108, 22.290811]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'BRAEMAR_HILL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af17c',
      name: {
        en: 'Cape Collinson Road',
        'zh-hk': '歌連臣角',
        'zh-cn': '歌连臣角'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.253268, 22.259094]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'CAPE_COLLINSOON_ROAD',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.507Z',
      updatedAt: '2020-12-14T09:51:57.507Z'
    },

    {
      _id: '5fd735bd106d36515f8af17d',
      name: {
        en: 'Chai Wan',
        'zh-hk': '柴灣',
        'zh-cn': '柴湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.240003, 22.267066]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'CHAI_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af17e',
      name: {
        en: 'Fortress  Hill',
        'zh-hk': '砲台山',
        'zh-cn': '炮台山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.194689, 22.287828]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'FORTRESS_HILL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af17f',
      name: {
        en: 'Heng Fa Chuen',
        'zh-hk': '杏花邨',
        'zh-cn': '杏花村'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.240501, 22.27828]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'HENG_FA_CHUEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af180',
      name: {
        en: 'Hong Kong Shue Yan University',
        'zh-hk': '樹仁大學',
        'zh-cn': '树仁大学'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.197783, 22.286417]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'HONG_KONG_SHUE_YAN_UNIVERSITY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af181',
      name: {
        en: 'North Point',
        'zh-hk': '北角',
        'zh-cn': '北角'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.197352, 22.290883]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'NORTH_POINT',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af182',
      name: {
        en: 'Quarry Bay',
        'zh-hk': '鰂魚涌',
        'zh-cn': '鲗鱼涌'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.214664, 22.287759]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'QUARRY_BAY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af183',
      name: {
        en: 'Sai Wan Ho',
        'zh-hk': '西灣河',
        'zh-cn': '西湾河'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.220659, 22.281884]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'SAI_WAN_HO',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af184',
      name: {
        en: 'Shau Kei Wan',
        'zh-hk': '筲箕灣',
        'zh-cn': '筲箕湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.226947, 22.277534]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'SHAU_KEI_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af185',
      name: {
        en: 'Siu Sai Wan',
        'zh-hk': '小西灣',
        'zh-cn': '小西湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.249203, 22.263658]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'SIU_SAI_WAN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af186',
      name: {
        en: 'Tai Koo',
        'zh-hk': '太古',
        'zh-cn': '太古'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.216136, 22.287147]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'TAI_KOO',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af187',
      name: {
        en: 'Tai Tam Road Chai Wan Section',
        'zh-hk': '大潭道 (柴灣段',
        'zh-cn': '大潭道 (柴湾段'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.233398, 22.271496]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731367ebf9313d69b2285'
      ],
      isActive: true,
      code: 'TAI_TAM_ROAD_CHAI_WAN_SECTION',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731367ebf9313d69b2285',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af188',
      name: {
        en: 'Aberdeen',
        'zh-hk': '香港仔',
        'zh-cn': '香港仔'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.156436, 22.251009]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'ABERDEEN',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af189',
      name: {
        en: 'Ap Lei Chau',
        'zh-hk': '鴨脷洲',
        'zh-cn': '鸭脷洲'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.152936, 22.242575]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'AP_LEI_CHAU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af18a',
      name: {
        en: 'Brick Hill',
        'zh-hk': '南朗山',
        'zh-cn': '南朗山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.172175, 22.243464]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'BRICK_HILL',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af18b',
      name: {
        en: 'Cape D_Aguilar',
        'zh-hk': '鶴咀',
        'zh-cn': '鹤咀'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.26671, 22.2175]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'CAPE_D_AGUILAR',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af18c',
      name: {
        en: 'Chung Hom Kok',
        'zh-hk': '春坎角',
        'zh-cn': '春坎角'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.202791, 22.21682]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'CHUNG_HOM_KOK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af18d',
      name: {
        en: 'Cyberport',
        'zh-hk': '數碼港',
        'zh-cn': '数码港'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.130721, 22.262442]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'CYBERPORT',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af18e',
      name: {
        en: 'Deep Water Bay',
        'zh-hk': '深水灣',
        'zh-cn': '深水湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.185387, 22.249438]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'DEEP_WATER_BAY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af18f',
      name: {
        en: 'Hong Kong Parkview',
        'zh-hk': '陽明山莊',
        'zh-cn': '阳明山庄'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.198497, 22.258131]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'HONG_KONH_PARKVIEW',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af190',
      name: {
        en: 'Ocean Park',
        'zh-hk': '海洋公園',
        'zh-cn': '海洋公园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.170281, 22.23529]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'OCEAN_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af191',
      name: {
        en: 'Pok Fu Lam',
        'zh-hk': '薄扶林',
        'zh-cn': '薄扶林'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.136794, 22.260483]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'POK_FU_LAM',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af192',
      name: {
        en: 'Repulse Bay',
        'zh-hk': '淺水灣',
        'zh-cn': '浅水湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.194891, 22.236374]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'REPULSE_BAY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af193',
      name: {
        en: 'Shek O',
        'zh-hk': '石澳',
        'zh-cn': '石澳'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.242683, 22.23676]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'SHEK_O',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af194',
      name: {
        en: 'Stanley',
        'zh-hk': '赤柱',
        'zh-cn': '赤柱'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.213458, 22.218933]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'STANLEY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.508Z',
      updatedAt: '2020-12-14T09:51:57.508Z'
    },

    {
      _id: '5fd735bd106d36515f8af195',
      name: {
        en: 'Tai Tam',
        'zh-hk': '大潭',
        'zh-cn': '大潭'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.210894, 22.261029]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'TAI_TAM',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af196',
      name: {
        en: 'Wong Chuk Hang',
        'zh-hk': '黃竹坑',
        'zh-cn': '黄竹坑'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.170808, 22.241508]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731ca591fe1995fe697e8'
      ],
      isActive: true,
      code: 'WONG_CHUK_HANG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731ca591fe1995fe697e8',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af197',
      name: {
        en: 'Causeway Bay',
        'zh-hk': '銅鑼灣',
        'zh-cn': '铜锣湾'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.188286, 22.281712]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'CAUSEWAY_BAY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af198',
      name: {
        en: 'Happy Valley',
        'zh-hk': '跑馬地',
        'zh-cn': '跑马地'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.184146, 22.269803]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'HAPPY_VALLEY',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af199',
      name: {
        en: 'Hong Kong Convention and Exhibition Centre',
        'zh-hk': '香港會議展覽中心',
        'zh-cn': '香港会议展览中心'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.173155, 22.283466]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'HONG_KONG_CONVENTION_AND_EXHIBITION_CENTRE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af19a',
      name: {
        en: 'Jardines Lookout',
        'zh-hk': '渣甸山',
        'zh-cn': '渣甸山'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.200213, 22.267612]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'JARDINES_LOOKOUT',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af19b',
      name: {
        en: 'Kennedy Road',
        'zh-hk': '堅尼地道',
        'zh-cn': '坚尼地道'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.16602, 22.275572]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'KENNEDY_ROAD',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af19c',
      name: {
        en: 'Mount Butler Firing Range',
        'zh-hk': '畢拉山靶場',
        'zh-cn': '毕拉山靶场'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.211246, 22.268419]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'MOUNT_BUTLER_FIRING_RANGE',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af19d',
      name: {
        en: 'Stubbs Road',
        'zh-hk': '司徒拔道',
        'zh-cn': '司徒拔道'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.178498, 22.269973]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'STUBBS_ROAD',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af19e',
      name: {
        en: 'Tai Hang',
        'zh-hk': '大坑',
        'zh-cn': '大坑'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.193634, 22.276869]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'TAI_HANG',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af19f',
      name: {
        en: 'Tin Hau',
        'zh-hk': '天后',
        'zh-cn': '天后'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.192541, 22.282978]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'TIN_HAU',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af1a0',
      name: {
        en: 'Victoria Park',
        'zh-hk': '維多利亞公園',
        'zh-cn': '维多利亚公园'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.188729, 22.282654]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'VICTORIA_PARK',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },

    {
      _id: '5fd735bd106d36515f8af1a1',
      name: {
        en: 'Wan Chai',
        'zh-hk': '灣仔',
        'zh-cn': '湾仔'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [114.174647, 22.277499]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['neighborhood'],
      ancestors: [
        '5fd730fd4a8ae5133ca9e54a',
        '5fd73120f67f4fe5c8163dbe',
        '5fd731d44aff7e9cd40d3f57'
      ],
      isActive: true,
      code: 'WAN_CHAI',
      workspace: '5ea7f40f68a8e97c03d55326',
      parent: '5fd731d44aff7e9cd40d3f57',
      __v: 0,
      createdAt: '2020-12-14T09:51:57.509Z',
      updatedAt: '2020-12-14T09:51:57.509Z'
    },
    {
      _id: '5fe04c3504008ad0daabc523',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['country'],
      ancestors: [],
      isActive: true,
      code: 'HONG_KONG',
      parent: null
    },
    {
      _id: '5fe04c3a28bc6131c73cf774',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['5fe04c3504008ad0daabc523'],
      isActive: true,
      code: 'HONG_KONG_ISLAND',
      parent: '5fe04c3504008ad0daabc523'
    },
    {
      _id: '5fe04c3fd9d4276730cea851',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['5fe04c3504008ad0daabc523'],
      isActive: true,
      code: 'KOWLOON',
      parent: '5fe04c3504008ad0daabc523'
    },
    {
      _id: '5fe04c43aba59e2ae02b2ff8',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['5fe04c3504008ad0daabc523'],
      isActive: true,
      code: 'NEW_TERRITORIES',
      parent: '5fe04c3504008ad0daabc523'
    },
    {
      _id: '5fe04c48fc31648944b51e1e',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      name: {
        en: 'Islands',
        'zh-hk': '離島',
        'zh-cn': '離島'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['5fe04c3504008ad0daabc523'],
      isActive: true,
      code: 'ISLANDS',
      parent: '5fe04c3504008ad0daabc523'
    }, // wanjhun start
    {
      _id: '603c6833c0ca3796e83e902d',
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['country'],
      ancestors: [],
      isActive: true,
      idx: 1,
      isAddress: true,
      code: 'HONG_KONG',
      workspace: '603c49b5db43c6f01a68c691',
      parent: null
    },
    {
      _id: '603c6874017b48010997ce23',
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6833c0ca3796e83e902d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c6833c0ca3796e83e902d',
      code: 'HONG_KONG_ISLAND'
    },
    {
      _id: '603c688ae5053a13d18b3c10',
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6833c0ca3796e83e902d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c6833c0ca3796e83e902d',
      code: 'KOWLOON'
    },
    {
      _id: '603c68974b1b598198bd1ede',
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6833c0ca3796e83e902d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c6833c0ca3796e83e902d',
      code: 'NEW_TERRITORIES'
    },
    {
      _id: '603c68a16b0bb112c270df63',
      name: {
        en: 'Islands',
        'zh-hk': '離島',
        'zh-cn': '离岛'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6833c0ca3796e83e902d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c6833c0ca3796e83e902d',
      code: 'ISLANDS'
    },
    {
      _id: '603c68c2d35b50b8ba852c75',
      name: {
        en: 'Central and Western',
        'zh-hk': '中西區',
        'zh-cn': '中西区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c6874017b48010997ce23'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c6874017b48010997ce23',
      code: 'CENTRAL_AND_WESTERN_DISTRICT'
    },
    {
      _id: '603c68cbb5da83737e6ed1d3',
      name: {
        en: 'Eastern',
        'zh-hk': '東區',
        'zh-cn': '东区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c6874017b48010997ce23'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c6874017b48010997ce23',
      code: 'EASTERN_DISTRICT'
    },
    {
      _id: '603c68cfbbb9aa2989ecb249',
      name: {
        en: 'Southern',
        'zh-hk': '南區',
        'zh-cn': '南区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c6874017b48010997ce23'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c6874017b48010997ce23',
      code: '东区'
    },
    {
      _id: '603c68d6f7d0a5eeb6453a6c',
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍東',
        'zh-cn': '九龙東'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c688ae5053a13d18b3c10'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c688ae5053a13d18b3c10',
      code: 'KOWLOON_EAST'
    },
    {
      _id: '603c68db8081c5680806f700',
      name: {
        en: 'Kowloon West',
        'zh-hk': '九龍西',
        'zh-cn': '九龙西'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c688ae5053a13d18b3c10'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c688ae5053a13d18b3c10',
      code: 'KOWLOON_WEST'
    },
    {
      _id: '603c68e18026ad469b16f2be',
      name: {
        en: 'NT North',
        'zh-hk': '新界北',
        'zh-cn': '新界北'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c68974b1b598198bd1ede'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c68974b1b598198bd1ede',
      code: 'NT_NORTH'
    },
    {
      _id: '603c68e7cbac806423355928',
      name: {
        en: 'NT West',
        'zh-hk': '新界西',
        'zh-cn': '新界西'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c68974b1b598198bd1ede'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c68974b1b598198bd1ede',
      code: 'NT_WEST'
    },
    {
      _id: '603c68ed146bde2595e1582e',
      name: {
        en: 'NT East',
        'zh-hk': '新界東',
        'zh-cn': '新界东'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c68974b1b598198bd1ede'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c68974b1b598198bd1ede',
      code: 'NT_EAST'
    },
    {
      _id: '603c68f22560d41c0d255eec',
      name: {
        en: 'Islands',
        'zh-hk': '離島區',
        'zh-cn': '离岛区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6833c0ca3796e83e902d', '603c68a16b0bb112c270df63'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c49b5db43c6f01a68c691',
      parent: '603c68a16b0bb112c270df63',
      code: 'ISLANDS_DISTRICT'
    },
    // wanjhun end

    // gaamsing start
    {
      _id: '603c6a3bf1afc9347ab5c50d',
      name: {
        en: 'Hong Kong',
        'zh-hk': '香港',
        'zh-cn': '香港'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['country'],
      ancestors: [],
      isActive: true,
      idx: 1,
      isAddress: true,
      code: 'HONG_KONG',
      workspace: '603c4a3dc77d84287d986486',
      parent: null
    },
    {
      _id: '603c6a42282405a5ed25a6fc',
      name: {
        en: 'Hong Kong Island',
        'zh-hk': '香港島',
        'zh-cn': '香港岛'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6a3bf1afc9347ab5c50d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a3bf1afc9347ab5c50d',
      code: 'HONG_KONG_ISLAND'
    },
    {
      _id: '603c6a4a8eeed5b576f6bb9a',
      name: {
        en: 'Kowloon',
        'zh-hk': '九龍',
        'zh-cn': '九龙'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6a3bf1afc9347ab5c50d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a3bf1afc9347ab5c50d',
      code: 'KOWLOON'
    },
    {
      _id: '603c6a5205e44707d6323453',
      name: {
        en: 'New Territories',
        'zh-hk': '新界',
        'zh-cn': '新界'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6a3bf1afc9347ab5c50d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a3bf1afc9347ab5c50d',
      code: 'NEW_TERRITORIES'
    },
    {
      _id: '603c6a5bc19cf6f38ddbe083',
      name: {
        en: 'Islands',
        'zh-hk': '離島',
        'zh-cn': '离岛'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['administrative_area_level_1'],
      ancestors: ['603c6a3bf1afc9347ab5c50d'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a3bf1afc9347ab5c50d',
      code: 'ISLANDS'
    },
    {
      _id: '603ca265d9d7b27611312ad2',
      name: {
        en: 'Central and Western',
        'zh-hk': '中西區',
        'zh-cn': '中西区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a42282405a5ed25a6fc'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a42282405a5ed25a6fc',
      code: 'CENTRAL_AND_WESTERN_DISTRICT'
    },
    {
      _id: '603ca26eed1659b854fa6edb',
      name: {
        en: 'Eastern',
        'zh-hk': '東區',
        'zh-cn': '东区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a42282405a5ed25a6fc'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a42282405a5ed25a6fc',
      code: 'EASTERN_DISTRICT'
    },
    {
      _id: '603ca272ab53cfca75d93b8f',
      name: {
        en: 'Southern',
        'zh-hk': '南區',
        'zh-cn': '南区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a42282405a5ed25a6fc'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a42282405a5ed25a6fc',
      code: '东区'
    },
    {
      _id: '603ca278cd1ac56303153a80',
      name: {
        en: 'Kowloon City',
        'zh-hk': '九龍東',
        'zh-cn': '九龙東'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a4a8eeed5b576f6bb9a'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a4a8eeed5b576f6bb9a',
      code: 'KOWLOON_EAST'
    },
    {
      _id: '603ca27feb144d2d68f12fb9',
      name: {
        en: 'Kowloon West',
        'zh-hk': '九龍西',
        'zh-cn': '九龙西'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a4a8eeed5b576f6bb9a'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a4a8eeed5b576f6bb9a',
      code: 'KOWLOON_WEST'
    },
    {
      _id: '603ca284f67d20e432af4de8',
      name: {
        en: 'NT North',
        'zh-hk': '新界北',
        'zh-cn': '新界北'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a5205e44707d6323453'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a5205e44707d6323453',
      code: 'NT_NORTH'
    },
    {
      _id: '603ca297d8fc9b4cfb724119',
      name: {
        en: 'NT West',
        'zh-hk': '新界西',
        'zh-cn': '新界西'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a5205e44707d6323453'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a5205e44707d6323453',
      code: 'NT_WEST'
    },
    {
      _id: '603ca2a3d3053aaaf4d6214e',
      name: {
        en: 'NT East',
        'zh-hk': '新界東',
        'zh-cn': '新界东'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a5205e44707d6323453'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a5205e44707d6323453',
      code: 'NT_EAST'
    },
    {
      _id: '603c6aa092edf3c1a1035661',
      name: {
        en: 'Islands',
        'zh-hk': '離島區',
        'zh-cn': '离岛区'
      },
      location: {
        properties: {
          name: '',
          regions: []
        },
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        type: 'Feature'
      },
      type: 'region',
      subTypes: ['district'],
      ancestors: ['603c6a3bf1afc9347ab5c50d', '603c6a5bc19cf6f38ddbe083'],
      isActive: true,
      idx: 1,
      isAddress: true,
      workspace: '603c4a3dc77d84287d986486',
      parent: '603c6a5bc19cf6f38ddbe083',
      code: 'ISLANDS_DISTRICT'
    }
    // gaamsing end
  ]
};
