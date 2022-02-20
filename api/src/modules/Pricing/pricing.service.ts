import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import common from '@golpasal/common';
import {BaseCRUDService} from 'src/core';

// interfaces & models
import {
  PricingCreateModel,
  PricingUpdateModel,
  PricingSearchModel
} from './models';
import {
  OrderServiceModel,
  OrderChargeModel,
  OrderChargeCalculationModel
} from '../Order/models';
import {IPricingModel, Pricing} from './interfaces';

import {ProductSkuService} from '../Product/submodules/ProductSku/productSku.service';
import {OrderProductItem} from '../Order/submodules/OrderProduct/models';
import {CouponService} from '../Coupon/coupon.service';

import {IUser} from '../User';
import {PricingAdjustmentService} from './submodules/PricingAdjustment/pricingAdjustment.service';
import {PricingServiceService} from './submodules/PricingService/pricingService.service';

const {PriceType, OrderType, PricingAdjustmentType} = common.type;

interface BasePrice {
  amount: number;
  currency?: string;
  priceType: string;
}

@Injectable({scope: Scope.REQUEST})
export class PricingService extends BaseCRUDService<
  Pricing,
  PricingCreateModel,
  PricingUpdateModel,
  PricingSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('Pricings') private readonly pricingRepository: IPricingModel,
    private readonly pricingServiceService: PricingServiceService,
    private readonly pricingAdjustmentService: PricingAdjustmentService,
    private readonly productSKUService: ProductSkuService,
    private readonly couponService: CouponService
  ) {
    super(pricingRepository, request);
  }

  public _castQuery(searchModel: PricingSearchModel) {
    const {q} = searchModel;
    const query: any = {
      $and: []
    };

    const user = this.getCurrentUser<IUser>();
    const workspace =
      user?.currentWorkspace.toHexString() || this.getHeaderWorkspace();

    query.$and.push({workspace: workspace ? workspace : null});
    if (q && q !== 'undefined' && q !== 'null') {
      const $or = [];
      $or.push({
        code: {$regex: q, $options: 'i'}
      });
      query.$and.push({$or});
    }
    if (query.$and && query.$and.length === 0) {
      delete query.$and;
    }

    return query;
  }

  /**
   * calculate base price of an order (route to route/rental)
   *
   * @param priceCalculationModel the whole price calculation model
   */

  /**
   * calculate charge of order services
   *
   * @param services order.services array
   */
  private async _getServiceCharge(services: OrderServiceModel[] = []) {
    if (services.length === 0) return [];

    const serviceIds = services.map(({service}) => service);

    // fetch all related pricingServices
    let pricingServices = await this.pricingServiceService.find({
      services: serviceIds
    });
    pricingServices = await this.pricingServiceService._populate(
      pricingServices,
      ['pricing']
    );

    // fetch all related pricingAdjustment
    let pricingAdjustments = await this.pricingAdjustmentService.find({
      refs: serviceIds,
      types: [PricingAdjustmentType.SERVICE]
    });
    pricingAdjustments = await this.pricingAdjustmentService._populate(
      pricingAdjustments,
      ['pricing']
    );

    return services.map(({service, value}) => {
      let amount = 0;
      let isQuotation = false;

      // calculate amount
      const pricingService = pricingServices.find(
        _pricingService => _pricingService.service.toString() === service
      );

      if (pricingService) {
        const pricing = pricingService.pricing as Pricing;

        // calculate amount for this service
        switch (pricing.priceType) {
          case PriceType.FIXED:
            // if value is true, add amount
            if (value) {
              amount = pricing.amount;
            }
            break;
          case PriceType.QTY:
            // value is calculated based on quantity
            if (value > 0) {
              amount = pricing.amount * value;
            }
            break;
          case PriceType.QUOTE:
            amount = value;
            isQuotation = true;
        }
      }

      // handle adjustment
      const pricingAdjustment = pricingAdjustments.find(
        pricingAdjustments => pricingAdjustments.ref.toString() === service
      );

      if (pricingAdjustment) {
        // adjustment found, validate for min/max criteria
        if (
          (pricingAdjustment.min ? value >= pricingAdjustment.min : true) &&
          (pricingAdjustment.max ? value <= pricingAdjustment.max : true)
        ) {
          // matche criteria, adjuct amount
          const pricing = pricingAdjustment.pricing as Pricing;

          switch (pricing.priceType) {
            case PriceType.FIXED:
              amount += pricing.amount;
              break;
            case PriceType.QTY:
              amount += pricing.amount * value;
              break;
          }
        }
      }

      return {
        amount,
        service,
        isQuotation
      };
    });
  }

  public async getOrderCharge(
    orderModel: OrderChargeCalculationModel,
    isCheckout = false
  ): Promise<OrderChargeModel> {
    switch (orderModel.orderType) {
      case OrderType.SHOPPING:
        return this.getShoppingOrderCharge(orderModel, isCheckout);
      default:
        // temp fallback if order type not supported yet
        return {
          totalAmount: 10,
          currency: 'HKD'
        };
    }
  }

  /**
   * calculate price of products
   * @param items items that in cart
   */
  public async getProductPrice(
    items: OrderProductItem[] = [],
    isQuotation = false
  ) {
    if (isQuotation) {
      // is quotation, return quoted price, not the original SKU price
      return items.map(item => ({
        product: item.product,
        productSKU: item.productSKU,
        amount: item.amount * item.qty
      }));
    }

    // get SKUs that inside items
    const skus = await this.productSKUService.find(
      {
        _ids: items.map(item => item.productSKU)
      },
      {lean: true}
    );

    return items.map(item => {
      // find matched sku
      const sku = skus.find(s => s._id.toHexString() === item.productSKU);

      return {
        product: item.product,
        productSKU: item.productSKU,
        amount:
          (sku.discountAmount > 0 ? sku.discountAmount : sku.amount) * item.qty
      };
    });
  }

  /**
   * calculate charge of an education order
   *
   * @param orderModel order model
   */
  public async getShoppingOrderCharge(
    orderModel: OrderChargeCalculationModel,
    isCheckout = false
  ): Promise<OrderChargeModel> {
    const charge: OrderChargeModel = {
      base: 0,
      tips: 0,
      hasQuote: false,
      currency: 'HKD',
      totalAmount: 0,
      coupons: [],
      services: [],
      others: [],
      basePriceType: PriceType.FIXED
    };

    // calculate base amount
    const productPrices = await this.getProductPrice(
      orderModel.product?.items,
      !!orderModel.quotation
    );
    charge.base = productPrices.reduce((sum, {amount}) => sum + amount, 0);

    // service handling
    charge.services = await this._getServiceCharge(orderModel.services);

    // other charges
    charge.others = orderModel.others || [];

    // coupon handling
    if (orderModel.coupon) {
      // apply coupon
      const result = await this.couponService.redeemCoupon(orderModel.coupon, {
        isCheckout,
        products: productPrices,
        productTotAmount: charge.base,
        paymentMethod: orderModel.paymentMethod
      });

      charge.coupons.push(result);
    }

    // calculate total amount
    charge.totalAmount =
      // base amount
      charge.base +
      // service amount
      charge.services.reduce((sum, {amount}) => sum + amount, 0) +
      // others amount
      charge.others.reduce((sum, {amount}) => sum + amount, 0) -
      // coupon discount
      (charge.coupons.length > 0
        ? charge.coupons.reduce<number>((sum, coupon) => sum + coupon.amount, 0)
        : 0);

    // whether quotation is included
    charge.hasQuote = charge.services.some(s => s.isQuotation);

    return charge;
  }

  public async updateManyByIds(ids: string[], query: any): Promise<any> {
    //: Promise<IPricingModel>
    return this.pricingRepository.updateMany(
      {_id: {$in: ids}},
      {$set: query},
      {
        session: this.getMongoSession()
      }
    );
  }

  // NOTE: EXCEL IMPORT REFERENCE ONLY
  // public async importRoutePricingFromExcel(
  //   excelFile: Express.Multer.File,
  //   importSheets: Array<string>
  // ) {
  //   const sheetNames = [...importSheets];
  //   const fieldProps = {
  //     header: {
  //       rows: 1
  //     },
  //     columnToKey: {
  //       A: 'FrId',
  //       B: 'ToId',
  //       C: 'VehicleType',
  //       D: 'Fr',
  //       E: 'To',
  //       F: 'Price',
  //       G: 'Currency'
  //     }
  //   };
  //   const sheets = sheetNames.map((name: string) => ({
  //     name,
  //     ...fieldProps
  //   }));
  //   // define excel sheet and field names
  //   const excel: any = excelToJson({
  //     sourceFile: excelFile?.path,
  //     sheets
  //   });

  //   sheetNames.map((k: string) => {
  //     if (excel[k]?.length === 0) {
  //       throw new BadRequestException({
  //         code: 'err_sheet_empty',
  //         payload: {key: k}
  //       });
  //     }
  //   });

  //   // declare variables for insert to db
  //   const pricesList: Array<{_id} & PricingCreateModel> = [];
  //   const priceRoutesList: Array<PricingFareRouteCreateModel> = [];
  //   const codesList: Array<string> = [];
  //   const priceRouteIdentifiers: Array<PricingFareRouteIdentifierModel> = [];

  //   const vehicleTypes = await this.vehicleTypeService.find({});
  //   // name Id mapping for pricing routes
  //   const vehicleTypesNameId = vehicleTypes.reduce(
  //     (obj, vt) => ((obj[vt?.name?.en] = vt?._id?.toHexString()), obj),
  //     {}
  //   );
  //   const user = this.getCurrentUser<IUser>();
  //   const workspace = user
  //     ? user?.currentWorkspace?.toHexString()
  //     : this.getHeaderWorkspace();

  //   let price: {_id} & PricingCreateModel;
  //   let pricingRoute: PricingFareRouteCreateModel;
  //   // loop prices worksheet
  //   sheetNames.map((name: string) => {
  //     for (const dataRow of excel[name]) {
  //       const code = `FARE_ROUTE_${dataRow?.FrId}_${
  //         dataRow?.ToId
  //       }_${dataRow?.VehicleType?.toUpperCase()}`;
  //       const pricingId = new ObjectId();
  //       price = {
  //         _id: pricingId.toHexString(),
  //         code,
  //         workspace,
  //         description: `${dataRow.Fr} <-> ${dataRow.To} ${dataRow?.VehicleType}`,
  //         priceType: PriceType.FIXED,
  //         currency: dataRow?.Currency,
  //         amount: dataRow?.Price,
  //         effectiveDateFr: new Date().toISOString(),
  //         effectiveDateTo: null
  //       };
  //       pricesList.push(price);
  //       pricingRoute = {
  //         pricing: pricingId.toHexString(),
  //         regionA: dataRow?.FrId,
  //         regionB: dataRow?.ToId,
  //         vehicleType: vehicleTypesNameId?.[dataRow?.VehicleType]
  //       };
  //       priceRoutesList.push(pricingRoute);
  //       codesList.push(code);
  //       priceRouteIdentifiers.push({
  //         regionA: dataRow?.FrId,
  //         regionB: dataRow?.ToId,
  //         vehicleType: vehicleTypesNameId?.[dataRow?.VehicleType]
  //       });
  //     }
  //   });
  //   // delete old pricing records in in the array
  //   await this.pricingRepository.deleteMany(
  //     {code: {$in: [...codesList]}},
  //     {
  //       session: this.getMongoSession()
  //     }
  //   );
  //   // insert new pricing records
  //   await this.insertMany(pricesList);
  //   // delete old pricing fare route records
  //   await this.pricingFareRouteService.deleteByPriceRouteIdentifiers(
  //     priceRouteIdentifiers
  //   );
  //   // insert new pricing fare route records
  //   await this.pricingFareRouteService.insertMany(priceRoutesList);
  //   return true;
  // }
}
