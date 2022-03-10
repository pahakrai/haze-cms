import { createSelector } from 'reselect'

import { createHydrate, createHydrateAll } from './utils/selector'
import { Entity, entities } from '../Services/Schemas'
// import { TOP_LEVEL_CATEGORY } from './Category/reducers';

export const phoneRegionHydrateAll = createHydrateAll('phoneRegion')
export const phoneRegionHydrate = createHydrate('phoneRegion')

export const userHydrateAll = createHydrateAll('user')
export const userHydrate = createHydrate('user')

export const postHydrate = createHydrate('post')
export const postHydrateAll = createHydrateAll('post')
export const tagHydrateAll = createHydrateAll('tag')
export const tagHydrate = createHydrate('tag')
export const fileMetaHydrate = createHydrate('fileMeta')
export const fileMetaHydrateAll = createHydrateAll('fileMeta')
export const userFollowCountHydrate = createHydrate('userFollowCount')
export const userFollowCountHydrateAll = createHydrateAll('userFollowCount')
export const workspaceHydrate = createHydrate('workspace')
export const workspaceHydrateAll = createHydrateAll('workspace')

export const workspaceHookHydrate = createHydrate('workspaceHook')
export const workspaceHookHydrateAll = createHydrateAll('workspaceHook')

export const gangHydrate = createHydrate('gang')
export const gangHydrateAll = createHydrateAll('gang')

export const workspaceSubscriptionPlanHydrate = createHydrate(
  'workspaceSubscriptionPlan'
)
export const workspaceSubscriptionPlanHydrateAll = createHydrateAll(
  'workspaceSubscriptionPlan'
)

export const workspaceSubscriptionHydrate = createHydrate(
  'workspaceSubscription'
)
export const workspaceSubscriptionHydrateAll = createHydrateAll(
  'workspaceSubscription'
)

export const workspaceSubscriptionInvoiceHydrateAll = createHydrateAll(
  'workspaceSubscriptionInvoice'
)
export const workspaceSubscriptionInvoiceHydrate = createHydrate(
  'workspaceSubscriptionInvoice'
)

export const logHydrate = createHydrate('log')
export const logHydrateAll = createHydrateAll('log')

export const postCommentHydrate = createHydrate('postComment')
export const postCommentHydrateAll = createHydrateAll('postComment')

export const regionHydrate = createHydrate('region')
export const regionHydrateAll = createHydrateAll('region')

export const orderHydrate = createHydrate('order')
export const orderHydrateAll = createHydrateAll('order')

export const quotationHydrate = createHydrate('quotation')
export const quotationHydrateAll = createHydrateAll('quotation')

export const serviceHydrate = createHydrate('service')
export const serviceHydrateAll = createHydrateAll('service')

export const storeHydrate = createHydrate('store')
export const storeHydrateAll = createHydrateAll('store')

export const shipmentHydrate = createHydrate('shipment')
export const shipmentHydrateAll = createHydrateAll('shipment')

export const salesVolumeHydrate = createHydrate('salesVolume')
export const salesVolumeHydrateAll = createHydrateAll('salesVolume')

export const vehicleHydrate = createHydrate('vehicle')
export const vehicleHydrateAll = createHydrateAll('vehicle')

export const intervalsHydrate = createHydrate('intervals')
export const intervalsHydrateAll = createHydrateAll('intervals')

export const notificationScheduleHydrate = createHydrate('notificationSchedule')
export const notificationScheduleHydrateAll = createHydrateAll(
  'notificationSchedule'
)
export const categoryHydrate = createHydrate('category')
export const categoryHydrateAll = createHydrateAll('category')

const driver = Entity('driver', {
  user: entities.userSchema,
  currentVehicle: Entity('driverVehicleLog', {
    vehicle: entities.vehicleSchema
  })
})
export const driverHydrate = createHydrate(driver)
export const driverHydrateAll = createHydrateAll(driver)

export const unitOfMeasureHydrate = createHydrate('unitOfMeasure')
export const unitOfMeasureHydrateAll = createHydrateAll('unitOfMeasure')

export const webMenuHydrate = createHydrate('webMenu')
export const webMenuHydrateAll = createHydrateAll('webMenu')

export const productHydrate = createHydrate('product')
export const productHydrateAll = createHydrateAll('product')

export const eventHydrate = createHydrate('event')
export const eventHydrateAll = createHydrateAll('event')

export const productSkuHydrate = createHydrate('productSku')
export const productSkuHydrateAll = createHydrateAll('productSku')

export const productTypeHydrate = createHydrate('productType')
export const productTypeHydrateAll = createHydrateAll('productType')

export const eventCampaignHydrate = createHydrate('eventCampaign')
export const eventCampaignHydrateAll = createHydrateAll('eventCampaign')

