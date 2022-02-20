import ObjectID from 'bson-objectid';
import display from './display';
import context from './context';

export default {
  display,
  context,
  new: (obj = {}) => ({
    _id: `${ObjectID()}`,
    type: 'lineGraph',
    typeId: '',
    data: {},
    ...obj,
    layout: {
      x: 0,
      y: 0,
      w: 6,
      h: 2,
      isCloseable: false,
      ...(obj.layout || {})
    }
  })
};
