const moment = require('moment');
const {default: common} = require('@golpasal/common');

const {TransactionType, AmountType} = common.type;

module.exports = {
  model: 'UserCredits',
  documents: [
    {
      _id: '5e493c6d4b97aad0264e2e07',
      user: '5b2b43720b6fbf38cdcec90b',
      transactionDate: moment()
        .subtract(1, 'day')
        .startOf('day')
        .hour(20)
        .minute(2)
        .toDate(),
      description: 'From class 5ecce94965de19502d04ccf4',
      transactionType: TransactionType.IN,
      amountType: AmountType.POINT,
      currency: null,
      amount: 1,
      balance: 1
    },

    {
      _id: '5f8557e458ff1321f859b550',
      description: 'From class 5f8547d507744c2c76bd48d1',
      currency: null,
      user: '5f61bb8a704fe95d3edd5e7e',
      transactionDate: '2020-10-13T07:31:48.454Z',
      transactionType: 'in',
      amountType: 'point',
      amount: 15,
      balance: 15,
      createdAt: '2020-10-13T07:31:48.528Z',
      updatedAt: '2020-10-13T07:31:48.528Z',
      __v: 0
    },
    {
      _id: '5f855f17e9dbda2313353716',
      description: 'From class 5f8547d907744c2c76bd48d2',
      currency: null,
      user: '5f61bb8a704fe95d3edd5e7e',
      transactionDate: '2020-10-13T08:02:31.239Z',
      transactionType: 'in',
      amountType: 'point',
      amount: 5,
      balance: 20,
      createdAt: '2020-10-13T08:02:31.296Z',
      updatedAt: '2020-10-13T08:02:31.296Z',
      __v: 0
    }
  ]
};