export const merchantHydrate = createHydrate('merchant')
export const merchantHydrateAll = createHydrateAll('merchant')

export const paymentMethodHydrate = createHydrate('paymentMethod')
export const paymentMethodHydrateAll = createHydrateAll('paymentMethod')

export const paymentHydrate = createHydrate('payment')
export const paymentHydrateAll = createHydrateAll('payment')

export const eventAttendanceHydrate = createHydrate('eventAttendance')
export const eventAttendanceHydrateAll = createHydrateAll('eventAttendance')

export const memberHydrate = createHydrate('member')
export const memberHydrateAll = createHydrateAll('member')

export const courierHydrate = createHydrate('courier')
export const courierHydrateAll = createHydrateAll('courier')

export const recruitmentPostHydrate = createHydrate('recruitmentPost')
export const recruitmentPostHydrateAll = createHydrateAll('recruitmentPost')

export const policyHydrate = createHydrate('policy')
export const policyHydrateAll = createHydrateAll('policy')

// creater hydrate point

export const currencyHydrateAll = createHydrateAll('currency')

export const vehicleTypeHydrate = createHydrate('vehicleType')
// export const vehicleCategoryHydrate = createHydrate('vehicleCategory');
export const vehicleCategoryHydrateAll = createHydrateAll('vehicleCategory')
export const vehicleTypeHydrateAll = createHydrateAll('vehicleType')
export const vehicleMakeHydrate = createHydrate('vehicleMake')
export const vehicleMakeHydrateAll = createHydrateAll('vehicleMake')
export const feedbackHydrate = createHydrate('feedback')
export const feedbackHydrateAll = createHydrateAll('feedback')

export const subscriptionLogHydrate = createHydrate('subscriptionLog')
export const subscriptionLogHydrateAll = createHydrateAll('subscriptionLog')

export const pricingHydrate = createHydrate('pricing')
export const pricingHydrateAll = createHydrateAll('pricing')

export const tunnelHydrate = createHydrate('tunnel')
export const tunnelHydrateAll = createHydrateAll('tunnel')

export const priceHydrateAll = createHydrateAll('price')

export const pageHydrate = createHydrate('page')
export const pageHydrateAll = createHydrateAll('page')

export const pageTemplateHydrate = createHydrate('pageTemplate')
export const pageTemplateHydrateAll = createHydrateAll('pageTemplate')

export const pageSectionHydrate = createHydrate('pageSection')
export const pageSectionHydrateAll = createHydrateAll('pageSection')

export const vehicleModelHydrate = createHydrate('vehicleModel')
export const vehicleModelHydrateAll = createHydrateAll('vehicleModel')

export const vehicleCapabilityHydrate = createHydrate('vehicleCapability')
export const vehicleCapabilityHydrateAll = createHydrateAll('vehicleCapability')

export const payrollHydrate = createHydrate('payroll')
export const payrollHydrateAll = createHydrateAll('payroll')

export const holidayHydrate = createHydrate('holiday')
export const holidayHydrateAll = createHydrateAll('holiday')

export const surveyHydrate = createHydrate('survey')
export const surveyHydrateAll = createHydrateAll('survey')

export const customerHydrate = createHydrate('customer')
export const customerHydrateAll = createHydrateAll('customer')

export const employeeHydrate = createHydrate('employee')
export const employeeHydrateAll = createHydrateAll('employee')

export const systemReportHydrate = createHydrate('systemReport')
export const systemReportHydrateAll = createHydrateAll('systemReport')

export const deviceHydrate = createHydrate('device')
export const deviceHydrateAll = createHydrateAll('device')

export const couponHydrate = createHydrate('coupon')
export const couponHydrateAll = createHydrateAll('coupon')

export const subjectHydrate = createHydrate('subject')
export const subjectHydrateAll = createHydrateAll('subject')

export const candidateHydrate = createHydrate('candidate')
export const candidateHydrateAll = createHydrateAll('candidate')

export const userLevelHydrate = createHydrate('userLevel')
export const userLevelHydrateAll = createHydrateAll('userLevel')

export const resumeHydrate = createHydrate('resume')
export const resumeHydrateAll = createHydrateAll('resume')

export const surveyResponseHydrate = createHydrate('surveyResponse')
export const surveyResponseHydrateAll = createHydrateAll('surveyResponse')

export const workspacePhoneRegionHydrateAll = createHydrateAll(
  'workspacePhoneRegion'
)
export const workspacePhoneRegionHydrate = createHydrate('workspacePhoneRegion')

export const workspacePaymentMethodHydrate = createHydrate(
  'workspacePaymentMethod'
)
export const workspacePaymentMethodHydrateAll = createHydrateAll(
  'workspacePaymentMethod'
)

export const userTypeHydrate = createHydrate('userType')
export const userTypeHydrateAll = createHydrateAll('userType')

