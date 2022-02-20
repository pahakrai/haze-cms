import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getSurveies = opts => {
  return ecommApi.get('/surveys?' + serialize(opts));
};

const getSurveyById = id => {
  return ecommApi.get(`/surveys/${id}`);
};

const createSurvey = formValues => {
  return ecommApi.post(`/surveys`, formValues);
};

const updateSurvey = formValues => {
  return ecommApi.put(`/surveys/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createSurvey,
  getSurveyById,
  getSurveies,
  updateSurvey
};
