import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

// interfaces & models
import {
  OrderProductCreateModel,
  OrderProductUpdateModel,
  OrderProductSearchModel
} from './models';
import {OrderProduct, OrderProductModel} from './interfaces';
import {ProductSkuService} from '../../../Product/submodules/ProductSku/productSku.service';
import {MongooseOption} from 'src/core';

@Injectable({scope: Scope.REQUEST})
export class OrderProductService extends BaseCRUDService<
  OrderProduct,
  OrderProductCreateModel,
  OrderProductUpdateModel,
  OrderProductSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('OrderProducts')
    private readonly orderProductRepository: OrderProductModel,
    private readonly productSKUService: ProductSkuService
  ) {
    super(orderProductRepository, request);
  }

  public _castQuery(searchModel: OrderProductSearchModel) {
    const query: any = {};
    const {order} = searchModel;

    if (order) {
      query.order = order;
    }

    return query;
  }

  // Override
  public async create(
    doc: OrderProductCreateModel,
    options: MongooseOption = {}
  ) {
    const productSKUs = await this.productSKUService.find({
      _ids: doc.items.map(i => i.productSKU)
    });

    doc.items = doc.items.map(item => {
      // find matched sku
      const productSKU = productSKUs.find(
        s => s._id.toHexString() === item.productSKU
      );

      return {
        ...item,
        amount:
          productSKU.discountAmount > 0
            ? productSKU.discountAmount
            : productSKU.amount
      };
    });

    return super.create(doc, options);
  }

  public async findOneAndUpdate(
    searchModel: OrderProductSearchModel,
    model: OrderProductUpdateModel
  ) {
    const query = this._castQuery(searchModel);

    return this.orderProductRepository
      .findOneAndUpdate(query, model as any)
      .lean()
      .exec();
  }
}