export const serviceTypeHydrate = createHydrate('serviceType')
export const serviceTypeHydrateAll = createHydrateAll('serviceType')

export const appHookHydrate = createHydrate('appHook')
export const appHookHydrateAll = createHydrateAll('appHook')

export const userSchedulePermissionHydrate = createHydrate(
  'userSchedulePermission'
)
export const userSchedulePermissionHydrateAll = createHydrateAll(
  'userSchedulePermission'
)

export const tagRecommendationHydrate = createHydrate('tagRecommendation')
export const tagRecommendationHydrateAll = createHydrateAll('tagRecommendation')
export const workspaceAppHydrate = createHydrate('workspaceApp')
export const workspaceAppHydrateAll = createHydrateAll('workspaceApp')

export const customerEnquiryHydrate = createHydrate('customerEnquiry')
export const customerEnquiryHydrateAll = createHydrateAll('customerEnquiry')

export const expenseTypeHydrateAll = createHydrateAll('expenseType')
export const expenseTypeHydrate = createHydrate('expenseType')

export const expenseHydrate = createHydrate('expense')
export const expenseHydrateAll = createHydrateAll('expense')

export const storeTypeHydrateAll = createHydrateAll('storeType')
export const storeTypeHydrate = createHydrate('storeType')

// SELECTORS: RESOURCE HYDRATE
export const getFileMetas = fileMetaHydrateAll(
  (state) => state.fileMeta.results
)
export const getPosts = postHydrateAll((state) => state.post.results)

export const claimHydrate = createHydrate('claim')
export const claimHydrateAll = createHydrateAll('claim')

export const getTags = (state, results) =>
  tagHydrateAll((state) => results || state.tag.results)(state)
export const getTagsText = (state, results) =>
  tagHydrateAll((state) => results || state.tag.textResults)(state)

export const getDistinctResults = (state, distinctResults) =>
  tagHydrateAll((state) => distinctResults || state.tag.distinctResults)(state)
export const getTagById = (state, _id) => {
  return state.resources.tag[_id]
}
export const getTagByText = (state, text) => {
  return state.tag.distinctResults[0]
}
export const getUser = userHydrate((state) => state.user.selected)
export const getUsers = userHydrateAll((state) => state.user.results)
export const getAllUser = userHydrateAll((state) => state.user.allResults)

export const getResAllUser = userHydrateAll((state) =>
  Object.keys(state.resources.users)
)
export const getResAllworkspaceHook = workspaceHookHydrateAll((state) =>
  Object.keys(state.resources.workspaceHooks)
)
export const getSearchUsers = userHydrateAll(
  (state) => state.user.searchResults
)
export const getSearchUserList = userHydrateAll(
  (state) => state.user.searchListResults
)

export const getRegion = regionHydrate((state) => state.region.selected)
export const getAllRegion = regionHydrateAll((state) => state.region.allResults)

export const getIntervals = intervalsHydrate((state) => state.intervals.results)
export const getAllIntervals = intervalsHydrateAll(
  (state) => state.intervals.allResults
)

export const getAllRegionsWithChildren = regionHydrateAll(
  (state) => state.region.regionsWithChildrenResults
)
export const getRegions = regionHydrateAll((state) => state.region.results)
export const getAllPhoneRegions = phoneRegionHydrateAll(
  (state) => state.phoneRegion.all
)
export const getWorkspacePhoneRegionById = (state, _id) =>
  phoneRegionHydrate(() => _id)(state)

export const getDistrict = regionHydrateAll((state) => state.region.allDistrict)
export const getRegionById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return regionHydrate(() => _id)(state)
  } else {
    return state.resources.regions && state.resources.regions[_id]
  }
}
export const getRegionsByParent = (state, parent) => {
  return regionHydrateAll(() => state.region.allResults)(state).filter(
    (region) => region.parent === parent
  )
}

export const getPostComment = postCommentHydrate(
  (state) => state.postComment.selected
)
export const getPostComments = postCommentHydrateAll(
  (state) => state.postComment.results
)

export const getCourier = courierHydrate((state) => state.courier.selected)
export const getCouriers = courierHydrateAll((state) => state.courier.results)
export const getCourierById = (state, _id) => courierHydrate(() => _id)(state)

export const getGang = gangHydrate((state) => state.gang.selected)
export const getGangs = gangHydrateAll((state) => state.gang.results)
export const getGangById = (state, _id) => gangHydrate(() => _id)(state)

export const getLog = logHydrate((state) => state.log.selected)
export const getLogs = logHydrateAll((state) => state.log.results)

export const getUserFollowCount = (state, userId) =>
  userFollowCountHydrate(() => userId)(state)

