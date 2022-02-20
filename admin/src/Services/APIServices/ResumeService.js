import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getResumeByUserId = (id, query) =>
  ecommApi.get('resumes/user/' + id + '?' + serialize(query));

export default {
  getResumeByUserId
};
