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
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {WorkspaceSubscriptionInvoiceService} from './workspaceSubscriptionInvoice.service';

// models
import {
  WorkspaceSubscriptionInvoiceCreateModel,
  WorkspaceSubscriptionInvoiceUpdateModel,
  WorkspaceSubscriptionInvoiceSearchModel
} from './models';

@Controller('workspace-subscription-invoices')
@UseFilters(HttpExceptionFilter)
export class WorkspaceSubscriptionInvoiceController extends BaseController {
  constructor(
    private readonly workspaceSubscriptionInvoiceService: WorkspaceSubscriptionInvoiceService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: WorkspaceSubscriptionInvoiceCreateModel) {
    return this.workspaceSubscriptionInvoiceService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspaceSubscriptionInvoiceUpdateModel
  ) {
    return this.workspaceSubscriptionInvoiceService.update(param._id, body, {
      lean: true
    });
  }

  @Get()
  public async find(@Query() query: WorkspaceSubscriptionInvoiceSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.workspaceSubscriptionInvoiceService.findWithPaginate(
        query
      );
      // do populates
      result.docs = await this.workspaceSubscriptionInvoiceService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspaceSubscriptionInvoiceService.find(query, {
        lean: true
      });
      // do populates
      result = await this.workspaceSubscriptionInvoiceService._populate(
        result,
        populates
      );
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspaceSubscriptionInvoiceService.findById(
      param._id,
      {lean: true}
    );

    return this.workspaceSubscriptionInvoiceService._populate(
      result,
      query?.populates || []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.workspaceSubscriptionInvoiceService.delete(param._id);
  }
}
