import { createActions } from 'reduxsauce';

export const {
  Types: UserGroupPolicyTypes,
  Creators: UserGroupPolicyActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getUserGroupPolicys: ['opts'],
    getUserGroupPolicyByCode: ['code'],
    /* ------------- Reducers ------------- */
    mergeResults: ['results'],
    setResults: ['results'],
    setAccessPermission: ['AccessKey', 'value']
  },
  { prefix: 'UserGroupPolicy/' }
);
