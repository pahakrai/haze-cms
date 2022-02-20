import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {NotFoundException, BadRequestException} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';
import moment from 'moment';
import common from '@golpasal/common';

import {BlobService} from '../File/Blob';
import {CouponLogService} from './submodules/CouponLog/couponLog.service';

// interfaces & models
import {
  CouponCreateModel,
  CouponUpdateModel,
  CouponSearchModel,
  CouponRedeemModel
} from './models';
import {Coupon, CouponModel} from './interfaces';
import {IUser} from '../User';
import {OrderChargeCouponModel} from '../Order/models';
import {Product} from '../Product/interfaces';

const {OrderCreditAmountType, OrderCreditType, LogicGateType} = common.type;

@Injectable({scope: Scope.REQUEST})
export class CouponService extends BaseCRUDService<
  Coupon,
  CouponCreateModel,
  CouponUpdateModel,
  CouponSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Coupons')
    private readonly couponRepository: CouponModel,
    private readonly blobService: BlobService,
    private readonly couponLogService: CouponLogService
  ) {
    super(couponRepository, request);
  }

  public _castQuery(searchModel: CouponSearchModel) {
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    const {startAt, expireAt, _ids, isActive, q, title, code} = searchModel;
    const query: any = {
      $and: []
    };
    const utcOffset = this.getUTCOffset();
    // handle workspace
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (searchModel.workspace) {
      workspace = searchModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    // always pass workspace as query
    query.$and.push({workspace: workspace ? workspace : null});

    // _id
    if (Array.isArray(_ids)) {
      query.$and.push({_id: {$in: _ids}});
    }
    if (title) {
      query.$and.push({title: new RegExp(title, 'i')});
    }
    if (typeof isActive === 'boolean') {
      query.isActive = isActive;
    }
    if (code) {
      query.$and.push({code});
    }

    if (startAt && expireAt) {
      const startAtDate = moment(startAt)
        .utcOffset(utcOffset)
        .startOf('day')
        .toISOString();
      const expireAtDate = moment(expireAt)
        .utcOffset(utcOffset)
        .startOf('day')
        .toISOString();
      query.$and.push({
        $or: [
          /**
           *    Fr<------------->To
           * |<-------->|
           */
          {
            startAt: {
              $gte: startAtDate,
              $lt: expireAtDate
            }
          },
          /**
           *    Fr<------------->To
           *            |<---------->|
           */
          {
            expireAt: {
              $gte: startAtDate,
              $lt: expireAtDate
            }
          }
        ]
      });
    }
    if (q) {
      query.$or = [];
      query.$or.push({
        description: {$regex: q}
      });
      query.$or.push({
        code: {$regex: q}
      });
      query.$or.push({
        title: {$regex: q}
      });
    }

    if (query.$and.length <= 0) {
      delete query.$and;
    }
    return query;
  }

  // Find workspace by code
  public async findByCode(code: string) {
    const coupon = await this.findOne({code});

    if (!coupon) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_coupon'}
      });
    }

    return coupon;
  }

  public async redeemCoupon(
    code: string,
    model: CouponRedeemModel
  ): Promise<OrderChargeCouponModel> {
    const user = this.getCurrentUser<IUser>();
    const coupon = await this.findOne({code}, {lean: true});

    if (!coupon) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_coupon'}
      });
    }

    // verify coupon
    //  is active
    const now = new Date();
    if (coupon.startAt > now || coupon.expireAt < now || !coupon.isActive) {
      // inactive coupon
      throw new BadRequestException({code: 'err_coupon_inactive'});
    }

    // total limit
    if (coupon.noOfCoupon > 0) {
      const logCount = await this.couponLogService.countDocuments({
        coupon: coupon._id.toHexString()
      });

      if (logCount > coupon.noOfCoupon)
        throw new BadRequestException({code: 'err_coupon_insufficient_number'});
    }

    // user limit
    if (coupon.redeemLimitPerUser > 0) {
      const logCount = await this.couponLogService.countDocuments({
        user: user._id.toHexString(),
        coupon: coupon._id.toHexString()
      });

      if (logCount > coupon.redeemLimitPerUser)
        throw new BadRequestException({
          code: 'err_coupon_user_insufficient_number'
        });
    }

    // // verify criteria
    // payment method
    if (coupon.criteria.paymentMethods.length > 0) {
      if (!coupon.criteria.paymentMethods.includes(model.paymentMethod)) {
        throw new BadRequestException({
          code: 'err_coupon_incompatible_condition'
        });
      }
    }

    // amount
    if (coupon.criteria.amount > 0) {
      if (coupon.effect.creditType === OrderCreditType.PRODUCT_SPECIFIC) {
        // filter out products in criteria
        const couponCriteriaProducts = (coupon.criteria
          .products as Product['_id'][]).map(p => p.toHexString());
        const matchedProducts = model.products.filter(({product}) =>
          couponCriteriaProducts.find(productId => productId === product)
        );

        // sum matched products amount and verify
        const totAmount = matchedProducts.reduce(
          (sum, product) => sum + product.amount,
          0
        );

        if (totAmount < coupon.criteria.amount)
          throw new BadRequestException({
            code: 'err_coupon_incompatible_condition'
          });
      } else {
        if (model.productTotAmount < coupon.criteria.amount)
          throw new BadRequestException({
            code: 'err_coupon_incompatible_condition'
          });
      }
    }

    if (coupon.criteria.productsLogicGate !== LogicGateType.ANY) {
      // products
      if (coupon.criteria.products?.length > 0) {
        const productIds = model.products?.map(({product}) => product) || [];
        if (coupon.criteria.productsLogicGate === LogicGateType.AND) {
          if (
            // all product id in coupon.criteria.product should be matched
            !(coupon.criteria.products as Product['_id'][]).every(product =>
              productIds.includes(product.toHexString())
            )
          )
            throw new BadRequestException({
              code: 'err_coupon_incompatible_condition'
            });
        } else if (coupon.criteria.productsLogicGate === LogicGateType.OR) {
          if (
            // some of product id in coupon.criteria.product should be matched
            !(coupon.criteria.products as Product['_id'][]).some(product =>
              productIds.includes(product.toHexString())
            )
          )
            throw new BadRequestException({
              code: 'err_coupon_incompatible_condition'
            });
        }
      }
    }

    // use coupon, insert log
    if (model.isCheckout) {
      await this.couponLogService.create({
        user: user._id,
        coupon: coupon._id,
        workspace: user.currentWorkspace
      });
    }

    // // calculate coupon amount
    let amount = 0;
    switch (coupon.effect.type) {
      case OrderCreditAmountType.FIXED:
        if (coupon.effect.creditType === OrderCreditType.PRODUCT_SPECIFIC) {
          // filter out products in criteria
          const couponCriteriaProducts = (coupon.criteria
            .products as Product['_id'][]).map(p => p.toHexString());
          const matchedProducts = model.products.filter(({product}) =>
            couponCriteriaProducts.find(productId => productId === product)
          );

          // sum matched products amount and verify
          const totAmount = matchedProducts.reduce(
            (sum, product) => sum + product.amount,
            0
          );

          amount = Math.min(coupon.effect.amount, totAmount);
        } else {
          amount = coupon.effect.amount;
        }
        break;
      case OrderCreditAmountType.PERCENT:
        if (coupon.effect.creditType === OrderCreditType.PRODUCT_SPECIFIC) {
          // filter out products in criteria
          const couponCriteriaProducts = (coupon.criteria
            .products as Product['_id'][]).map(p => p.toHexString());
          const matchedProducts = model.products.filter(({product}) =>
            couponCriteriaProducts.find(productId => productId === product)
          );

          // calc percent off with filtered products
          matchedProducts.forEach(matchedProduct => {
            amount += matchedProduct.amount * coupon.effect.amount;
          });
        } else {
          amount = model.productTotAmount * coupon.effect.amount;
        }

        break;
    }

    // calculate discount
    return {
      amount,
      code: coupon.code
    };
  }

  public async isCouponExist(code: string) {
    const user = this.getCurrentUser();
    // TODO: may user.currentWorkspace high than header
    const workspace =
      user?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      null;

    const count = await this.couponRepository
      .countDocuments({code, workspace})
      .exec();
    if (count === 0) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_coupon'}
      });
    }
  }

  /**
   * check whether coupon is duplicated
   * @param code coupon code
   * @param excludeId document that should be exclude, use case: coupon update form
   */
  public async checkDuplicateCouponCode(
    code: string,
    excludeId?: string
  ): Promise<any | null> {
    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace?.toHexString() ||
      this.getHeaderWorkspace() ||
      null;

    const coupon = await this.couponRepository
      .findOne({
        code,
        workspace,
        ...(excludeId ? {_id: {$ne: excludeId}} : {})
      })
      .exec();

    return !!coupon;
  }

  /**
   * create a coupon
   * @param coupon
   */
  public async create(
    couponCreateModel: CouponCreateModel,
    uploadFiles?: Array<any>
  ) {
    // get current user
    let workspace: string;
    const user = this.getCurrentUser<IUser>();
    if (user?.currentWorkspace) {
      workspace = user.currentWorkspace.toHexString();
    } else if (couponCreateModel.workspace) {
      workspace = couponCreateModel.workspace;
    } else {
      workspace = this.getHeaderWorkspace();
    }
    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
    const couponFileMetas = await this.blobService.mapUploadFiles(
      uploadFiles,
      folder
    );
    if (uploadFiles?.length) {
      couponCreateModel.images = [
        ...(couponCreateModel.images ? couponCreateModel.images : []),
        ...couponFileMetas
      ];
    }

    return super.create({...couponCreateModel, workspace});
  }

  /**
   * update a coupon
   */
  public async updateCoupon(
    _id: string,
    couponUpdateModel: CouponUpdateModel,
    uploadFiles?: Array<any>
  ) {
    // build coupons
    const coupon = await this.couponRepository.findById({_id: _id}).exec();
    // check coupon exists
    if (!coupon) {
      throw new NotFoundException({
        code: 'data__not_exists',
        payload: {key: 'key_coupon'}
      });
    }
    const user = this.getCurrentUser<IUser>();
    const workspace = user?.currentWorkspace || this.getHeaderWorkspace();
    const folder = `${process.env.BLOB_UPLOAD_IMAGE_FOLDER}/${workspace}`;
    // upload icon image
    const couponFileMetas = await this.blobService.mapUploadFiles(
      uploadFiles,
      folder
    );
    if (uploadFiles?.length) {
      couponUpdateModel.images = [
        ...(couponUpdateModel.images ? couponUpdateModel.images : []),
        ...couponFileMetas
      ];
    }
    const updateCoupon = await this.update(
      _id,
      {
        ...couponUpdateModel
      },
      {lean: true}
    );

    return updateCoupon;
  }
}