export const getWorkspace = workspaceHydrate(
  (state) => state.workspace.selected
)
export const getWorkspaces = (state, query) => {
  const result = workspaceHydrateAll((state) => state.workspace.results)(state)
  if (query && query.status !== undefined) {
    return result.filter((v) => v.status === query.status)
  } else {
    return result
  }
}
export const getAllWorkspace = workspaceHydrateAll(
  (state) => state.workspace.allResults
)

export const getPartnerById = (state, _id) =>
  createHydrate(Entity('partners'))(() => _id)(state)

export const getUserById = (state, _id) => userHydrate(() => _id)(state)
export const getWorkspaceHookById = (state, _id) =>
  workspaceHookHydrate(() => _id)(state)
export const getPostById = (state, _id) => postHydrate(() => _id)(state)
export const getFileMetaById = (state, _id) => fileMetaHydrate(() => _id)(state)
export const getAllSvgFileMeta = (state) => {
  const fileMetas = Object.values(state.resources.fileMetas)
  const ids = fileMetas
    .filter((v) => v.fileExtension === '.svg')
    .map((v) => v._id)

  return fileMetaHydrateAll(() => ids)(state)
}

export const getSelectedRegionsByIds = createSelector(
  (state) => state.resources.regions,
  (state, ids) => ids,
  (regions, ids) => {
    if (Array.isArray(ids) && typeof ids[0] === 'object') {
      return ids
    }
    if (ids && ids.length && regions) {
      const country = regions[ids[0]]
      const region_state = (country &&
        country.children &&
        country.children.find(({ _id }) => ids[1] === _id)) || {
        children: []
      }
      const city =
        region_state &&
        region_state.children &&
        region_state.children.find(({ _id }) => ids[2] === _id)
      return [country, region_state, city]
    }
    return []
  }
)

export const getOrderById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return orderHydrate(() => _id)(state)
  } else {
    return state.resources.order[_id]
  }
}
export const getOrders = orderHydrateAll((state) => state.order.results)

export const getQuotationById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return quotationHydrate(() => _id)(state)
  } else {
    return state.resources.quotation[_id]
  }
}
export const getQuotations = quotationHydrateAll(
  (state) => state.quotation.results
)

export const getUnitOfMeasureById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return unitOfMeasureHydrate(() => _id)(state)
  } else {
    return state.resources.unitOfMeasure[_id]
  }
}
export const getUnitOfMeasures = unitOfMeasureHydrateAll(
  (state) => state.unitOfMeasure.results
)
export const getAllUnitOfMeasure = unitOfMeasureHydrateAll(
  (state) => state.unitOfMeasure.allResults
)

export const getWebMenuById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return webMenuHydrate(() => _id)(state)
  } else {
    return state.resources.webMenu[_id]
  }
}
export const getWebMenus = webMenuHydrateAll((state) => state.webMenu.results)

export const getProductById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return productHydrate(() => _id)(state)
  } else {
    return state.resources.product[_id]
  }
}
export const getProducts = productHydrateAll((state) => state.product.results)
export const getSearchProducts = productHydrateAll(
  (state) => state.product.searchResults
)

export const getResAllProduct = productHydrateAll((state) =>
  Object.keys(state.resources.product)
)
export const getEventById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return eventHydrate(() => _id)(state)
  } else {
    return state.resources.event[_id]
  }
}

export const getUserLevelById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return userLevelHydrate(() => _id)(state)
  } else {
    return state.resources.userLevel[_id]
  }
}
export const getUserLevels = userLevelHydrateAll(
  (state) => state.userLevel.results
)

export const getEvents = eventHydrateAll((state) => state.event.results)
export const getMyEvents = eventHydrateAll((state) => state.event.results)
export const getAllEvent = eventHydrateAll((state) => state.event.allResults)
export const getCompleteEvent = eventHydrateAll(
  (state) => state.event.completeResults
)
export const getProductSkuById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return productSkuHydrate(() => _id)(state)
  } else {
    return state.resources.productSku[_id]
  }
}
export const getProductSkus = productSkuHydrateAll(
  (state) => state.productSku.results
)
export const getSearchProductSkus = productSkuHydrateAll(
  (state) => state.productSku.searchResults
)
export const getResAllProductSku = productSkuHydrateAll((state) =>
  Object.keys(state.resources.productSku)
)

export const getEventCampaignById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return eventCampaignHydrate(() => _id)(state)
  } else {
    return state.resources.eventCampaign[_id]
  }
}
export const getEventCampaigns = eventCampaignHydrateAll(
  (state) => state.eventCampaign.results
)
export const getEventCampaignsByArray = (state, array) =>
  eventCampaignHydrateAll((state) => array)(state)
export const getSearchEventCampaigns = eventCampaignHydrateAll(
  (state) => state.eventCampaign.searchResults
)
export const getEventCampaignProgress = eventCampaignHydrateAll(
  (state) => state.eventCampaign.results
)
export const getEventCampaignsNotOrdered = eventCampaignHydrateAll(
  (state) => state.eventCampaign.notOrderedResults
)

