import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters
} from '@nestjs/common';
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  CurrentUser,
  RequireLogin,
  UserTypes,
  AllowAction
} from 'src/core';
import common from '@golpasal/common';

// services
import {ProductWatchService} from './productWatch.service';

// models
import {
  ProductWatchCreateModel,
  ProductWatchUpdateModel,
  ProductWatchSearchModel
} from './models';
import {IUser} from 'src/modules/User';

const {UserType} = common.type;

@RequireLogin()
@Controller('product-watches')
@UseFilters(HttpExceptionFilter)
export class ProductWatchController extends BaseController {
  constructor(private readonly productWatchService: ProductWatchService) {
    super();
  }

  @Post()
  public async create(@Body() body: ProductWatchCreateModel) {
    return this.productWatchService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: ProductWatchUpdateModel
  ) {
    return this.productWatchService.update(param._id, body, {lean: true});
  }

  @Get()
  @AllowAction('ProductsWatch:List:View')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async find(@Query() query: ProductWatchSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.productWatchService.findWithPaginate(query);
      // do populates
      result.docs = await this.productWatchService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.productWatchService.find(query);
      // do populates
      result = await this.productWatchService._populate(result, populates);
    }

    return result;
  }

  @Get('by-user-id/:userId')
  @AllowAction('ProductsWatch:List:View')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async getProductsWatchByUserId(
    @Param() param: {userId: string},
    @Query() query: ProductWatchSearchModel // for pagination options
  ) {
    return this.productWatchService.getProductWatches({
      ...query,
      client: param?.userId
    });
  }

  @Get('by-product-id/:productId')
  @AllowAction('ProductsWatch:List:View')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async getProductsWatchByProduct(
    @Param() param: {productId: string},
    @Query() query: ProductWatchSearchModel // for pagination options
  ) {
    return this.productWatchService.getProductWatches({
      ...query,
      product: param?.productId
    });
  }

  @Get(':_id')
  @AllowAction('ProductsWatch:List:View')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.productWatchService.findById(param._id, {
      lean: true
    });

    return this.productWatchService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.productWatchService.delete(param._id);
  }

  /**
   * update product watch, unwatch by user
   * /post/:_id/toggle-watch?watch=true
   * @param param
   * @param query req.query.watch - true or false
   */
  @Put('/:_id/toggle-watch')
  public async toggleWatch(
    @Param() param: ParamIdModel,
    @Query() query: {watch: string},
    @CurrentUser() currentUser: IUser
  ) {
    const watch =
      query.watch !== undefined ? query.watch === 'true' : undefined;
    return this.productWatchService.toggleProductWatch(
      param._id,
      currentUser?._id?.toHexString(),
      watch
    );
  }
}
