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
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {WorkspacePaymentMethodService} from './workspacePaymentMethod.service';

// models
import {
  WorkspacePaymentMethodCreateModel,
  WorkspacePaymentMethodUpdateModel,
  WorkspacePaymentMethodSearchModel
} from './models';

@Controller('workspace-payment-methods')
@RequireLogin()
@UseFilters(HttpExceptionFilter)
export class WorkspacePaymentMethodController extends BaseController {
  constructor(
    private readonly workspacePaymentMethodService: WorkspacePaymentMethodService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: WorkspacePaymentMethodCreateModel) {
    return this.workspacePaymentMethodService.create(body);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspacePaymentMethodUpdateModel
  ) {
    return this.workspacePaymentMethodService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: WorkspacePaymentMethodSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;
    if (paginate) {
      result = await this.workspacePaymentMethodService.findWithPaginate(query);
      // do populates
      result.docs = await this.workspacePaymentMethodService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspacePaymentMethodService.find(query, {
        lean: true
      });
      // do populates
      result = await this.workspacePaymentMethodService._populate(
        result,
        populates
      );
    }

    return result;
  }

  @Get('service-charge')
  public async getPaymentServiceCharge(
    @Query('amount') amount: number,
    @Query('paymentMethod') paymentMethod: string
  ) {
    return this.workspacePaymentMethodService.getPaymentServiceCharge(
      amount,
      paymentMethod
    );
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspacePaymentMethodService.findById(
      param._id,
      {lean: true}
    );

    return this.workspacePaymentMethodService._populate(
      result,
      query?.populates || []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.workspacePaymentMethodService.deleteWorkspacePaymentMethod(
      param._id
    );
  }

  /**
   * update workspacePaymentMethod  isActive
   * /put/:_id/toggle-isActive?isActive=true
   * @param param
   * @param query req.query.isActive - true or false
   */
  @Put(':_id/toggle-isActive')
  @RequireLogin()
  public async toggleWatch(
    @Param() param: ParamIdModel,
    @Query() query: {isActive}
  ) {
    const isActive =
      query.isActive !== undefined ? query.isActive === 'true' : undefined;
    return this.workspacePaymentMethodService.toggleIsActive(
      param._id,
      isActive
    );
  }
}
