import { schema, denormalize } from 'normalizr';

export const Entity = (key, definition) =>
  new schema.Entity(key, definition, { idAttribute: '_id' });

export const entities = {};

entities.edmSchema = Entity('edms', {});
entities.regionSchema = Entity('regions', {});
entities.regionPinSchema = Entity('regionPins', {
  region: entities.regionSchema
});
entities.pageSchema = Entity('page');
entities.pageSchema.define({
  layout: entities.pageSchema
});
entities.pageTemplateSchema = Entity('pageTemplate', {
  page: entities.pageSchema
});
entities.pageSectionSchema = Entity('pageSection', {
  page: entities.pageSchema
});
entities.postSchema = Entity('post', {});
entities.pageMenuSchema = Entity('pageMenus', {});
entities.companySchema = Entity('companies', {});
entities.serviceSchema = Entity('service', {});
entities.fileMetaSchema = Entity('fileMetas');
entities.notificationScheduleSchema = Entity('notificationSchedules');
entities.phoneRegionSchema = Entity('phoneRegions');
entities.userGroupPolicySchema = Entity('userGroupPolicys');
entities.vehicleTypeSchema = Entity('vehicleType');
entities.vehicleMakeSchema = Entity('vehicleMake');
entities.vehicleModelSchema = Entity('vehicleModel', {
  capabilities: [entities.vehicleCapabilitySchema],
  type: entities.vehicleTypeSchema
});
entities.vehicleCapabilitySchema = Entity('vehicleCapability', {
  vehicleTypes: [entities.vehicleTypeSchema]
});
entities.feedbackSchema = Entity('feedback');
entities.pricingSchema = Entity('pricing');
entities.vehicleCategorySchema = Entity('VehicleCategory');
entities.tunnelSchema = Entity('tunnels');
entities.postCommentSchema = Entity('postComments', {});
entities.currencySchema = Entity('currencies', {});
entities.vehicleSchema = Entity('vehicle', {
  services: [{ service: entities.serviceSchema }]
});
entities.intervalsSchema = Entity('intervals', {});
entities.userSchema = Entity('users', {
  company: entities.companySchema
});
entities.userCreditSchema = Entity('userCredits');

entities.partnerSchema = Entity('partners', {});
entities.paramMobileNavigationSchema = Entity('paramMobileNavigations', {});
entities.paymentMethodSchema = Entity('paymentMethods', {});
entities.tagSchema = Entity('tag', {});
entities.distinctSchema = Entity('distinct', {});
entities.partnerSchema.define({});
entities.userFollowCountSchema = Entity('userFollowCount', {});
entities.deviceActivitySchema = Entity('deviceActivitySchema', {});
entities.dataMappingSchema = Entity('dataMappingSchema', {});
entities.logSchema = Entity('logs', {});
entities.subscriptionSchema = Entity('subscriptions');

entities.workspaceSchema = Entity('workspaces');
entities.workspaceBranchSchema = Entity('workspaceBranch');

entities.driverSchema = Entity('driver', {
  user: entities.userSchema
});
entities.eventCampaignSchema = Entity('eventCampaign');
entities.orderSchema = Entity('order', {
  driver: entities.driverSchema,
  eventCampaigns: [{ eventCampaign: entities.eventCampaignSchema }]
});
entities.priceSchema = Entity('price');
entities.notificationScheduleSchema = Entity('notificationSchedules');
entities.categorySchema = Entity('categories', {});

entities.unitOfMeasureSchema = Entity('unitOfMeasure');

entities.webMenuSchema = Entity('webMenu');

entities.productSchema = Entity('product');

entities.payrollSchema = Entity('payroll');

entities.merchantSchema = Entity('merchants', {});
entities.eventSchema = Entity('event');

entities.productSkuSchema = Entity('productSku');

entities.merchantSchema = Entity('merchant');

entities.holidaySchema = Entity('holiday');

entities.surveySchema = Entity('survey');

entities.paymentMethodSchema = Entity('paymentMethod');

entities.paymentSchema = Entity('payment');

entities.eventAttendanceSchema = Entity('eventAttendance');

entities.systemReportSchema = Entity('systemReport');
entities.employeeSchema = Entity('employee', {
  user: entities.userSchema
});
entities.customerSchema = Entity('customer', {
  workspace: entities.workspaceSchema
});
entities.memberSchema = Entity('member');
entities.deviceSchema = Entity('device');

entities.recruitmentPostSchema = Entity('recruitmentPost');
entities.subjectSchema = Entity('subject');
entities.storeSchema = Entity('store');
entities.shipmentSchema = Entity('shipment');
entities.candidateSchema = Entity('candidate');
entities.couponSchema = Entity('coupons');
entities.workspaceTypeSchema = Entity('workspaceType');
entities.userLevelSchema = Entity('userLevel');
entities.resumeSchema = Entity('resume');
entities.surveyResponseSchema = Entity('surveyResponse');
entities.workspaceHookSchema = Entity('workspaceHooks');
entities.userGroupSchema = Entity('userGroups');
entities.userSchedulePermissionSchema = Entity('userSchedulePermissions');
entities.courierSchema = Entity('couriers');
entities.workspacePhoneRegionSchema = Entity('workspacePhoneRegion');
entities.userTypeSchema = Entity('userTypeSchema');
entities.appHookSchema = Entity('appHookSchema');
entities.tagRecommendationSchema = Entity('tagRecommendation');
entities.quotationSchema = Entity('quotation');
entities.workspacePaymentMethodSchema = Entity('workspacePaymentMethod');
entities.salesVolumeSchema = Entity('salesVolume');
entities.workspaceAppSchema = Entity('workspaceApp');
entities.customerEnquirySchema = Entity('customerEnquiry');
entities.workspaceSubscriptionSchema = Entity('workspaceSubscription');
entities.workspaceSubscriptionInvoiceSchema = Entity(
  'workspaceSubscriptionInvoice'
);

entities.workspaceSubscriptionPlanSchema = Entity('workspaceSubscriptionPlan');
entities.productTypeSchema = Entity('productTypes');

entities.pricingTunnelSchema = Entity('pricingTunnel');
entities.subscriptionLogSchema = Entity('subscriptionLog');
entities.gangSchema = Entity('gang');
entities.expenseTypeSchema = Entity('expenseType');
entities.expenseSchema = Entity('expense', {
  type: entities.expenseTypeSchema
});
entities.claimSchema = Entity('claim');
entities.storeTypeSchema = Entity('storeType');

entities.policySchema = Entity('policy');

export const hydrate = (entityName, _id, state) =>
  denormalize(
    _id,
    typeof entityName === 'string'
      ? entities[entityName + 'Schema']
      : entityName,
    state
  );
export const hydrateAll = (entityName, _ids, state) =>
  _ids.map(_id => hydrate(entityName, _id, state));
