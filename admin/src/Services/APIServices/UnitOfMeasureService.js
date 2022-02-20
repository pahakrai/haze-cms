import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getUnitOfMeasures = opts => {
  return ecommApi.get('/unit-of-measures?' + serialize(opts));
};

const getUnitOfMeasureById = id => {
  return ecommApi.get('/unit-of-measures/' + id);
};

const createUnitOfMeasure = formValues => {
  return ecommApi.post(`/unit-of-measures`, formValues);
};

const updateUnitOfMeasure = formValues => {
  return ecommApi.put(`/unit-of-measures/` + formValues._id, formValues);
};

export default {
  self: ecommApi,
  createUnitOfMeasure,
  getUnitOfMeasureById,
  getUnitOfMeasures,
  updateUnitOfMeasure
};
