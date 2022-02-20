import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getEventAttendances = opts => {
  return ecommApi.get('/event-attendance?' + serialize(opts));
};

const getEventAttendanceById = id => {
  return ecommApi.get('/event-attendance/' + id);
};
const getEventAttendanceByEventId = (id, opts) => {
  return ecommApi.get(`/event-attendance/snapshot/${id}?` + serialize(opts));
};

const createEventAttendance = formValues => {
  return ecommApi.post(`/event-attendance`, formValues);
};

const updateEventAttendance = formValues => {
  return ecommApi.put(`/event-attendance/` + formValues._id, formValues);
};

/**
 * @param {event} string
 * @param {user} string
 * @param {attendanceType} AttendanceType
 */
const changeEventAttendanceType = type => (opts = {}) => {
  return ecommApi.put(`/event-attendance/take-attendance/${type}`, opts);
};

export default {
  self: ecommApi,
  createEventAttendance,
  getEventAttendanceById,
  getEventAttendances,
  updateEventAttendance,
  getEventAttendanceByEventId,
  eventAttendanceAbsense: changeEventAttendanceType('absense'),
  eventAttendancePresense: changeEventAttendanceType('presense'),
  eventAttendanceSickLeave: changeEventAttendanceType('sick-leave'),
  eventAttendanceLate: changeEventAttendanceType('late'),
  eventAttendanceEarlyLeave: changeEventAttendanceType('early-leave')
};
