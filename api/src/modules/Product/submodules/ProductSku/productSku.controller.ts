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
  RequireLogin
} from 'src/core';

// services
import {ProductSkuService} from './productSku.service';

// models
import {
  ProductSkuCreateModel,
  ProductSkuUpdateModel,
  ProductSkuSearchModel
} from './models';

@Controller('productskus')
@UseFilters(HttpExceptionFilter)
export class ProductSkuController extends BaseController {
  constructor(private readonly productSkuService: ProductSkuService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: ProductSkuCreateModel) {
    return this.productSkuService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: ProductSkuUpdateModel
  ) {
    return this.productSkuService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: ProductSkuSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.productSkuService.findWithPaginate(query);
      // do populates
      result.docs = await this.productSkuService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.productSkuService.find(query, {lean: true});
      // do populates
      result = await this.productSkuService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.productSkuService.findById(param._id, {
      lean: true
    });

    return this.productSkuService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.productSkuService.delete(param._id);
  }
}
