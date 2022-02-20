import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUserCredits = query =>
  ecommApi.get(`/user-credits?${serialize(query)}`);

const createUserCredit = transaction =>
  ecommApi.post(`/user-credits`, transaction);

const getUserCreditByUId = uid => ecommApi.get('user-credits/' + uid);

const getUserAllCreditByUId = uid => ecommApi.get(`/user-credits/${uid}/all`);

export default {
  createUserCredit,
  getUserCreditByUId,
  getUserCredits,
  getUserAllCreditByUId
};
