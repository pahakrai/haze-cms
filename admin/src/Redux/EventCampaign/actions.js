import { createActions } from 'reduxsauce';

export const {
  Types: EventCampaignTypes,
  Creators: EventCampaignActions
} = createActions(
  {
    /* ------------- Sagas ------------- */
    getEventCampaigns: ['opts'],
    searchEventCampaigns: ['q', 'opts'],
    getEventCampaignById: ['id', 'opts'],
    updateEventCampaign: ['formValues'],
    createEventCampaign: ['formValues'],
    updateProgressEventCampaign: ['id', 'formValues'],
    getEventCampaignProgress: ['opts'],
    getEventCampaignsNotOrdered: ['q', 'opts'],

    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    mergeResults: ['results'],
    setResults: ['results'],
    setSearchResults: ['results'],
    setNotOrderedResults: ['results']
  },
  { prefix: 'EventCampaign/' }
);