export const getMerchantById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return merchantHydrate(() => _id)(state)
  } else {
    return state.resources.merchant[_id]
  }
}
export const getMerchantByUserId = (state, userId) => {
  const merchant = Object.values(state.resources.merchant).find(
    (v) => (v.user && v.user._id ? v.user._id : v.user) === userId
  )
  let merchantId = merchant ? merchant._id : ''

  return merchantHydrate(() => merchantId)(state)
}
export const getMerchants = merchantHydrateAll(
  (state) => state.merchant.results
)
export const getSearchMerchants = merchantHydrateAll(
  (state) => state.merchant.searchResults
)

export const getProductTypes = productTypeHydrateAll(
  (state) => state.productType.results
)
export const getAllProductTypes = productTypeHydrateAll(
  (state) => state.productType.allResults || []
)

export const getProductTypeById = (state, _id) =>
  productTypeHydrate(() => _id)(state)

export const getPaymentMethodById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return paymentMethodHydrate(() => _id)(state)
  } else {
    return state.resources.paymentMethod[_id]
  }
}
export const getPaymentMethods = paymentMethodHydrateAll(
  (state) => state.paymentMethod.results
)
export const getAllPaymentMethod = paymentMethodHydrateAll(
  (state) => state.paymentMethod.allResults || []
)

export const getPaymentById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return paymentHydrate(() => _id)(state)
  } else {
    return state.resources.payment[_id]
  }
}
export const getPaymentByOrderId = (state, _id, opts) => {
  const { populate = true } = opts || {}
  const resPayments = state.resources.payment
  const payment = Object.values(resPayments).find((v) =>
    v.order && v.order._id ? v.order._id === _id : v.order === _id
  )
  if (payment) {
    if (populate) {
      return paymentHydrate(() => payment._id)(state)
    } else {
      return resPayments[payment._id]
    }
  }
}

export const getShipmentByOrderId = (state, _id, opts) => {
  const { populate = true } = opts || {}

  const resShipments = state.resources.shipment
  const shipment = Object.values(resShipments).find((v) =>
    v.order && v.order._id ? v.order._id === _id : v.order === _id
  )
  if (shipment) {
    if (populate) {
      return shipmentHydrate(() => shipment._id)(state)
    } else {
      return resShipments[shipment._id]
    }
  }
}

export const getPayments = paymentHydrateAll((state) => state.payment.results)

export const getEventAttendanceById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return eventAttendanceHydrate(() => _id)(state)
  } else {
    return state.resources.eventAttendance[_id]
  }
}
export const getEventAttendanceByEventId = (state, _id, opts) => {
  const { populate = true } = opts || {}
  const resData = state.resources.eventAttendance
  const eventAttendance = Object.values(resData).find((v) =>
    v.event && v.event._id ? v.event._id === _id : v.event === _id
  )
  if (eventAttendance) {
    if (populate) {
      return eventAttendanceHydrate(() => eventAttendance._id)(state)
    } else {
      return resData[eventAttendance._id]
    }
  }
}
export const getEventAttendances = eventAttendanceHydrateAll(
  (state) => state.eventAttendance.results
)
export const getAllEventAttendance = eventAttendanceHydrateAll(
  (state) => state.eventAttendance.allResult || []
)

export const getMemberById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return memberHydrate(() => _id)(state)
  } else {
    return state.resources.member[_id]
  }
}
export const getMemberByUserId = (state, userId) => {
  const member = Object.values(state.resources.member).find((v) =>
    v.user && v.user._id ? v.user._id === userId : v.user === userId
  )
  let memberId = member ? member._id : ''

  return memberHydrate(() => memberId)(state)
}

export const getMembers = memberHydrateAll((state) => state.member.results)

export const getRecruitmentPostById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return recruitmentPostHydrate(() => _id)(state)
  } else {
    return state.resources.recruitmentPost[_id]
  }
}
export const getRecruitmentPosts = recruitmentPostHydrateAll(
  (state) => state.recruitmentPost.results
)

export const getPolicyById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return policyHydrate(() => _id)(state)
  } else {
    return state.resources.policy[_id]
  }
}
export const getPolicies = policyHydrateAll((state) => state.policy.results)

// creater file end point

export const getPagination = (field) => (state) => state.pagination[field]
export const getWorkspaceById = (state, _id) =>
  workspaceHydrate(() => _id)(state)

export const getPaginationIsEnd = (field) => (state) =>
  state.pagination[field].isEnd

export const getPaginationFetching = (field) => (state) => {
  return state.pagination[field].fetching
}

export const getPaginationOffset = (field) => (state) =>
  state.pagination[field].offset

