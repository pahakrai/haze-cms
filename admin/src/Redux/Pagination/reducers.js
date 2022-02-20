import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { resetField, reset } from '../utils/reducer';
import { setArray, getFieldVal } from '../utils';
import { Types } from './actions';

const DEFAULT_PAGINATION_SETTING = {
  offset: 0,
  limit: 10,
  page: 0,
  total: 0,
  fetching: false,
  isEnd: false,
  refreshing: true
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  deviceActivities: DEFAULT_PAGINATION_SETTING,
  devices: DEFAULT_PAGINATION_SETTING,
  user: DEFAULT_PAGINATION_SETTING,
  userCredits: { ...DEFAULT_PAGINATION_SETTING, limit: 7 },
  partners: DEFAULT_PAGINATION_SETTING,
  logs: DEFAULT_PAGINATION_SETTING,
  posts: DEFAULT_PAGINATION_SETTING,
  postComments: DEFAULT_PAGINATION_SETTING,
  workspaces: DEFAULT_PAGINATION_SETTING,
  dataMappings: DEFAULT_PAGINATION_SETTING,
  userGroups: DEFAULT_PAGINATION_SETTING,
  userSchedulePermissions: DEFAULT_PAGINATION_SETTING,
  userGroupPolicys: DEFAULT_PAGINATION_SETTING,
  orders: DEFAULT_PAGINATION_SETTING,
  tags: DEFAULT_PAGINATION_SETTING,
  vehicleTypes: DEFAULT_PAGINATION_SETTING,
  tunnel: DEFAULT_PAGINATION_SETTING,
  pages: DEFAULT_PAGINATION_SETTING,
  pageTemplates: { ...DEFAULT_PAGINATION_SETTING, limit: 1000 },
  pageSection: { ...DEFAULT_PAGINATION_SETTING, limit: 1000 },
  vehicleMakes: DEFAULT_PAGINATION_SETTING,
  vehicleModels: DEFAULT_PAGINATION_SETTING,
  vehicles: DEFAULT_PAGINATION_SETTING,
  searchSelectVehicles: DEFAULT_PAGINATION_SETTING,
  searchProducts: DEFAULT_PAGINATION_SETTING,
  searchProductSkus: DEFAULT_PAGINATION_SETTING,
  drivers: DEFAULT_PAGINATION_SETTING,
  feedbacks: { ...DEFAULT_PAGINATION_SETTING, limit: 7 },
  pricings: DEFAULT_PAGINATION_SETTING,
  intervals: DEFAULT_PAGINATION_SETTING,
  notificationSchedules: DEFAULT_PAGINATION_SETTING,
  edms: { ...DEFAULT_PAGINATION_SETTING, limit: 12 },
  unitOfMeasures: DEFAULT_PAGINATION_SETTING,
  products: DEFAULT_PAGINATION_SETTING,
  payrolls: DEFAULT_PAGINATION_SETTING,
  merchants: DEFAULT_PAGINATION_SETTING,
  events: DEFAULT_PAGINATION_SETTING,
  productSkus: DEFAULT_PAGINATION_SETTING,
  eventCampaigns: DEFAULT_PAGINATION_SETTING,
  holidays: DEFAULT_PAGINATION_SETTING,
  serveies: DEFAULT_PAGINATION_SETTING,
  paymentMethods: DEFAULT_PAGINATION_SETTING,
  payments: DEFAULT_PAGINATION_SETTING,
  surveies: DEFAULT_PAGINATION_SETTING,
  eventAttendances: DEFAULT_PAGINATION_SETTING,
  employees: DEFAULT_PAGINATION_SETTING,
  customers: DEFAULT_PAGINATION_SETTING,
  systemReports: DEFAULT_PAGINATION_SETTING,
  services: DEFAULT_PAGINATION_SETTING,
  members: DEFAULT_PAGINATION_SETTING,
  recruitmentPosts: DEFAULT_PAGINATION_SETTING,
  coupons: DEFAULT_PAGINATION_SETTING,
  subjects: DEFAULT_PAGINATION_SETTING,
  candidates: DEFAULT_PAGINATION_SETTING,
  workspaceTypes: DEFAULT_PAGINATION_SETTING,
  userLevels: DEFAULT_PAGINATION_SETTING,
  resumes: DEFAULT_PAGINATION_SETTING,
  surveyResponses: DEFAULT_PAGINATION_SETTING,
  workspaceHooks: DEFAULT_PAGINATION_SETTING,
  couriers: DEFAULT_PAGINATION_SETTING,
  userTypes: DEFAULT_PAGINATION_SETTING,
  quotations: DEFAULT_PAGINATION_SETTING,
  stores: DEFAULT_PAGINATION_SETTING,
  shipments: DEFAULT_PAGINATION_SETTING,
  workspacePaymentMethods: DEFAULT_PAGINATION_SETTING,
  salesVolumes: DEFAULT_PAGINATION_SETTING,
  workspacePhoneRegions: DEFAULT_PAGINATION_SETTING,
  workspaceApps: DEFAULT_PAGINATION_SETTING,
  customerEnquiries: DEFAULT_PAGINATION_SETTING,
  workspaceSubscriptions: DEFAULT_PAGINATION_SETTING,
  workspaceSubscriptionInvoices: DEFAULT_PAGINATION_SETTING,
  productTypes: DEFAULT_PAGINATION_SETTING,
  pricingTunnels: DEFAULT_PAGINATION_SETTING,
  subscriptionLogs: DEFAULT_PAGINATION_SETTING,
  gangs: DEFAULT_PAGINATION_SETTING,
  expenseTypes: DEFAULT_PAGINATION_SETTING,
  expenses: DEFAULT_PAGINATION_SETTING,
  claims: DEFAULT_PAGINATION_SETTING,
  storeTypes: DEFAULT_PAGINATION_SETTING,
  policies: DEFAULT_PAGINATION_SETTING
});

/* ------------- Reducers ------------- */

const addToOffset = (state, { field, offset: newOffset }) => {
  const offset = getFieldVal(state, setArray(field).concat('offset'));
  return state.setIn(setArray(field).concat('offset'), offset + newOffset);
};

const setFetching = (state, { field, isFetching }) =>
  state.setIn(setArray(field).concat('fetching'), isFetching);
const setIsEnd = (state, { field, isEnd }) =>
  state.setIn(setArray(field).concat('isEnd'), isEnd);
const setLimit = (state, { field, limit }) =>
  state.setIn(setArray(field).concat('limit'), limit);

const setGroup = (state, { field, data }) => state.setIn(setArray(field), data);

const resetSearchSuggestions = state =>
  state.set('searchSuggestions', INITIAL_STATE.searchSuggestions);

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  [Types.RESET_GROUP]: resetField(INITIAL_STATE, {
    append: false,
    refreshing: true,
    fetching: false,
    isEnd: false,
    offset: 0,
    limit: 10
  }),
  [Types.SET_GROUP]: setGroup,
  [Types.ADD_TO_OFFSET]: addToOffset,
  [Types.SET_FETCHING]: setFetching,
  [Types.SET_IS_END]: setIsEnd,
  [Types.SET_LIMIT]: setLimit,
  [Types.RESET]: reset(INITIAL_STATE),
  [Types.RESET_SUGGESTIONS_PAGINATION]: resetSearchSuggestions
});
