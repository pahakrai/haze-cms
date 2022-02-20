import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

export const getFeedbackById = (_id, search) =>
  ecommApi.get(`feedbacks/${_id}?` + serialize(search));
export const getFeedbacks = search =>
  ecommApi.get('feedbacks?' + serialize(search));
export const self = ecommApi;

export default {
  self: ecommApi,
  getFeedbackById,
  getFeedbacks
};
