import { all, fork } from 'redux-saga/effects';

import AccountSagas from './Account/sagas';
import AccountService from '../Services/APIServices/AccountService';
import CurrencySagas from './Currency/sagas';
import CurrencyService from '../Services/APIServices/CurrencyService';
import ClaimSagas from './Claim/sagas';
import ClaimService from '../Services/APIServices/ClaimService';
import DriverSagas from './Driver/sagas';
import DriverService from '../Services/APIServices/DriverService';
import ExpenseTypeSagas from './ExpenseType/sagas';
import ExpenseTypeService from '../Services/APIServices/ExpenseTypeService';
import ExpenseSagas from './Expense/sagas';
import ExpenseService from '../Services/APIServices/ExpenseService';
import FileMetaSagas from './FileMeta/sagas';
import FileMetaService from '../Services/APIServices/FileMetaService';
import FilterSagas from './Filter/sagas';
import FollowSagas from './Follow/sagas';
import FollowService from '../Services/APIServices/FollowService';
import IntlSagas from './Intl/sagas';
import LogSagas from './Log/sagas';
import LogService from '../Services/APIServices/LogService';
import ParamsSagas from './Param/sagas';
import ParamsService from '../Services/APIServices/ParamsService';
import PhoneRegionSagas from './PhoneRegion/sagas';
import PhoneRegionService from '../Services/APIServices/PhoneRegionService';
import UserSagas from './User/sagas';
import UserService from '../Services/APIServices/UserService';
import UserGroupSagas from './UserGroup/sagas';
import UserGroupService from '../Services/APIServices/UserGroupService';
import UserGroupPolicySagas from './UserGroupPolicy/sagas';
import UserGroupPolicyService from '../Services/APIServices/UserGroupPolicyService';
import UserCreditSagas from './UserCredit/sagas';
import UserCreditService from '../Services/APIServices/UserCreditService';
import RegionService from '../Services/APIServices/RegionService';
import RegionsSagas from './Region/sagas';
import OrderSagas from './Order/sagas';
import OrderService from '../Services/APIServices/OrderService';
import VehicleSagas from './Vehicle/sagas';
import VehicleService from '../Services/APIServices/VehicleService';
import VehicleTypeSagas from './VehicleType/sagas';
import VehicleTypeService from '../Services/APIServices/VehicleTypeService';
import VehicleCategorySagas from './VehicleCategory/sagas';
import VehicleCategoryService from '../Services/APIServices/VehicleTypeService';
import TunnelSagas from './Tunnel/sagas';
import TunnelService from '../Services/APIServices/TunnelService';
import TagSagas from './Tag/sagas';
import TagService from '../Services/APIServices/TagService';
import VehicleMakeSagas from './VehicleMake/sagas';
import VehicleMakeService from '../Services/APIServices/VehicleMakeService';
import VehicleModeleSagas from './VehicleModel/sagas';
import VehicleModelService from '../Services/APIServices/VehicleModelService';
import PostSagas from './Post/sagas';
import PostService from '../Services/APIServices/PostService';
import PostCommentSagas from './PostComment/sagas';
import PostCommentService from '../Services/APIServices/PostCommentService';
import PageSagas from './Page/sagas';
import PageService from '../Services/APIServices/PageService';
import PageTemplateSagas from './PageTemplate/sagas';
import PageTemplateService from '../Services/APIServices/PageTemplateService';
import PageSectionSagas from './PageSection/sagas';
import PageSectionService from '../Services/APIServices/PageSectionService';
import ServiceSagas from './Service/sagas';
import ServiceService from '../Services/APIServices/ServiceService';
import PriceSagas from './Price/sagas';
import PriceService from '../Services/APIServices/PriceService';
import FeedbackSagas from './Feedback/sagas';
import FeedbackService from '../Services/APIServices/FeedbackService';
import SubscriptionLogSagas from './SubscriptionLog/sagas';
import SubscriptionLogService from '../Services/APIServices/SubscriptionLogService';
import PricingsSagas from './Pricing/sagas';
import PricingsService from '../Services/APIServices/PricingService';
import IntervalsSagas from './Intervals/sagas';
import IntervalsService from '../Services/APIServices/IntervalsService';
import EdmSagas from './Edm/sagas';
import EdmService from '../Services/APIServices/EdmService';
import CategorySagas from './Category/sagas';
import CategoryService from '../Services/APIServices/CategoryService';
import NotificationScheduleSagas from './NotificationSchedule/sagas';
import NotificationScheduleService from '../Services/APIServices/NotificationScheduleService';
import UnitOfMeasureSagas from './UnitOfMeasure/sagas';
import UnitOfMeasureService from '../Services/APIServices/UnitOfMeasureService';
import WebMenuSagas from './WebMenu/sagas';
import WebMenuService from '../Services/APIServices/WebMenuService';
import ProductSagas from './Product/sagas';
import ProductService from '../Services/APIServices/ProductService';
import PayrollSagas from './Payroll/sagas';
import PayrollService from '../Services/APIServices/PayrollService';
import MerchantSagas from './Merchant/sagas';
import MerchantService from '../Services/APIServices/MerchantService';
import EventSagas from './Event/sagas';
import EventService from '../Services/APIServices/EventService';
import ProductSkuSagas from './ProductSku/sagas';
import ProductSkuService from '../Services/APIServices/ProductSkuService';
import ProductTypeSagas from './ProductType/sagas';
import ProductTypeService from '../Services/APIServices/ProductTypeService';
import EventCampaignSagas from './EventCampaign/sagas';
import EventCampaignService from '../Services/APIServices/EventCampaignService';
import WorkspaceSagas from './Workspace/sagas';
import WorkspaceService from '../Services/APIServices/WorkspaceService';
import HolidaySagas from './Holiday/sagas';
import HolidayService from '../Services/APIServices/HolidayService';
import SurveySagas from './Survey/sagas';
import SurveyService from '../Services/APIServices/SurveyService';
import PaymentMethodSagas from './PaymentMethod/sagas';
import PaymentMethodService from '../Services/APIServices/PaymentMethodService';
import PaymentSagas from './Payment/sagas';
import PaymentService from '../Services/APIServices/PaymentService';
import EventAttendanceSagas from './EventAttendance/sagas';
import EventAttendanceService from '../Services/APIServices/EventAttendanceService';
import EmployeeSagas from './Employee/sagas';
import EmployeeService from '../Services/APIServices/EmployeeService';
import SystemReportSagas from './SystemReport/sagas';
import SystemReportService from '../Services/APIServices/SystemReportService';
import CustomerSagas from './Customer/sagas';
import CustomerService from '../Services/APIServices/CustomerService';
import MemberSagas from './Member/sagas';
import MemberService from '../Services/APIServices/MemberService';
import DeviceSagas from './Device/sagas';
import DeviceService from '../Services/APIServices/DeviceService';
import RecruitmentPostSagas from './RecruitmentPost/sagas';
import RecruitmentPostService from '../Services/APIServices/RecruitmentPostService';
import CouponSagas from './Coupon/sagas';
import CouponService from '../Services/APIServices/CouponService';
import SubjectSagas from './Subject/sagas';
import SubjectService from '../Services/APIServices/SubjectService';
import CandidateSagas from './Candidate/sagas';
import CandidateService from '../Services/APIServices/CandidateService';
import UserLevelSagas from './UserLevel/sagas';
import UserLevelService from '../Services/APIServices/UserLevelService';
import ResumeSagas from './Resume/sagas';
import ResumeService from '../Services/APIServices/ResumeService';
import surveyResponseSagas from './SurveyResponse/sagas';
import SurveyResponseService from '../Services/APIServices/SurveyResponseService';
import WorkspaceHookSagas from './WorkspaceHook/sagas';
import WorkspaceHookService from '../Services/APIServices/WorkspaceHookService';
import CourierSagas from './Courier/sagas';
import CourierService from '../Services/APIServices/CourierService';
import WorkspacePhoneRegionSagas from './WorkspacePhoneRegion/sagas';
import WorkspacePhoneRegionService from '../Services/APIServices/WorkspacePhoneRegionService';
import WorkspacePaymentMethodSagas from './WorkspacePaymentMethod/sagas';
import WorkspacePaymentMethodService from '../Services/APIServices/WorkspacePaymentMethodService';
import WorkspaceSubscriptionSagas from './WorkspaceSubscription/sagas';
import WorkspaceSubscriptionService from '../Services/APIServices/WorkspaceSubscriptionService';
import UserTypeSagas from './UserType/sagas';
import UserTypeService from '../Services/APIServices/UserTypeService';
import ServiceTypeSagas from './ServiceType/sagas';
import ServiceTypeService from '../Services/APIServices/ServiceTypeService';
import AppHookSagas from './AppHook/sagas';
import AppHookService from '../Services/APIServices/AppHookService';
import UserSchedulePermissionSagas from './UserSchedulePermission/sagas';
import UserSchedulePermissionService from '../Services/APIServices/UserSchedulePermissionService';
import TagRecommendationSagas from './TagRecommendation/sagas';
import TagRecommendationService from '../Services/APIServices/TagRecommendationService';
import QuotationSagas from './Quotation/sagas';
import QuotationService from '../Services/APIServices/QuotationService';
import StoreSagas from './Store/sagas';
import StoreService from '../Services/APIServices/StoreService';
import ShipmentSagas from './Shipment/sagas';
import ShipmentService from '../Services/APIServices/ShipmentService';
import SalesVolumeSagas from './SalesVolume/sagas';
import SalesVolumeService from '../Services/APIServices/SalesVolumeService';
import WorkspaceAppSagas from './WorkspaceApp/sagas';
import WorkspaceAppService from '../Services/APIServices/WorkspaceAppService';
import CustomerEnquirySagas from './CustomerEnquiry/sagas';
import CustomerEnquiryService from '../Services/APIServices/CustomerEnquiryService';
import WorkspaceSubscriptionInvoiceSagas from './WorkspaceSubscriptionInvoice/sagas';
import WorkspaceSubscriptionInvoiceService from '../Services/APIServices/WorkspaceSubscriptionInvoiceService';
import WorkspaceSubscriptionPlanSagas from './WorkspaceSubscriptionPlan/sagas';
import WorkspaceSubscriptionPlanService from '../Services/APIServices/WorkspaceSubscriptionPlanService';
import GangSagas from './Gang/sagas';
import GangService from '../Services/APIServices/GangService';
import StoreTypeSagas from './StoreType/sagas';
import StoreTypeService from '../Services/APIServices/StoreTypeService';
import PolicySagas from './Policy/sagas';
import PolicyService from '../Services/APIServices/PolicyService';

