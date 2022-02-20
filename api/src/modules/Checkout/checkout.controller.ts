import {Body, Post, Param, Query, Controller, UseFilters} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {CheckoutService} from './checkout.service';

// models
import {
  CheckoutOrderModel,
  CheckoutFinalizeModel
  // CheckoutUpdateModel,
  // CheckoutSearchModel
} from './models';
import {RequireLogin} from 'src/core';

@RequireLogin()
@Controller('checkouts')
@UseFilters(HttpExceptionFilter)
export class CheckoutController extends BaseController {
  constructor(private readonly checkoutService: CheckoutService) {
    super();
  }

  @Post()
  public async checkout(
    @Body() body: CheckoutOrderModel,
    @Query('finalize') finalize: boolean,
    @Query('populates') populates: string[]
  ) {
    const checkout = await this.checkoutService.checkout(body, {finalize});

    return this.checkoutService._populate(checkout, populates);
  }

  @Post(':_id/finalize')
  public async finalizeCheckout(
    @Param() param: ParamIdModel,
    @Body() body: CheckoutFinalizeModel
  ) {
    return this.checkoutService.finalize(param._id, body);
  }

  @Post('alipay')
  /**
   *  alipay
   */
  public async alipay(@Body() body: CheckoutOrderModel) {
    return this.checkoutService.alipay(body);
  }
  // @Put(':_id')
  // public async update(
  //   @Param() param: ParamIdModel,
  //   @Body() body: CheckoutUpdateModel
  // ) {
  //   return this.checkoutService.update(param._id, body, {lean: true});
  // }

  // @Get()
  // public async find(@Query() query: CheckoutSearchModel) {
  //   let result: any;
  //   const {populates, paginate} = query;

  //   if (String(paginate) === 'true') {
  //     result = await this.checkoutService.findWithPaginate(query);
  //     // do populates
  //     result.docs = await
  // this.checkoutService._populate(result.docs, populates);
  //   } else {
  //     result = await this.checkoutService.find(query, {lean: true});
  //     // do populates
  //     result = await this.checkoutService._populate(result, populates);
  //   }

  //   return result;
  // }

  // @Get(':_id')
  // public async findById(@Param() param: ParamIdModel, @Query() query?) {
  //   const result = await
  // this.checkoutService.findById(param._id, {lean: true});

  //   return this.checkoutService
  // ._populate(result, query ? query.populates : []);
  // }

  // @Delete(':_id')
  // public async delete(@Param() param: ParamIdModel) {
  //   return this.checkoutService.delete(param._id);
  // }
}
