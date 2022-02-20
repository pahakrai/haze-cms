import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getShipments = query => ecommApi.get(`/shipments?${serialize(query)}`);

const getShipmentById = (id, query) => {
  return ecommApi.get('/shipments/' + id + '?' + serialize(query));
};
const createShipment = shipment => ecommApi.post(`shipments`, shipment);

const updateShipment = shipment =>
  ecommApi.put(`shipments/${shipment._id}`, shipment);

const updateShipmentStatus = (id, status) =>
  ecommApi.patch(`shipments/${id}/status/${status}`);

export default {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  updateShipmentStatus
};
