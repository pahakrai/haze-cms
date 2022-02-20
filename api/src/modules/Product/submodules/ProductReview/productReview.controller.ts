import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {
  ParamIdModel,
  BaseController,
  RatingInterceptor,
  HttpExceptionFilter,
  RequireLogin
} from 'src/core';
// services
import {ProductReviewService} from './productReview.service';

// models
import {
  ProductReviewCreateModel,
  ProductReviewUpdateModel,
  ProductReviewSearchModel
} from './models';

@Controller('product-reviews')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(RatingInterceptor)
export class ProductReviewController extends BaseController {
  constructor(private readonly productReviewService: ProductReviewService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: ProductReviewCreateModel) {
    return this.productReviewService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: ProductReviewUpdateModel
  ) {
    return this.productReviewService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: ProductReviewSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.productReviewService.findWithPaginate(query);
      // do populates
      result.docs = await this.productReviewService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.productReviewService.find(query, {lean: true});
      // do populates
      result = await this.productReviewService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.productReviewService.findById(param._id, {
      lean: true
    });

    return this.productReviewService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.productReviewService.delete(param._id);
  }
}
