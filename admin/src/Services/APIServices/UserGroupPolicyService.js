import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUserGroupPolicys = async query =>
  ecommApi.get(query ? `/policies?${serialize(query)}` : '/policies');

const getUserGroupPolicyByCode = code => ecommApi.get(`policies/code/${code}`);

export default {
  getUserGroupPolicys,
  getUserGroupPolicyByCode
};
