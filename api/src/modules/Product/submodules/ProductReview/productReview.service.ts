import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {BaseCRUDService, MongooseOption, NotFoundException} from 'src/core';

// interfaces & models
import {
  ProductReviewCreateModel,
  ProductReviewUpdateModel,
  ProductReviewSearchModel
} from './models';
import {IProductReviewModel, IProductReview} from './interfaces';
import {ProductService} from '../../product.service';
import {OrderService} from 'src/modules/Order/order.service';

@Injectable({scope: Scope.REQUEST})
export class ProductReviewService extends BaseCRUDService<
  IProductReview,
  ProductReviewCreateModel,
  ProductReviewUpdateModel,
  ProductReviewSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('ProductReviews')
    private readonly productReviewRepository: IProductReviewModel,
    private readonly productService: ProductService,
    private readonly orderService: OrderService
  ) {
    super(productReviewRepository, request);
  }

  public _castQuery(searchModel: ProductReviewSearchModel) {
    const query: any = {};
    const {q} = searchModel;

    if (q) {
    }

    return query;
  }

  public async create(
    createModel: ProductReviewCreateModel,
    options?: MongooseOption
  ) {
    const product = await this.productService.findById(createModel?.product);
    if (!product)
      throw new NotFoundException({message: 'the product not exist '});

    const order = await this.orderService.findById(createModel?.order);
    if (!order) throw new NotFoundException({message: 'the order not exist '});

    return super.create(createModel, options);
  }
}
