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
import common from '@golpasal/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {WorkspaceSubscriptionService} from './workspaceSubscription.service';

// models
import {
  WorkspaceSubscriptionSubscribeModel,
  WorkspaceSubscriptionUpdateModel,
  WorkspaceSubscriptionSearchModel
} from './models';
import {UserTypes} from 'src/core';

const {UserType} = common.type;

@Controller('workspace-subscriptions')
@UseFilters(HttpExceptionFilter)
export class WorkspaceSubscriptionController extends BaseController {
  constructor(
    private readonly workspaceSubscriptionService: WorkspaceSubscriptionService
  ) {
    super();
  }

  @Post()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async create(@Body() body: WorkspaceSubscriptionSubscribeModel) {
    return this.workspaceSubscriptionService.subscribeUs(body);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspaceSubscriptionUpdateModel
  ) {
    return this.workspaceSubscriptionService.update(param._id, body, {
      lean: true
    });
  }

  @Get()
  public async find(@Query() query: WorkspaceSubscriptionSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.workspaceSubscriptionService.findWithPaginate(query);
      // do populates
      result.docs = await this.workspaceSubscriptionService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspaceSubscriptionService.find(query, {
        lean: true
      });
      // do populates
      result = await this.workspaceSubscriptionService._populate(
        result,
        populates
      );
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspaceSubscriptionService.findById(param._id, {
      lean: true
    });

    return this.workspaceSubscriptionService._populate(
      result,
      query?.populates || []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.workspaceSubscriptionService.delete(param._id);
  }
}
