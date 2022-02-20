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
import {ProductTypeService} from './productType.service';

// models
import {
  ProductTypeCreateModel,
  ProductTypeUpdateModel,
  ProductTypeSearchModel
} from './models';

@Controller('product-types')
@UseFilters(HttpExceptionFilter)
export class ProductTypeController extends BaseController {
  constructor(private readonly productTypeService: ProductTypeService) {
    super();
  }
  @RequireLogin()
  @Post()
  public async create(@Body() body: ProductTypeCreateModel) {
    return this.productTypeService.create(body, {lean: true});
  }
  @RequireLogin()
  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: ProductTypeUpdateModel
  ) {
    return this.productTypeService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: ProductTypeSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.productTypeService.findWithPaginate(query);
      // do populates
      result.docs = await this.productTypeService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.productTypeService.find(query);
      // do populates
      result = await this.productTypeService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.productTypeService.findById(param._id, {
      lean: true
    });

    return this.productTypeService._populate(
      result,
      query ? query.populates : []
    );
  }
  @RequireLogin()
  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.productTypeService.delete(param._id);
  }
}
