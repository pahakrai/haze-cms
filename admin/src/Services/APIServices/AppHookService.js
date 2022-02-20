import { ecommApi } from '../APIs';

const getAppHookByName = name => ecommApi.get(`/app-hooks?app=${name}`);

const getAllAppHook = () => ecommApi.get('/app-hooks');

const getAllAppHookName = () => ecommApi.get('/app-hooks/app-names');

export default {
  getAppHookByName,
  getAllAppHook,
  getAllAppHookName
};
