import { hazeApi } from '../APIs'
import { serialize } from './ServiceUtils'

const getNotificationSchedules = async (query) => {
  const queryString = serialize(query)
  const response = await hazeApi.get('/notification-schedules?' + queryString)
  return response
}

const getNotificationScheduleById = (_id) =>
  hazeApi.get('notification-schedules/' + _id)

const createNotificationSchedule = (notificationScheduleForm, images) => {
  const data = new FormData()
  if (images) images.forEach((f) => data.append(`files`, f))
  data.append('notificationSchedule', JSON.stringify(notificationScheduleForm))
  return hazeApi.post('notification-schedules', data)
}

const updateNotificationSchedule = (notificationScheduleForm, images) => {
  const data = new FormData()
  if (images) images.forEach((f) => data.append(`files`, f))
  data.append('notificationSchedule', JSON.stringify(notificationScheduleForm))
  return hazeApi.put(
    'notification-schedules/' + notificationScheduleForm._id,
    data
  )
}

const toggleActive = (_id, isActive) =>
  hazeApi.put(`notification-schedules/change-status/${_id}/${isActive}`)

const changeStatus = (_id, status) =>
  hazeApi.put(`notification-schedules/change-status/${_id}/${status}`)

export default {
  self: hazeApi,
  getNotificationScheduleById,
  getNotificationSchedules,
  createNotificationSchedule,
  updateNotificationSchedule,
  toggleActive,
  changeStatus
}
