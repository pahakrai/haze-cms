import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {
  MongooseOption,
  BadRequestException,
  extractPaginateOptions
} from 'src/core';
import {BaseCRUDService} from 'src/core/layers';

import {ObjectId} from 'mongodb';

// interfaces & models
import {
  ProductWatchCreateModel,
  ProductWatchUpdateModel,
  ProductWatchSearchModel
} from './models';
import {ProductWatch, ProductWatchModel} from './interfaces';

import {PaginateResult} from 'mongoose';

const PRODUCT_PROJECT = '_product';

@Injectable({scope: Scope.REQUEST})
export class ProductWatchService extends BaseCRUDService<
  ProductWatch,
  ProductWatchCreateModel,
  ProductWatchUpdateModel,
  ProductWatchSearchModel
> {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('ProductWatches')
    private readonly productWatchRepository: ProductWatchModel
  ) {
    super(productWatchRepository, request);
  }

  public _castQuery(searchModel: ProductWatchSearchModel) {
    const queryAnd: any = [];
    const {q, client, product} = searchModel;

    if (q) {
    }

    if (client) {
      queryAnd.push({client: new ObjectId(client)});
    }

    if (product) {
      queryAnd.push({product: new ObjectId(product)});
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  public _lookupQuery(searchModel: ProductWatchSearchModel) {
    const queryAnd: any = [];
    const {q, client, product} = searchModel;

    const currentUser = this.getCurrentUser();
    const workspaceId =
      currentUser?.currentWorkspace?.toHexString() || this.getHeaderWorkspace();

    if (q) {
    }

    if (client) {
      queryAnd.push({client: new ObjectId(client)});
    }

    if (product) {
      queryAnd.push({product: new ObjectId(product)});
    }

    if (workspaceId) {
      queryAnd.push({
        [`${PRODUCT_PROJECT}.workspace`]: new ObjectId(workspaceId)
      });
    }

    return queryAnd.length ? {$and: queryAnd} : {};
  }

  // Override
  public async find(
    searchModel: ProductWatchSearchModel
  ): Promise<Array<ProductWatch>> {
    const conditions = this._lookupQuery(searchModel);
    const aggregate = this.productWatchRepository
      .aggregate()
      .lookup({
        from: 'Products',
        localField: 'product',
        foreignField: '_id',
        as: PRODUCT_PROJECT
      })
      .unwind(`$${PRODUCT_PROJECT}`)
      .match(conditions)
      .project({[PRODUCT_PROJECT]: false});

    if (searchModel?.sort) {
      aggregate.sort(searchModel?.sort);
    }

    return aggregate.exec();
  }

  public async findWithPaginate(
    searchModel: ProductWatchSearchModel
  ): Promise<PaginateResult<ProductWatch>> {
    const conditions = this._lookupQuery(searchModel);
    const paginateOptions = extractPaginateOptions(searchModel);
    // post lookup conditions considering lookups
    const where = [
      {
        $lookup: {
          from: 'Products',
          localField: 'product',
          foreignField: '_id',
          as: PRODUCT_PROJECT
        }
      },
      {$unwind: `$${PRODUCT_PROJECT}`},
      {$match: conditions}, // post lookup conditions here
      {$project: {[PRODUCT_PROJECT]: false}}
    ];
    return this.productWatchRepository.paginate(where, paginateOptions);
  }

  public async create(
    createModel: ProductWatchCreateModel,
    options?: MongooseOption
  ) {
    // check product exists
    return super.create(createModel, options);
  }

  /**
   * remove product watches
   * @param productId product id
   * @param userId req.query.like - true or false
   */
  public async removeProductWatches(
    productIds: Array<string | ObjectId>,
    userId: string
  ) {
    const prepProductIds: any = productIds.map(_id => new ObjectId(_id));
    await this.productWatchRepository.deleteMany({
      client: userId,
      product: {$in: prepProductIds}
    });
    return true;
  }

  /**
   * check duplicate watch
   * @param productId product id
   * @param userId req.query.like - true or false
   */
  public async checkDuplicateWatch(productId: string, userId: string) {
    const watch = this.findOne({client: userId, product: productId});
    if (watch)
      throw new BadRequestException({code: 'err_duplicate_product_watch'});
    return true;
  }

  /**
   * product watches
   * @param query search model query
   */
  public async getProductWatches(queryModel: ProductWatchSearchModel) {
    let result: any;
    const query = queryModel || {};
    if (query?.paginate) {
      result = this.findWithPaginate(query);
      // do populates
      result.docs = await this._populate(result.docs, query?.populates || []);
    } else {
      result = await this.find(query);
      // do populates
      result = await this._populate(result, query?.populates || []);
    }
    return result;
  }

  /**
   * toggle like return product watch if created or return null
   * @param productId product id
   * @param userId user id
   * @param watch optional param from query
   */
  public async toggleProductWatch(
    productId: string,
    userId: string,
    watch?: boolean
  ): Promise<ProductWatch | null> {
    // returns productWatch object if found or false
    if (watch) {
      await this.checkDuplicateWatch(productId, userId);
    }
    // check product exists
    const productWatch = await this.findOne({
      product: productId,
      client: userId
    });
    // if it is undefined, if haven’t like -> like now, if liked -> unlike now
    const userWatchAction = watch || !productWatch;

    let updatedProductWatch: any;
    if (userWatchAction && !productWatch) {
      updatedProductWatch = await this.create({
        product: productId,
        client: userId
      });
    }
    if (!userWatchAction && productWatch) {
      updatedProductWatch = await this.delete(
        (productWatch?._id as ObjectId)?.toHexString()
      );
    }
    return updatedProductWatch;
  }
}
