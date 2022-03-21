import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getEvents = (opts) => {
  return hazeApi.get('/events?' + serialize(opts))
}

const getEventById = (id, opts) => {
  return hazeApi.get('/events/' + id + '?' + serialize(opts))
}

const createEvent = (formValues) => {
  return hazeApi.post(`/events`, formValues)
}

const updateEvent = (formValues) => {
  return hazeApi.put(`/events/` + formValues._id, formValues)
}

const getMyEvents = (opts) => {
  return hazeApi.get('/events/my-events?' + serialize(opts))
}
const completeEvent = (id) => {
  return hazeApi.patch(`/events/${id}/complete`)
}

const getEventReport = (opts) => {
  return hazeApi.get('events/event/report?' + serialize(opts))
}

const updateRemarks = (id, formValues) => {
  return hazeApi.put(`/events/${id}/remarks`, formValues)
}

const multipleComplete = (ids) => {
  return hazeApi.patch(`/events/complete-by-ids`, { ids })
}

export default {
  self: hazeApi,
  serialize,
  createEvent,
  getEventById,
  getEvents,
  updateEvent,
  getMyEvents,
  completeEvent,
  getEventReport,
  updateRemarks,
  multipleComplete
}