export default function* root() {
  yield all([
    fork(AccountSagas, AccountService),
    fork(DriverSagas, DriverService),
    fork(FileMetaSagas, FileMetaService),
    fork(FilterSagas),
    fork(FollowSagas, FollowService),
    fork(IntlSagas),
    fork(LogSagas, LogService),
    fork(ParamsSagas, ParamsService),
    fork(PhoneRegionSagas, PhoneRegionService),
    fork(UserSagas, UserService),
    fork(UserGroupSagas, UserGroupService),
    fork(UserGroupPolicySagas, UserGroupPolicyService),
    fork(UserCreditSagas, UserCreditService),
    fork(RegionsSagas, RegionService),
    fork(OrderSagas, OrderService),
    fork(VehicleSagas, VehicleService),
    fork(CurrencySagas, CurrencyService),
    fork(PostCommentSagas, PostCommentService),
    fork(PostSagas, PostService),
    fork(TagSagas, TagService),
    fork(VehicleTypeSagas, VehicleTypeService),
    fork(VehicleCategorySagas, VehicleCategoryService),
    fork(TunnelSagas, TunnelService),
    fork(VehicleMakeSagas, VehicleMakeService),
    fork(VehicleModeleSagas, VehicleModelService),
    fork(PageSagas, PageService),
    fork(PageTemplateSagas, PageTemplateService),
    fork(PageSectionSagas, PageSectionService),
    fork(ServiceSagas, ServiceService),
    fork(PriceSagas, PriceService),
    fork(FeedbackSagas, FeedbackService),
    fork(SubscriptionLogSagas, SubscriptionLogService),
    fork(PricingsSagas, PricingsService),
    fork(IntervalsSagas, IntervalsService),
    fork(NotificationScheduleSagas, NotificationScheduleService),
    fork(EdmSagas, EdmService),
    fork(CategorySagas, CategoryService),
    fork(UnitOfMeasureSagas, UnitOfMeasureService),
    fork(WebMenuSagas, WebMenuService),
    fork(ProductSagas, ProductService),
    fork(PayrollSagas, PayrollService),
    fork(MerchantSagas, MerchantService),
    fork(EventSagas, EventService),
    fork(ProductSkuSagas, ProductSkuService),
    fork(ProductTypeSagas, ProductTypeService),
    fork(EventCampaignSagas, EventCampaignService),
    fork(WorkspaceSagas, WorkspaceService),
    fork(HolidaySagas, HolidayService),
    fork(SurveySagas, SurveyService),
    fork(PaymentMethodSagas, PaymentMethodService),
    fork(PaymentSagas, PaymentService),
    fork(EventAttendanceSagas, EventAttendanceService),
    fork(EmployeeSagas, EmployeeService),
    fork(SystemReportSagas, SystemReportService),
    fork(CustomerSagas, CustomerService),
    fork(MemberSagas, MemberService),
    fork(DeviceSagas, DeviceService),
    fork(RecruitmentPostSagas, RecruitmentPostService),
    fork(CouponSagas, CouponService),
    fork(SubjectSagas, SubjectService),
    fork(CandidateSagas, CandidateService),
    fork(UserLevelSagas, UserLevelService),
    fork(ResumeSagas, ResumeService),
    fork(surveyResponseSagas, SurveyResponseService),
    fork(WorkspaceHookSagas, WorkspaceHookService),
    fork(CourierSagas, CourierService),
    fork(WorkspacePhoneRegionSagas, WorkspacePhoneRegionService),
    fork(UserTypeSagas, UserTypeService),
    fork(AppHookSagas, AppHookService),
    fork(UserSchedulePermissionSagas, UserSchedulePermissionService),
    fork(ServiceTypeSagas, ServiceTypeService),
    fork(TagRecommendationSagas, TagRecommendationService),
    fork(QuotationSagas, QuotationService),
    fork(StoreSagas, StoreService),
    fork(ShipmentSagas, ShipmentService),
    fork(WorkspacePaymentMethodSagas, WorkspacePaymentMethodService),
    fork(SalesVolumeSagas, SalesVolumeService),
    fork(WorkspaceAppSagas, WorkspaceAppService),
    fork(CustomerEnquirySagas, CustomerEnquiryService),
    fork(WorkspaceSubscriptionSagas, WorkspaceSubscriptionService),
    fork(
      WorkspaceSubscriptionInvoiceSagas,
      WorkspaceSubscriptionInvoiceService
    ),
    fork(WorkspaceSubscriptionPlanSagas, WorkspaceSubscriptionPlanService),
    fork(GangSagas, GangService),
    fork(ExpenseTypeSagas, ExpenseTypeService),
    fork(ExpenseSagas, ExpenseService),
    fork(ClaimSagas, ClaimService),
    fork(StoreTypeSagas, StoreTypeService),
    fork(PolicySagas, PolicyService)
  ]);
}
