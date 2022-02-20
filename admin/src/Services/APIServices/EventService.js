import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getEvents = opts => {
  return ecommApi.get('/events?' + serialize(opts));
};

const getEventById = (id, opts) => {
  return ecommApi.get('/events/' + id + '?' + serialize(opts));
};

const createEvent = formValues => {
  return ecommApi.post(`/events`, formValues);
};

const updateEvent = formValues => {
  return ecommApi.put(`/events/` + formValues._id, formValues);
};

const getMyEvents = opts => {
  return ecommApi.get('/events/my-events?' + serialize(opts));
};
const completeEvent = id => {
  return ecommApi.patch(`/events/${id}/complete`);
};

const getEventReport = opts => {
  return ecommApi.get('events/event/report?' + serialize(opts));
};

const updateRemarks = (id, formValues) => {
  return ecommApi.put(`/events/${id}/remarks`, formValues);
};

const multipleComplete = ids => {
  return ecommApi.patch(`/events/complete-by-ids`, { ids });
};

export default {
  self: ecommApi,
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
};
