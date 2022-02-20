import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getSubscriptionLogs = search =>
  ecommApi.get('feedbacks/find/subscription-logs?' + serialize(search));

export const self = ecommApi;

export default {
  self: ecommApi,
  getSubscriptionLogs
};