export const getPaginationLimit = (field) => (state) =>
  state.pagination[field].limit

export const getCurrencies = currencyHydrateAll(
  (state) => state.currency.results
)

export const getWorkspaceHooks = workspaceHookHydrateAll(
  (state) => state.workspaceHook.results
)
export const getAllWorkspaceHooks = workspaceHookHydrateAll(
  (state) => state.workspaceHook.allResults
)

export const getResAllWorkspaceHooks = workspaceHookHydrateAll((state) =>
  Object.keys(state.resources.workspaceHooks)
)
export const getSearchWorkspaceHook = workspaceHookHydrateAll(
  (state) => state.workspaceHook.searchResults
)

export const getAllWorkspaceSubscriptionPlans =
  workspaceSubscriptionPlanHydrateAll(
    (state) => state.workspaceSubscriptionPlan.allResults
  )

export const getLanguages = (state) => {
  const lans = state.param.languages

  return lans.length ? lans : []
}
export const getVehicleTypeById = (state, _id) =>
  vehicleTypeHydrate(() => _id)(state)
export const getVehicleCategories = vehicleCategoryHydrateAll(
  (state) => state.vehicleCategory.results
)
export const getAllVehicleTypes = vehicleTypeHydrateAll(
  (state) => state.vehicleType.allResults
)
export const getVehicleTypes = vehicleTypeHydrateAll(
  (state) => state.vehicleType.results
)
export const getTunnels = tunnelHydrateAll((state) => state.tunnel.results)
export const getTunnelById = (state, _id) => tunnelHydrate(() => _id)(state)

// Vehicle
export const getResAllVehicle = vehicleHydrateAll((state) =>
  Object.keys(state.resources.vehicle)
)
export const getVehicles = vehicleHydrateAll((state) => state.vehicle.results)
export const getSelectSearchVehicles = vehicleHydrateAll(
  (state) => state.vehicle.searchSelectResults
)
export const getVehicleById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return vehicleHydrate(() => _id)(state)
  } else {
    return state.resources.vehicle[_id]
  }
}
export const getDriverById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return driverHydrate(() => _id)(state)
  } else {
    return state.resources.driver[_id]
  }
}
export const getDriverByUserId = (state, userId) => {
  const driver = Object.values(state.resources.driver).find(
    (v) => v.user === userId
  )
  let driverId = driver ? driver._id : ''

  return driverHydrate(() => driverId)(state)
}

export const getAllVehicleMake = vehicleMakeHydrateAll(
  (state) => state.vehicleMake.allResults
)
export const getAllVehicleType = vehicleTypeHydrateAll(
  (state) => state.vehicleType.allResults
)
export const getAllTunnel = tunnelHydrateAll((state) => state.tunnel.allResults)
export const getAllPrice = priceHydrateAll((state) => state.price.allResults)

export const getAllService = serviceHydrateAll(
  (state) => state.service.allResults
)
export const getServices = serviceHydrateAll((state) => state.service.results)

export const getServiceById = (state, _id) => serviceHydrate(() => _id)(state)

export const getStores = storeHydrateAll((state) => state.store.results)

export const getStoreById = (state, _id) => storeHydrate(() => _id)(state)

export const getWorkspacePaymentMethods = workspacePaymentMethodHydrateAll(
  (state) => state.workspacePaymentMethod.results
)
export const getAllWorkspacePaymentMethods = workspacePaymentMethodHydrateAll(
  (state) => state.workspacePaymentMethod.allResults
)

export const getWorkspacePaymentMethodById = (state, _id) =>
  workspacePaymentMethodHydrate(() => _id)(state)

export const getShipments = shipmentHydrateAll(
  (state) => state.shipment.results
)

export const getShipmentById = (state, _id) => shipmentHydrate(() => _id)(state)

export const getSalesVolumes = salesVolumeHydrateAll(
  (state) => state.salesVolume.results
)

export const getSalesVolumesAllResults = salesVolumeHydrateAll(
  (state) => state.salesVolume.allResults
)

export const getSalesVolumeById = (state, _id) =>
  salesVolumeHydrate(() => _id)(state)

export const getVehicleModelById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return vehicleModelHydrate(() => _id)(state)
  } else {
    return state.resources.vehicleModel[_id]
  }
}
export const getVehicleModels = vehicleModelHydrateAll(
  (state) => state.vehicleModel.results
)
export const getAllVehicleModel = vehicleModelHydrateAll(
  (state) => state.vehicleModel.allResults
)
export const getVehicleMakeById = (state, _id) =>
  vehicleMakeHydrate(() => _id)(state)
