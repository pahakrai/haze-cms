module.exports = {
  model: 'SubscriptionPlans',
  documents: [
    {
      _id: '5fc85bcbcb5bae73391a0a64',
      productId: 'prod_IFrErSHGHaFree',
      code: 'free',
      name: {
        en: 'Free',
        'zh-cn': '免费',
        'zh-hk': '免費'
      },
      description: {
        en: 'Free plan',
        'zh-cn': '标准计划',
        'zh-hk': '免費計劃'
      },
      pricings: [
        {
          apiId: 'price_1HtswGKGfT7SsVigGnQ0SClQ',
          currency: 'USD',
          amount: 0,
          unit: 'monthly'
        },
        {
          apiId: 'price_1HH69H2eZvKYlo2C4Asj8t6Q',
          currency: 'HKD',
          amount: 0,
          unit: 'monthly'
        }
      ],
      items: [
        {
          // user
          item: '5f3d2062a1dba9441ec0b3e9',
          value: 2
        },
        {
          // storage
          item: '5fc765e2f5fc4e5319e5028f',
          value: 10
        },
        {
          // orders
          item: '5fc85080e8960f8037291a41',
          value: 100
        }
      ],
      isActive: true
    },
    {
      _id: '5f3d206ab542c5591aa203a5',
      productId: 'prod_IFrErSHGHaPYPW',
      code: 'standard',
      name: {
        en: 'Standard',
        'zh-cn': '标准',
        'zh-hk': '標準'
      },
      description: {
        en: 'Standard plan',
        'zh-cn': '标准计划',
        'zh-hk': '標準計劃'
      },
      pricings: [
        {
          apiId: 'price_1HtswGKGfT7SsVigGnQ0SClQ',
          currency: 'USD',
          amount: 10,
          unit: 'monthly'
        },
        {
          apiId: 'price_1HH69H2eZvKYlo2C4Asj8t6Q',
          currency: 'HKD',
          amount: 88,
          unit: 'monthly'
        }
      ],
      items: [
        {
          // user
          item: '5f3d2062a1dba9441ec0b3e9',
          value: 2
        },
        {
          // storage
          item: '5fc765e2f5fc4e5319e5028f',
          value: 10
        },
        {
          // orders
          item: '5fc85080e8960f8037291a41',
          value: 100
        }
      ],
      isActive: true
    },
    {
      _id: '5fc769b107df529d64c14790',
      productId: 'prod_IFrErSHGHaXXXX',
      code: 'premium',
      name: {
        en: 'Premium',
        'zh-cn': '优质',
        'zh-hk': '優質'
      },
      description: {
        en: 'Premium plan',
        'zh-cn': '优质计划',
        'zh-hk': '優質計劃'
      },
      unit: 'monthly',
      pricings: [
        {
          apiId: 'price_1HtswGKGfT7SsVigGnQ0SClQ',
          currency: 'USD',
          amount: 49,
          unit: 'monthly'
        },
        {
          apiId: 'price_1HH69H2eZvKYlo2C4Asj8t6Q',
          currency: 'HKD',
          amount: 499,
          unit: 'monthly'
        }
      ],
      items: [
        {
          item: '5f3d2062a1dba9441ec0b3e9',
          value: 5
        },
        {
          item: '5fc765e2f5fc4e5319e5028f',
          value: 100
        },
        {
          item: '5fc85080e8960f8037291a41',
          value: 1000
        }
      ],
      isActive: true
    },
    {
      _id: '5fc850cd454b712fb74d328e',
      productId: 'prod_IFrErSHGHaYYYY',
      code: 'enterprise',
      name: {
        en: 'Enterprise',
        'zh-cn': '企业',
        'zh-hk': '企業'
      },
      description: {
        en: 'Enterprise plan',
        'zh-cn': '企业计划',
        'zh-hk': '企業計劃'
      },
      unit: 'monthly',
      pricings: [
        {
          apiId: 'price_1HtswGKGfT7SsVigGnQ0SClQ',
          currency: 'USD',
          amount: 99,
          unit: 'monthly'
        },
        {
          apiId: 'price_1HH69H2eZvKYlo2C4Asj8t6Q',
          currency: 'HKD',
          amount: 799,
          unit: 'monthly'
        }
      ],
      items: [
        {
          item: '5f3d2062a1dba9441ec0b3e9',
          value: 15
        },
        {
          item: '5fc765e2f5fc4e5319e5028f',
          value: 0
        },
        {
          item: '5fc85080e8960f8037291a41',
          value: 0
        }
      ],
      isActive: true
    }
  ]
};
