import { createActions } from 'reduxsauce';

export const {
  Types: UserSchedulePermissionTypes,
  Creators: UserSchedulePermissionActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getUserSchedulePermissions: ['opts'],
    changeUserScheduleStatus: ['value'],
    userScheduleStatusLoading: ['id'],
    getUserSchedulePermissionById: ['id'],

    /* ------------- Reducers ------------- */
    mergeResults: ['results'],
    setResults: ['results']
  },
  { prefix: 'UserSchedulePermission/' }
);
