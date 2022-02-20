import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import { connectRouter } from 'connected-react-router';
import { reducer as form } from 'redux-form';
import intl from './Intl/reducers';

// import forms from "./Forms/reducers";
import account from './Account/reducers';
import app from './App/reducers';
import appHook from './AppHook/reducres';
import candidate from './Candidate/reducers';
import category from './Category/reducers';
import coupon from './Coupon/reducers';
import courier from './Courier/reducers';
import currency from './Currency/reducers';
import customer from './Customer/reducers';
import customerEnquiry from './CustomerEnquiry/reducers';
import claim from './Claim/reducers';
import device from './Device/reducers';
import driver from './Driver/reducers';
import edm from './Edm/reducers';
import error from './Error/reducers';
import event from './Event/reducers';
import expense from './Expense/reducers';
import employee from './Employee/reducers';
import expenseType from './ExpenseType/reducers';
import eventCampaign from './EventCampaign/reducers';
import eventAttendance from './EventAttendance/reducers';
import feedback from './Feedback/reducers';
import fileMeta from './FileMeta/reducers';
import filter from './Filter/reducers';
import follow from './Follow/reducers';
import gang from './Gang/reducers';
import holiday from './Holiday/reducers';
import intervals from './Intervals/reducers';
import loading from './Loading/reducers';
import log from './Log/reducers';
import member from './Member/reducers';
import merchant from './Merchant/reducers';
import notificationSchedule from './NotificationSchedule/reducers';
import order from './Order/reducers';
import page from './Page/reducers';
import pageSection from './PageSection/reducers';
import pageTemplate from './PageTemplate/reducers';
import pagination from './Pagination/reducers';
import param from './Param/reducers';
import payment from './Payment/reducers';
import paymentMethod from './PaymentMethod/reducers';
import payroll from './Payroll/reducers';
import phoneRegion from './PhoneRegion/reducers';
import post from './Post/reducers';
import postComment from './PostComment/reducers';
import price from './Price/reducers';
import pricing from './Pricing/reducers';
import product from './Product/reducers';
import productType from './ProductType/reducers';
import productSku from './ProductSku/reducers';
import quotation from './Quotation/reducers';
import recruitmentPost from './RecruitmentPost/reducers';
import region from './Region/reducers';
import resources from './Resources/reducers';
import resume from './Resume/reducers';
import salesVolume from './SalesVolume/reducers';
import service from './Service/reducers';
import serviceType from './ServiceType/reducres';
import shipment from './Shipment/reducers';
import store from './Store/reducers';
import subject from './Subject/reducers';
import survey from './Survey/reducers';
import surveyResponse from './SurveyResponse/reducers';
import systemReport from './SystemReport/reducers';
import tag from './Tag/reducers';
import tagRecommendation from './TagRecommendation/reducers';
import tunnel from './Tunnel/reducers';
import unitOfMeasure from './UnitOfMeasure/reducers';
import user from './User/reducers';
import userCredit from './UserCredit/reducers';
import userGroup from './UserGroup/reducers';
import userGroupPolicy from './UserGroupPolicy/reducers';
import userLevel from './UserLevel/reducers';
import userSchedulePermission from './UserSchedulePermission/reducers';
import userType from './UserType/reducres';
import vehicle from './Vehicle/reducers';
import vehicleCapability from './VehicleCapability/reducers';
import vehicleCategory from './VehicleCategory/reducers';
import vehicleMake from './VehicleMake/reducers';
import vehicleModel from './VehicleModel/reducers';
import vehicleType from './VehicleType/reducers';
import webMenu from './WebMenu/reducers';
import workspace from './Workspace/reducers';
import workspaceApp from './WorkspaceApp/reducers';
import workspaceHook from './WorkspaceHook/reducers';
import workspacePaymentMethod from './WorkspacePaymentMethod/reducers';
import workspacePhoneRegion from './WorkspacePhoneRegion/reducres';
import workspaceSubscription from './WorkspaceSubscription/reducers';
import workspaceSubscriptionInvoice from './WorkspaceSubscriptionInvoice/reducers';
import workspaceSubscriptionPlan from './WorkspaceSubscriptionPlan/reducers';
import subscriptionLog from './SubscriptionLog/reducers';
import storeType from './StoreType/reducers';
import policy from './Policy/reducers';

const reducer = history =>
  combineReducers(
    Immutable({
      // routing,
      router: connectRouter(history),
      intl,
      account,
      app,
      claim,
      coupon,
      courier,
      currency,
      category,
      customer,
      candidate,
      customerEnquiry,
      driver,
      region,
      param,
      error,
      fileMeta,
      filter,
      form,
      loading,
      log,
      resources,
      user,
      userCredit,
      follow,
      gang,
      pagination,
      phoneRegion,
      userGroup,
      userGroupPolicy,
      order,
      vehicle,
      vehicleType,
      vehicleCategory,
      tunnel,
      vehicleMake,
      vehicleModel,
      vehicleCapability,
      tag,
      postComment,
      post,
      page,
      pageTemplate,
      pageSection,
      service,
      price,
      feedback,
      pricing,
      intervals,
      edm,
      notificationSchedule,
      unitOfMeasure,
      webMenu,
      product,
      payroll,
      merchant,
      event,
      productSku,
      eventCampaign,
      workspace,
      holiday,
      survey,
      paymentMethod,
      payment,
      productType,
      eventAttendance,
      employee,
      systemReport,
      member,
      device,
      recruitmentPost,
      subject,
      userLevel,
      resume,
      surveyResponse,
      workspaceHook,
      workspacePhoneRegion,
      userType,
      appHook,
      userSchedulePermission,
      serviceType,
      tagRecommendation,
      quotation,
      store,
      shipment,
      workspacePaymentMethod,
      salesVolume,
      workspaceApp,
      workspaceSubscription,
      workspaceSubscriptionInvoice,
      workspaceSubscriptionPlan,
      subscriptionLog,
      expenseType,
      expense,
      storeType,
      policy
    })
  );

export default reducer;
