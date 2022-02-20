import { createActions } from 'reduxsauce';

export const { Types: OrderTypes, Creators: OrderActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getOrders: ['opts'],
    getOrderById: ['id', 'query'],
    updateOrder: ['formValues'],
    updateOrderStatus: ['id', 'status'],
    createOrder: ['formValues'],
    cancelOrder: ['id'],
    releaseOrder: ['id'],
    importOrder: ['files'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Order/' }
);
