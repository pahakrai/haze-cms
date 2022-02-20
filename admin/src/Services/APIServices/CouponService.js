import { ecommApi } from '../APIs';
import { serialize } from './ServiceUtils';

const getCoupons = async query => {
  const queryString = serialize(query);
  const result = await ecommApi.get('/coupons?' + queryString);
  return result;
};

const createCoupon = (couponForm, images = []) => {
  const data = new FormData();
  if (images.length) {
    images.forEach(image => data.append(`images`, image));
  }
  const stringtifyBody = JSON.stringify(couponForm);
  data.append('coupon', stringtifyBody);
  return ecommApi.post(`coupons`, data);
};

const updateCoupon = (_id, couponForm, images = []) => {
  const data = new FormData();
  if (images.length) {
    images.forEach(image => data.append(`images`, image));
  }
  const stringtifyBody = JSON.stringify(couponForm);
  data.append('coupon', stringtifyBody);
  return ecommApi.put(`coupons/${_id}`, data);
};

const getCouponById = (id, query) =>
  ecommApi.get('coupons/' + id + '?' + serialize(query));

const duplicateCode = (code, _id) => {
  return ecommApi.get(
    `/coupons/duplicate-code-value/${code}` + (_id ? `/${_id}` : '')
  );
};
const toggleActive = (_id, active) =>
  ecommApi.put(`coupons/${_id}/toggle-active?active=${active}`);

const codeExist = code => ecommApi.get(`coupons/exist/${code}`);
const getCouponByCode = code => ecommApi.get(`coupons/code/${code}`);
const redeemCouponByCode = (code, body) =>
  ecommApi.post(`coupons/redeem/${code}`, body);

export default {
  getCoupons,
  getCouponById,
  getCouponByCode,
  createCoupon,
  updateCoupon,
  duplicateCode,
  toggleActive,
  codeExist,
  redeemCouponByCode
};
