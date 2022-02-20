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
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  FilesInterceptor,
  UserTypes,
  DeserializeBodyInterceptor
} from 'src/core';
import common from '@golpasal/common';

// services
import {PaymentService} from './payment.service';

// models
import {
  PaymentCreateModel,
  PaymentUpdateModel,
  PaymentSearchModel,
  PaymentTransactionModel
} from './models';

const {UserType} = common.type;

@Controller('payments')
@UseFilters(HttpExceptionFilter)
@UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
export class PaymentController extends BaseController {
  constructor(private readonly paymentService: PaymentService) {
    super();
  }

  @Post()
  @UseInterceptors(FilesInterceptor, DeserializeBodyInterceptor)
  public async create(
    @Body() body: PaymentCreateModel,
    @UploadedFiles() files
  ) {
    return this.paymentService.createPayment(body, files);
  }

  @Post(':_id/transaction')
  @UseInterceptors(FilesInterceptor, DeserializeBodyInterceptor)
  public async appendTransaction(
    @Param('_id') _id: string,
    @Body() body: PaymentTransactionModel,
    @UploadedFiles() files
  ) {
    return this.paymentService.appendTransaction(_id, body, files);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: PaymentUpdateModel
  ) {
    return this.paymentService.update(param._id, body, {lean: true});
  }

  @Put(':_id/transaction/:transactionId')
  @UseInterceptors(FilesInterceptor, DeserializeBodyInterceptor)
  public async updateTransaction(
    @Param('_id') _id: string,
    @Param('transactionId') transactionId: string,
    @Body() model: PaymentTransactionModel,
    @UploadedFiles() files
  ) {
    return this.paymentService.updateTransaction(
      _id,
      transactionId,
      model,
      files
    );
  }

  @Put(':_id/transaction/:transactionId/approve')
  public async approveTransaction(
    @Param('_id') _id: string,
    @Param('transactionId') transactionId: string
  ) {
    return this.paymentService.approveTransaction(_id, transactionId);
  }

  @Put(':_id/transaction/:transactionId/decline')
  public async declineTransaction(
    @Param('_id') _id: string,
    @Param('transactionId') transactionId: string
  ) {
    return this.paymentService.declineTransaction(_id, transactionId);
  }

  @Get()
  public async find(@Query() query: PaymentSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.paymentService.findWithPaginate(query);
      // do populates
      result.docs = await this.paymentService._populate(result.docs, populates);
    } else {
      result = await this.paymentService.find(query, {lean: true});
      // do populates
      result = await this.paymentService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.paymentService.findById(param._id, {lean: true});

    return this.paymentService._populate(result, query ? query.populates : []);
  }

  @Get('by-order/:orderId')
  public async findByOrder(@Param('orderId') orderId: string) {
    return this.paymentService.findOne({order: orderId}, {lean: true});
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.paymentService.delete(param._id);
  }
}
