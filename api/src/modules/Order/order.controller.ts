import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Patch,
  Query,
  Delete,
  Controller,
  UploadedFiles,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';

import {diskStorage} from 'multer';
import {AnyFilesInterceptor} from '@nestjs/platform-express';
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  CurrentUser,
  LocaleDecorator,
  RequireLogin,
  UserTypes,
  DeserializeBodyInterceptor
} from 'src/core';
// services
import {OrderService} from './order.service';

import {filename, imageFileFilter} from 'src/core/utils/fileInterceptor.helper';

// models
import {
  OrderSearchModel,
  OrderFormCreateModel,
  OrderFormUpdateModel,
  OrderChargeCalculationModel
} from './models';
import common from '@golpasal/common';
import {PricingService} from '../Pricing/pricing.service';
import {IUser} from '../User';

const {UserType} = common.type;
const {OrderStatus} = common.status;

/* NOTE: update and create can be only from admin  */
@RequireLogin()
@Controller('orders')
@UseFilters(HttpExceptionFilter)
export class OrderController extends BaseController {
  constructor(
    private readonly orderService: OrderService,
    private readonly pricingService: PricingService
  ) {
    super();
  }

  @Post()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async create(@Body() form: OrderFormCreateModel) {
    return this.orderService.createOrder(form);
  }

  @Post('charge')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async calcOrderCharge(@Body() form: OrderChargeCalculationModel) {
    return this.pricingService.getOrderCharge(form);
  }

