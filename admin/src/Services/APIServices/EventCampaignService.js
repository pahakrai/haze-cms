import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getEventCampaigns = opts => {
  return ecommApi.get('/event-campaigns?' + serialize(opts));
};

const getEventCampaignById = (id, query) => {
  return ecommApi.get('/event-campaigns/' + id + '?' + serialize(query));
};

const createEventCampaign = formValues => {
  return ecommApi.post(`/event-campaigns`, formValues);
};

const updateEventCampaign = formValues => {
  return ecommApi.put(`/event-campaigns/` + formValues._id, formValues);
};

const updateProgressEventCampaign = (_id, formValues) => {
  return ecommApi.put(`/event-campaigns/${_id}/follow-up/`, formValues);
};

export const searchEventCampaigns = ({ q, query }) =>
  ecommApi.get('event-campaigns?' + serialize({ q, ...query }));

const getEventCampaignProgress = opts => {
  return ecommApi.get('/event-campaigns/progress?' + serialize(opts));
};
const getEventCampaignsNotOrdered = ({ q, query }) =>
  ecommApi.get('/event-campaigns/not-ordered?' + serialize({ q, ...query }));

export default {
  self: ecommApi,
  createEventCampaign,
  getEventCampaignById,
  getEventCampaigns,
  updateEventCampaign,
  searchEventCampaigns,
  getEventCampaignProgress,
  updateProgressEventCampaign,
  getEventCampaignsNotOrdered
};
