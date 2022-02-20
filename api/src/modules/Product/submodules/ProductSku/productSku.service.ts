import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import moment from 'moment';

import {
  MongooseOption,
  MongooseInsertManyOption,
  BadRequestException
} from 'src/core';

import {BaseCRUDService} from 'src/core/layers';

// interfaces & models
import {
  ProductSkuCreateModel,
  ProductSkuUpdateModel,
  ProductSkuSearchModel
} from './models';
import {IProductSku, IProductSkuModel} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class ProductSkuService extends BaseCRUDService<
  IProductSku,
  ProductSkuCreateModel,
  ProductSkuUpdateModel,
  ProductSkuSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('ProductSkus')
    private readonly productSkuRepository: IProductSkuModel
  ) {
    super(productSkuRepository, request);
  }

  public _castQuery(searchModel: ProductSkuSearchModel) {
    const query: any = {};
    const {
      product,
      code,
      specs,
      idx,
      _ids,
      validateInventory,
      isQuote,
      expiryDateGte,
      expiryDateLte
    } = searchModel;

    if (_ids) {
      query._id = {$in: _ids};
    }
    if (product) {
      query.product = product;
    }
    if (idx) {
      query.idx = idx;
    }
    if (code) {
      query.code = code;
    }
    if (specs) {
      query.$and = specs.map(({spec, value}) => ({
        'specs.spec': spec,
        'specs.value': value
      }));
    }

    if (validateInventory) {
      query.validateInventory = validateInventory;
    }
    if (isQuote) {
      query.isQuote = isQuote;
    }
    const utcOffset = this.getUTCOffset();
    if (expiryDateGte) {
      query.$and.push({
        expiryDate: {
          $gte: moment(expiryDateGte)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }
    if (expiryDateLte) {
      query.$and.push({
        expiryDate: {
          $lte: moment(expiryDateLte)
            .utcOffset(utcOffset)
            .startOf('day')
            .toISOString()
        }
      });
    }

    return query;
  }

  // Override
  public async insertMany(
    docs: ProductSkuCreateModel[],
    options?: MongooseOption & MongooseInsertManyOption
  ) {
    // validate SKU price and discount price
    for (const doc of docs) {
      if (doc.discountAmount > doc.amount) {
        throw new BadRequestException({code: 'err_sku_discount_price'});
      }
    }

    return super.insertMany(docs, options);
  }
}
