import { createActions } from 'reduxsauce';

export const {
  Types: PhoneRegionTypes,
  Creators: PhoneRegionActions
} = createActions(
  {
    getAllPhoneRegions: null,
    setAllPhoneRegions: ['_ids']
  },
  { prefix: '_PHONE_REGION_' }
);

export default PhoneRegionActions;
