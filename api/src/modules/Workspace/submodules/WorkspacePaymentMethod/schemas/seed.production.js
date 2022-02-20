module.exports = {
  model: 'WorkspacePaymentMethods',
  documents: [
    /**
     * Dr iKids
     */
    {
      _id: '5ed8c779bb58803d3de6b678',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      // stripe
      paymentMethod: '5ed76ef70cbf0ed638ac49e6',
      isActive: true,
      url: 'test',
      platforms: ['web'],
      credential: {
        publicKey:
          'pk_test_51HIqA0Co5qvXMjAvr1GlddgoRNhOcMv50zEA8OkpIOg9FU0XFNRtF1Vahzqy885zVjmxABN7LRo8fBEQXR2i0FYx00WpSWrbr7',
        secretKey:
          'sk_test_51HIqA0Co5qvXMjAvGlXZ7FIFPNDLpCZWEhnjXpInNGc6qnFPW7dpcRszURu3zLnB8fgVpWfwDoXSdc8AQ7Crn28t00wCXkZPfx'
      },
      defaultCurrency: 'HKD',
      chargeValue: 3.4,
      chargeSymbol: '%',
      adminCharge: 2.35
    },
    {
      _id: '600b875faff2e5b4683367e1',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      isActive: true,
      platforms: ['web'],
      defaultCurrency: 'HKD',
      chargeValue: 0,
      chargeSymbol: '%',
      adminCharge: 0,
      // ATM
      paymentMethod: '600b848643500f4c0e2ac27e'
    },
    {
      _id: '600b88c4c4688e7d57ad27e8',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      // PayMe
      paymentMethod: '600b855aa24cc3c02869ab4b',
      isActive: true,
      platforms: ['web'],
      defaultCurrency: 'HKD',
      chargeValue: 4,
      chargeSymbol: '%',
      adminCharge: 2.5
    },
    {
      _id: '600b88bed7958241c431ce73',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      // FPS
      paymentMethod: '600b857629578b553bfc005c',
      isActive: true,
      platforms: ['web'],
      defaultCurrency: 'HKD',
      chargeValue: 0,
      chargeSymbol: '%',
      adminCharge: 0
    },
    {
      _id: '600b88b999c9e57127239859',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      // Cheque
      paymentMethod: '5fd9e279aaac223281884717',
      isActive: true,
      platforms: ['web'],
      defaultCurrency: 'HKD',
      chargeValue: 0,
      chargeSymbol: '%',
      adminCharge: 0
    },
    {
      _id: '600b88ad39d757250852dc4c',
      workspace: '5e9fcae14fc78a87a9bc4c11',
      // cod
      paymentMethod: '5fd9e2ba1e9d0d5b9fea0e33',
      isActive: true,
      platforms: ['web'],
      defaultCurrency: 'HKD',
      chargeValue: 0,
      chargeSymbol: '%',
      adminCharge: 0
    },
    // taxi
    {
      _id: '5fe048bcf677494cac5e5be7',
      workspace: '5fe02d4db3ca9dfa8170b5ca',
      url: 'test',
      isActive: true,
      platforms: ['merchantApp'],
      defaultCurrency: 'HKD',
      chargeValue: 0,
      chargeSymbol: '%',
      adminCharge: 0,
      // atm
      paymentMethod: '600b848643500f4c0e2ac27e'
    },
    // fstravel
    {
      _id: '6006bc10060ae557e30249b6',
      workspace: '5fd83be73db74d57b304cb82',
      url: 'test',
      isActive: true,
      platforms: ['admin'],
      defaultCurrency: 'HKD',
      chargeValue: 0,
      chargeSymbol: '%',
      adminCharge: 0,
      // atm
      paymentMethod: '600b848643500f4c0e2ac27e'
    },
    {
      _id: '60128914afa1cb6a0bbd2136',
      workspace: '5fd83be73db74d57b304cb82',
      // stripe
      paymentMethod: '5ed76ef70cbf0ed638ac49e6',
      isActive: true,
      platforms: ['web'],
      credential: {
        publicKey:
          'pk_test_51HIqA0Co5qvXMjAvr1GlddgoRNhOcMv50zEA8OkpIOg9FU0XFNRtF1Vahzqy885zVjmxABN7LRo8fBEQXR2i0FYx00WpSWrbr7',
        secretKey:
          'sk_test_51HIqA0Co5qvXMjAvGlXZ7FIFPNDLpCZWEhnjXpInNGc6qnFPW7dpcRszURu3zLnB8fgVpWfwDoXSdc8AQ7Crn28t00wCXkZPfx'
      },
      defaultCurrency: 'HKD',
      chargeValue: 3.4,
      chargeSymbol: '%',
      adminCharge: 2.35
    }
  ]
};