export const getVehicleMakes = vehicleMakeHydrateAll(
  (state) => state.vehicleMake.results
)
export const getVehicleCapabilityById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return vehicleCapabilityHydrate(() => _id)(state)
  } else {
    return state.resources.vehicleCapability[_id]
  }
}
export const getVehicleCapabilities = vehicleCapabilityHydrateAll(
  (state) => state.vehicleCapability.results
)
export const getAllVehicleCapability = vehicleCapabilityHydrateAll(
  (state) => state.vehicleCapability.allResults
)

//page
export const getPage = pageHydrate((state) => state.page.selected)
export const getPages = pageHydrateAll((state) => state.page.results)

export const getPageById = (state, _id) => pageHydrate(() => _id)(state)
//page Template
export const getPageTemplates = pageTemplateHydrateAll(
  (state) => state.pageTemplate.results
)
export const getPageTemplateById = (state, _id) =>
  pageTemplateHydrate(() => _id)(state)
//page Section
export const getPageSection = pageSectionHydrateAll(
  (state) => state.pageSection.results
)
export const getPageSectionById = (state, _id) =>
  pageSectionHydrate(() => _id)(state)
export const getSelectSearchPages = pageHydrateAll(
  (state) => state.page.searchResults
)
export const getResAllPage = userHydrateAll((state) =>
  Object.keys(state.resources.pages)
)

export const getNotificationScheduleById = (state, _id) =>
  notificationScheduleHydrate(() => _id)(state)
// Feedback
export const getFeedbackById = feedbackHydrate((_id) => _id)
export const getFeedbacks = feedbackHydrateAll(
  (state) => state.feedback.results
)

export const getSubscriptionLogs = subscriptionLogHydrateAll(
  (state) => state.subscriptionLog.results
)

export const getAllSubscriptionLogs = subscriptionLogHydrateAll(
  (state) => state.subscriptionLog.allResults
)

export const getFeedbackSubscriptionLogs = feedbackHydrateAll(
  (state) => state.feedback.subscriptionResults
)
// pricing
export const getPricingById = (state, _id) => pricingHydrate(() => _id)(state)

export const getPricings = pricingHydrateAll((state) => state.pricing.results)
export const getAllPricinngs = pricingHydrateAll(
  (state) => state.pricing.allResults
)

export const getPricingTunnel = pricingHydrateAll(
  (state) => state.pricing.pricingResults
)

// categories
export const getCategory = categoryHydrate((state) => state.category.selected)
export const getCategories = categoryHydrateAll(
  (state) => state.category.results
)
export const getAllCategory = categoryHydrateAll(
  (state) => state.category.allResults
)
export const getCategoryById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return categoryHydrate(() => _id)(state)
  } else {
    return state.resources.categories[_id]
  }
}
export const getCategoriesForParent = (state, parent, categoryType) => {
  return categoryHydrateAll(() => state.category.allResults)(state).filter(
    (category) => category.parent === parent && category.type === categoryType
  )
}
// notification
export const getNotificationSchedule = notificationScheduleHydrate(
  (state) => state.notificationSchedule.selected
)
export const getNotificationSchedules = notificationScheduleHydrateAll(
  (state) => state.notificationSchedule.results
)

// payroll
export const getPayrollById = (state, _id) => payrollHydrate(() => _id)(state)
export const getPayrolls = payrollHydrateAll((state) => state.payroll.results)

export const getPayrollPayeeUserType = (state) => state.payroll.payeeUserType

export const getSummary = (state) => state.payroll.summary
// holiday
export const getHolidays = holidayHydrateAll((state) => state.holiday.results)

// surveyHydrate
export const getSurveyById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return surveyHydrate(() => _id)(state)
  } else {
    return state.resources.survey[_id]
  }
}
export const getSurveies = surveyHydrateAll((state) => state.survey.results)

// reports
export const getCustomers = customerHydrateAll(
  (state) => state.customer.results
)
export const getSearchCustomers = customerHydrateAll((state) => {
  return state.customer.searchResults
})

export const getEmployeeById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return employeeHydrate(() => _id)(state)
  } else {
    return state.resources.employee[_id]
  }
}
export const getSearchEmployees = employeeHydrateAll((state) => {
  return state.employee.searchResults
})
export const getEmployees = employeeHydrateAll(
  (state) => state.employee.results
)
export const getEmployee = employeeHydrateAll((state) => state.employee.results)

export const getSystemReports = systemReportHydrateAll(
  (state) => state.systemReport.results
)
export const getSystemReportById = (state, _id) =>
  systemReportHydrate(() => _id)(state)

export const getReportsWorkspaceAllowToAccess = systemReportHydrateAll(
  (state) => state.systemReport.allResults
)

export const getAllDevice = deviceHydrateAll((state) => state.device.allResults)
export const getDevices = deviceHydrateAll((state) => state.device.results)

export const getDeviceeById = (state, _id) => deviceHydrate(() => _id)(state)

// coupon

