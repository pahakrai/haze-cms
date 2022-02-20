import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { Types } from './actions';

/* ------------- Initial State ------------- */

const initialState = {
  users: {},
  userCredits: {},
  fileMetas: {},
  posts: {},
  postComments: {},
  pages: {},
  pageTemplates: {},
  userFollowCount: {},
  notificationSchedules: {},
  pageMenus: {},
  paramMobileNavigations: {},
  invoices: {},
  page: {},
  pageTemplate: {},
  userGroupPolicys: {},
  userGroups: {},
  currencies: {},
  workspaces: {},
  service: {},
  coupons: {},
  workspaceBranch: {},
  userCoupon: {},
  order: {},
  vehicle: {},
  vehicleType: {},
  vehicleCategory: {},
  categories: {},
  tunnels: {},
  vehicleMake: {},
  driver: {},
  price: {},
  feedback: {},
  pricing: {},
  tag: {},
  unitOfMeasure: {},
  webMenu: {},
  product: {},
  event: {},
  productSku: {},
  eventCampaign: {},
  merchants: {},
  payroll: {},
  merchant: {},
  paymentMethod: {},
  payment: {},
  eventAttendance: {},
  member: {},
  recruitmentPost: {},
  workspaceHooks: {},
  courier: {},
  serviceType: {},
  tagRecommendation: {},
  quotation: {},
  store: {},
  shipment: {},
  workspacePaymentMethod: {},
  workcspaeSubscription: {},
  workcspaeSubscriptionPlan: {},
  productType: {},
  gang: {},
  claim: {},
  expense: {},
  policy: {}
};
export const INITIAL_STATE = Immutable(initialState);

/* ------------- Reducers ------------- */

export const reset = () => INITIAL_STATE;

const addEntities = (state, { entities }) => {
  return Immutable.merge(state, entities, { deep: true });
};
const updateEntity = (state, { entities }) => {
  return Immutable.merge(state, entities, { deep: true });
};
const updateSingleEntity = field => (state, { entity }) => {
  return Immutable.updateIn(state, [field, entity._id], prevEntity => {
    return { ...prevEntity, ...entity };
  });
};
const removeEntity = field => (state, { _id }) => {
  return Immutable.updateIn(state, [field, _id], () => undefined);
};

/* ------------- Hookup Reducers To Types ------------- */
export default createReducer(INITIAL_STATE, {
  //[Types.UPDATE_PRODUCT]: updateSingleEntity('products'),
  [Types.UPDATE_USER]: updateSingleEntity('users'),
  [Types.REMOVE_NOTIFICATION_SCHEDULE]: removeEntity('notificationSchedules'),
  //[Types.REMOVE_PRODUCT]: removeEntity('products'),
  [Types.REMOVE_USER]: removeEntity('users'),
  [Types.REMOVE_MEMBER]: removeEntity('member'),
  [Types.REMOVE_PRODUCT]: removeEntity('product'),
  [Types.REMOVE_EVENT]: removeEntity('event'),
  [Types.REMOVE_EVENT_CAMPAIGN]: removeEntity('eventCampaign'),
  [Types.REMOVE_WORKSPACE]: removeEntity('workspaces'),
  [Types.REMOVE_ORDER]: removeEntity('order'),
  [Types.REMOVE_POLICY]: removeEntity('policy'),
  [Types.REMOVE_USER_GROUPS]: removeEntity('userGroups'),
  [Types.ADD_ENTITIES]: addEntities,
  [Types.UPDATE_ENTITY]: updateEntity,
  [Types.RESET]: reset
});
