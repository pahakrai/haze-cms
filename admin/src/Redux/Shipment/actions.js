import { createActions } from 'reduxsauce';

export const {
  Types: ShipmentTypes,
  Creators: ShipmentActions
} = createActions(
  {
    getShipments: ['opts'],
    getShipmentById: ['id', 'query'],
    createShipment: ['formValues'],
    updateShipment: ['formValues'],
    getShipmentByOrderId: ['orderId'],
    updateShipmentStatus: ['id', 'status'],

    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'Shipment/' }
);
