import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getSalesVolumes = opts =>
  ecommApi.get(`sales-volumes?` + serialize(opts));
const createSalesVolume = formValues =>
  ecommApi.post('sales-volumes', formValues);
const updateSalesVolume = formValues => {
  return ecommApi.put(`/sales-volumes/` + formValues._id, formValues);
};

const getSalesVolumesByYear = query => {
  return ecommApi.get(`sales-volumes/year-overview?` + serialize(query));
};
const getSalesVolumesByMonth = query => {
  return ecommApi.get(`sales-volumes/month-overview?` + serialize(query));
};

const getSalesVolumeById = (id, query) =>
  ecommApi.get('sales-volumes/' + id + '?' + serialize(query));

export default {
  getSalesVolumes,
  createSalesVolume,
  updateSalesVolume,
  getSalesVolumeById,
  getSalesVolumesByYear,
  getSalesVolumesByMonth
};
