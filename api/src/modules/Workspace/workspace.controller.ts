import {
  Get,
  Put,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Controller,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';
import common from '@golpasal/common';

import {WorkspaceInterceptor} from 'src/core/interceptors';

// models
import {
  WorkspaceUpdateModel,
  WorkspaceSearchModel,
  WorkspaceCreateModel
} from './models';

// services
import {WorkspaceService} from './workspace.service';
import {BypassSecretGuard, RequireLogin, UserTypes} from 'src/core';

const {UserType} = common.type;

@Controller('workspaces')
@UseFilters(HttpExceptionFilter)
export class WorkspaceController extends BaseController {
  constructor(private readonly workspaceService: WorkspaceService) {
    super();
  }

  @Post()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async create(@Body() body: WorkspaceCreateModel) {
    return this.workspaceService.createWorkspace(body);
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspaceUpdateModel
  ) {
    return this.workspaceService.updateWorkspace(param._id, body);
  }

  @Get('current-workspace')
  @RequireLogin()
  @UseInterceptors(WorkspaceInterceptor)
  public async getCurrentWorkspace(@Query() query) {
    const workspace = await this.workspaceService.getMyCurrentWorkspace();

    return this.workspaceService._populate(workspace, query?.populates || []);
  }

  @Get()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async find(@Query() query: WorkspaceSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (paginate) {
      result = await this.workspaceService.findWithPaginate(query);
      // do populates
      result.docs = await this.workspaceService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspaceService.find(query, {lean: true});
      // do populates
      result = await this.workspaceService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspaceService.findById(param._id, {
      lean: true
    });

    return this.workspaceService._populate(result, query?.populates || []);
  }

  @BypassSecretGuard()
  @Get(':_id/safe-key')
  public async getWorkspaceSafeKey(@Param('_id') _id: string) {
    return this.workspaceService.getWorkspaceSafeKey(_id);
  }

  @BypassSecretGuard()
  @Get('code/:code')
  public async findByCode(@Param('code') code: string, @Query() query?) {
    const result = await this.workspaceService.findByCode(code);

    return this.workspaceService._populate(result, query?.populates || []);
  }

  @Patch(':_id/status/:status')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async updateStatus(
    @Param('_id') _id: string,
    @Param('status') status: number
  ) {
    return this.workspaceService.update(_id, {status}, {lean: true});
  }

  // @Delete(':_id')
  // @RequireLogin()
  // public async delete(@Param() param: ParamIdModel) {
  //   return this.workspaceService.delete(param._id);
  // }
}
