import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getShipments = (query) => hazeApi.get(`/shipments?${serialize(query)}`)

const getShipmentById = (id, query) => {
  return hazeApi.get('/shipments/' + id + '?' + serialize(query))
}
const createShipment = (shipment) => hazeApi.post(`shipments`, shipment)

const updateShipment = (shipment) =>
  hazeApi.put(`shipments/${shipment._id}`, shipment)

const updateShipmentStatus = (id, status) =>
  hazeApi.patch(`shipments/${id}/status/${status}`)

export default {
  getShipments,
  getShipmentById,
  createShipment,
  updateShipment,
  updateShipmentStatus
}
