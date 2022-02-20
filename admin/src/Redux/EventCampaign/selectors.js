import { createSelector } from 'reselect';

export const getEventCampaignsFromRes = createSelector(
  state => state.resources.eventCampaign,
  eventCampaigns =>
    eventCampaigns &&
    Object.keys(eventCampaigns).map(_id => eventCampaigns[_id])
);