  @Put(':_id')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: OrderFormUpdateModel
  ) {
    // TODO: if userType = user, check for workspace
    return this.orderService.update(param._id, body, {lean: true});
  }

  @Patch(':_id/status/:status')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async updateOrderStatus(
    @Param('_id') _id: string,
    @Param('status') status: number
  ) {
    return this.orderService.updateOrderStatus(_id, status);
  }

  @Put(':_id/cancel')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async cancelOrder(
    @Param() param: ParamIdModel,
    @Query('reason') reason: string,
    @CurrentUser() currentUser: IUser
  ) {
    return this.orderService.cancelOrder(param?._id, reason, currentUser);
  }

  @RequireLogin()
  @Get('my-orders')
  public async getOrdersByClient(
    @Query() query: OrderSearchModel,
    @CurrentUser() currentUser: IUser
  ) {
    const {paginate, populates} = query;
    let result: any;
    // by token and can be customized
    if (paginate) {
      result = await this.orderService.findWithPaginate({
        ...query,
        client: currentUser?._id.toHexString()
      });
      // do populates
      result.docs = await this.orderService._populate(result.docs, populates);
    } else {
      result = await this.orderService.find(
        {
          ...query,
          client: currentUser?._id.toHexString()
        },
        {lean: true}
      );
      // do populates
      result = await this.orderService._populate(result, populates);
    }
    return result;
  }

  // from admin to get all the orders by workspaces
  @Get('my-workspace-orders')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async getMyWorskpaceOrders(
    @Query() query
    // @CurrentUser() currentUser
  ) {
    const {populates} = query;
    const workspaces = []; // TODO: get workspaces by currentUser
    const result = await this.orderService.getOrdersByWorkspaces(
      query,
      workspaces
    );
    result.docs = await this.orderService._populate(result.docs, populates);
    return result;
  }

  @Get(':_id/my-workspace-orders')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  async myWorkspaceOrders(
    @Param() param: ParamIdModel,
    @CurrentUser() currentUser
  ) {
    return this.orderService.findOne({
      _ids: [param?._id],
      client: currentUser?._id // client is most here
    });
  }

  @Get()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async find(@Query() query: OrderSearchModel) {
    let result: any;
    const {populates, paginate} = query;
    if (paginate) {
      result = await this.orderService.findWithPaginate(query);
      // do populates
      result.docs = await this.orderService._populate(result.docs, populates);
    } else {
      result = await this.orderService.find(query, {lean: true});
      // do populates
      result = await this.orderService._populate(result, populates);
    }
    return result;
  }

  @Get('total-order-count')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async orderCount(@Query() query, @LocaleDecorator() locale) {
    const {dateFr, dateTo, status, statuses} = query;
    const orderCount = await this.orderService.getOrderStats('ORDER_COUNT', {
      createdAtFr: dateFr,
      createdAtTo: dateTo,
      statuses: statuses || (status && [status]) || []
    });

    return {
      total: orderCount.route.total + orderCount.hour.total,
      amount: orderCount.route.total + orderCount.hour.total,
      charts: [
        {
          value: orderCount.route.total,
          label: locale.t('order_route'),
          color: ''
        },
        {
          value: orderCount.hour.total,
          label: locale.t('order_hour'),
          color: ''
        }
      ]
    };
  }

  @Get('completed-count')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async getCompleteOrderCount() {
    const count = await this.orderService.getOrderStats(
      'ORDER_COMPLETE_COUNT',
      {
        statuses: [OrderStatus.COMPLETED]
      }
    );
    return {
      amount: count.total
    };
  }

  @RequireLogin()
  @Get('total-order-amount')
  public async getTotalOrderAmount(@Query() query: OrderSearchModel) {
    const all = [];
    Object.values(OrderStatus).map((arr, key) => {
      if (
        !isNaN(Number(arr)) &&
        ![OrderStatus.CANCELLED, OrderStatus.PENDING_PAYMENT].includes(
          Number(arr)
        )
      ) {
        all.push(arr);
      }
    });
    const count = await this.orderService.getOrderStats('ORDER_AMOUNT', {
      ...query,
      statuses: all
    });
    return {total: count.total};
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.orderService.findById(param._id);
    return this.orderService._populate(result, query ? query.populates : []);
  }

  @Get('quotation/:quotationId')
  public async getOrderByQuotationId(
    @Param() param: {quotationId: string},
    @Query() query?
  ) {
    const result = await this.orderService.getOrderByQuotationId(
      param.quotationId
    );
    return this.orderService._populate(result, query ? query.populates : []);
  }

  @Delete(':_id')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async delete(@Param() param: ParamIdModel) {
    return this.orderService.delete(param._id);
  }

  // @RequireLogin()
  // @Get('logistic/coordinates')
  // public async orderLogisticCoordinates(@Query() query: OrderSearchModel) {
  //   const {logistic} = query;
  //   if (!logistic) {
  //     query.logistic = {};
  //   }
  //   return this.orderService.findLogisiticOrderCoordinates(query);
  // }

  // @Post('/imports')
  // @RequireLogin()
  // @UseInterceptors(
  //   AnyFilesInterceptor({
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         const randomName = Array(32)
  //           .fill(null)
  //           .map(() => Math.round(Math.random() * 16).toString(16))
  //           .join('');
  //         cb(null, `${randomName}${extname(file.originalname)}`);
  //       }
  //     }),
  //     fileFilter: (req, file, cb) => {
  //       const acceptExtensions = ['.xlsx', '.xlx'];
  //       if (!acceptExtensions.includes(extname(file.originalname))) {
  //         cb(new Error('invalid file'), false);
  //       }
  //       cb(null, true);
  //     }
  //   }),
  //   DeserializeBodyInterceptor
  // )
  // public async importOrder(@UploadedFiles() files = []) {
  //   return this.orderService.importOrder(files);
  // }

  @RequireLogin()
  @Post(':_id/upload/signature')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename
      }),
      fileFilter: imageFileFilter
    }),
    DeserializeBodyInterceptor
  )
  public async uploadSignature(
    @Param() param: ParamIdModel,
    @UploadedFiles()
    files
  ) {
    return this.orderService.uploadSignature(
      param?._id,
      files?.length > 0 && files?.[0] ? files?.[0] : undefined
    );
  }
}
