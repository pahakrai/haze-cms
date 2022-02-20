import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getSurveyResponses = query =>
  ecommApi.get(`/survey-responses?${serialize(query)}`);

const getSurveyResponseById = (id, opts) => {
  return ecommApi.get(`/survey-responses/${id}?${serialize(opts)}`);
};

export default {
  getSurveyResponses,
  getSurveyResponseById
};
