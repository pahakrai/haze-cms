import { createActions } from 'reduxsauce';

export const {
  Types: NotificationScheduleTypes,
  Creators: NotificationScheduleActions
} = createActions(
  {
    getNotificationSchedules: ['opts'],
    getNotificationScheduleById: ['id'],
    getNotificationScheduleForm: ['id'],
    createNotificationSchedule: ['notificationScheduleForm', 'images'],
    updateNotificationSchedule: ['notificationScheduleForm', 'images'],

    setResults: ['results'],
    setSearchResults: ['results'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm'],
    // toggleActive: ['id', 'isActive'],
    changeStatus: ['id', 'status'],
    setNotificationScheduleForm: ['notificationScheduleForm']
  },
  { prefix: 'NotificationSchedule/' }
);
