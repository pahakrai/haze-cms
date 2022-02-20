import ObjectID from 'bson-objectid';
import display from './display';
import context from './context';

export default {
  display,
  context,
  new: (obj = {}) => ({
    _id: `${ObjectID()}`,
    type: 'businessVolume',
    typeId: '',
    data: {},
    ...obj,
    layout: {
      x: 0,
      y: 0,
      w: 3,
      h: 1,
      isResizable: false,
      isCloseable: false,
      ...(obj.layout || {})
    }
  })
};
