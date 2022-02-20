import { createActions } from 'reduxsauce';

export const { Types: CouponTypes, Creators: CouponActions } = createActions(
  {
    getCoupons: ['opts'],
    getCouponById: ['id'],
    createCoupon: ['couponForm', 'files'],
    updateCoupon: ['couponForm', 'files'],
    searchCoupons: ['q'],
    initSearchCoupons: ['query'],

    setResults: ['results'],
    mergeResults: ['results'],
    setSelected: ['id'],
    setCreated: ['id'],
    setDeleted: ['id'],
    setSearchTerm: ['searchTerm'],
    toggleActive: ['id', 'active'],
    setEditForm: ['coupon'],
    mergeAllResults: ['_ids'],
    setSearchResults: ['results']
  },
  { prefix: 'Coupon/' }
);
