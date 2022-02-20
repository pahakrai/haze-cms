import { createActions } from 'reduxsauce';

export const { Types: PricingsTypes, Creators: PrcingsActions } = createActions(
  {
    /* ------------- Sagas ------------- */
    getPricingsList: ['opts', 'locFr', 'locTo', 'vehicleType'],
    getPricingById: ['id'],
    updatePricingsById: ['id', 'value'],
    createPricingService: ['formValues'],
    createPricingTunnel: ['formValues'],
    updatePricingTunnel: ['formValues'],
    updatePricing: ['formValues'],
    getPricingTunnel: ['opts'],
    /* ------------- Reducers ------------- */
    setSelected: ['id'],
    setSearchTerm: ['searchTerm'],
    setResults: ['results'],
    setPricingResults: ['pricingResults'],
    setAllResults: ['allResults'],
    mergeResults: ['results']
  },
  { prefix: 'Pricings/' }
);
