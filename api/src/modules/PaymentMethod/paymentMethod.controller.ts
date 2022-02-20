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
import {PaymentMethodService} from './paymentMethod.service';

// models
import {
  PaymentMethodCreateModel,
  PaymentMethodUpdateModel,
  PaymentMethodSearchModel
} from './models';

@Controller('payment-methods')
@UseFilters(HttpExceptionFilter)
export class PaymentMethodController extends BaseController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: PaymentMethodCreateModel) {
    return this.paymentMethodService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: PaymentMethodUpdateModel
  ) {
    return this.paymentMethodService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: PaymentMethodSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.paymentMethodService.findWithPaginate(query);
      // do populates
      result.docs = await this.paymentMethodService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.paymentMethodService.find(query, {lean: true});
      // do populates
      result = await this.paymentMethodService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.paymentMethodService.findById(param._id, {
      lean: true
    });

    return this.paymentMethodService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.paymentMethodService.delete(param._id);
  }
}