export const getCoupon = couponHydrate((state) => state.coupon.selected)
export const getCoupons = couponHydrateAll((state) => state.coupon.results)
export const getResAllCoupon = couponHydrateAll((state) =>
  Object.keys(state.resources.coupons)
)

export const getSearchCoupons = couponHydrateAll(
  (state) => state.coupon.searchResults
)

export const getCouponById = (state, _id) => couponHydrate(() => _id)(state)

// subject
export const getAllSubject = subjectHydrateAll(
  (state) => state.subject.allResults
)
export const getSubjects = subjectHydrateAll((state) => state.subject.results)

export const getSubjectById = (state, _id) => subjectHydrate(() => _id)(state)

// candidate
export const getAllCandidate = candidateHydrateAll(
  (state) => state.subject.allResults
)
export const getCandidates = candidateHydrateAll(
  (state) => state.candidate.results
)

export const getCandidateById = (state, _id) =>
  candidateHydrate(() => _id)(state)

export const getResumeByUserId = (state, candidateId) => {
  if (state.resources && state.resources.resume) {
    const resume = Object.values(state.resources.resume).find(
      (v) => (v.user && v.user._id ? v.user._id : v.user) === candidateId
    )
    let resumeId = resume ? resume._id : ''
    return resumeHydrate(() => resumeId)(state)
  } else {
    return null
  }
}

// survey response
export const getSurveyResponseById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return surveyResponseHydrate(() => _id)(state)
  } else {
    return state.resources.surveyResponse[_id]
  }
}
export const getSurveyResponses = surveyResponseHydrateAll(
  (state) => state.surveyResponse.results
)

// workspace phone region
export const getWorkspacePhoneRegions = workspacePhoneRegionHydrateAll(
  (state) => state.workspacePhoneRegion.results
)
export const getWorkspacePhoneRegionById2 = (state, _id) =>
  workspacePhoneRegionHydrate(() => _id)(state)

export const getUserType = (state) => state.userType.results

export const getServiceTypesByWorkspaceType = (state) =>
  state.serviceType.results

export const getAppHook = appHookHydrateAll((state) => state.appHook.allResults)
export const getAllAppHookName = (state) => state.appHook.nameResults

// Workspace Subscription
export const getWorkspaceSubscriptions = workspaceSubscriptionHydrateAll(
  (state) => state.workspaceSubscription.results
)
export const getWorkspaceSubscriptionById = (state, _id) =>
  workspaceSubscriptionHydrate(() => _id)(state)

// Workspace Subscription Invoice
export const getWorkspaceSubscriptionInvoices =
  workspaceSubscriptionInvoiceHydrateAll(
    (state) => state.workspaceSubscriptionInvoice.results
  )
export const getWorkspaceSubscriptionInvoiceById = (state, _id) =>
  workspaceSubscriptionInvoiceHydrate(() => _id)(state)

export const getUserSchedulePermissions = userSchedulePermissionHydrateAll(
  (state) => state.userSchedulePermission.results
)

export const getAllTagRecommendation = tagRecommendationHydrateAll(
  (state) => state.tagRecommendation.results
)

export const getWorkspaceApps = workspaceAppHydrateAll(
  (state) => state.workspaceApp.results
)

export const getWorkspaceAppById = (state, _id) =>
  workspaceAppHydrate(() => _id)(state)

// export const getAllTagRecommendation = tagRecommendationHydrateAll(
//   state => state.tagRecommendation.results
// );

export const getCustomerEnquiries = customerEnquiryHydrateAll(
  (state) => state.customerEnquiry.results
)

export const getcustomerEnquiryById = (state, _id) =>
  customerEnquiryHydrate(() => _id)(state)

// expenseType
export const getExpenseTypeById = (state, _id) =>
  expenseTypeHydrate(() => _id)(state)

export const getExpenseTypes = expenseTypeHydrateAll(
  (state) => state.expenseType.results
)

export const getAllExpenseTypes = expenseTypeHydrateAll(
  (state) => state.expenseType.allResults
)
// expenses
export const getExpenseById = (state, _id) => expenseHydrate(() => _id)(state)
export const getExpenses = expenseHydrateAll((state) => state.expense.results)

// claims
export const getClaimById = (state, _id, opts) => {
  const { populate = true } = opts || {}
  if (populate) {
    return claimHydrate(() => _id)(state)
  } else {
    return state.resources.claim[_id]
  }
}
export const getClaims = claimHydrateAll((state) => state.claim.results)

// storeType
export const getStoreTypeById = (state, _id) =>
  storeTypeHydrate(() => _id)(state)

export const getStoreTypes = storeTypeHydrateAll(
  (state) => state.storeType.results
)

export const getAllStoreTypes = storeTypeHydrateAll(
  (state) => state.storeType.allResults
)
