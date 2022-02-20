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
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {WorkspaceTypeService} from './workspaceType.service';

// models
import {
  WorkspaceTypeCreateModel,
  WorkspaceTypeUpdateModel,
  WorkspaceTypeSearchModel
} from './models';
import {
  WorkspaceInterceptor,
  MapDisplayLocalizeInterceptor
} from 'src/core/interceptors';
import {RequireLogin, WorkspaceId} from 'src/core';

@Controller('workspace-types')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class WorkspaceTypeController extends BaseController {
  constructor(private readonly workspaceTypeService: WorkspaceTypeService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: WorkspaceTypeCreateModel) {
    return this.workspaceTypeService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspaceTypeUpdateModel
  ) {
    return this.workspaceTypeService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: WorkspaceTypeSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.workspaceTypeService.findWithPaginate(query);
      // do populates
      result.docs = await this.workspaceTypeService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspaceTypeService.find(query, {lean: true});
      // do populates
      result = await this.workspaceTypeService._populate(result, populates);
    }

    return result;
  }

  @Get('my-workspace-type')
  @RequireLogin()
  public async findMyWorkspaceType() {
    return this.workspaceTypeService.findMyWorkspaceType();
  }

  @Get('user-type/:userType/requirements/:requirementType')
  public async getWorkspaceTypeRequirements(
    @Param() param: ParamIdModel & {userType: string; requirementType: string}
  ) {
    return this.workspaceTypeService.getRequirements(
      param?.userType,
      param?.requirementType
    );
  }

  @Get('user-type-display')
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  public async getUserTypes(@WorkspaceId() workspaceId) {
    return this.workspaceTypeService.getUserTypesDisplay(workspaceId);
  }

  @Get('service-type-display')
  @UseInterceptors(MapDisplayLocalizeInterceptor)
  public async getServiceTypes(@WorkspaceId() workspaceId) {
    return this.workspaceTypeService.getServiceTypesDisplay(workspaceId);
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspaceTypeService.findById(param._id, {
      lean: true
    });

    return this.workspaceTypeService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.workspaceTypeService.delete(param._id);
  }
}
