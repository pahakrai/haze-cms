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
import {WorkspaceAppService, DevicePlatformType} from './workspaceApp.service';

// models
import {
  WorkspaceAppCreateModel,
  WorkspaceAppUpdateModel,
  WorkspaceAppSearchModel,
  NextReleaseInfoModel
} from './models';

@RequireLogin()
@Controller('workspace-apps')
@UseFilters(HttpExceptionFilter)
export class WorkspaceAppController extends BaseController {
  constructor(private readonly workspaceAppService: WorkspaceAppService) {
    super();
  }

  @Post()
  public async create(@Body() body: WorkspaceAppCreateModel) {
    return this.workspaceAppService.create(body);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspaceAppUpdateModel
  ) {
    return this.workspaceAppService.update(param._id, body);
  }

  @Put(':_id/launch-workspace-app/:platformType')
  public async launchApp(
    @Param() param: ParamIdModel & {platformType: DevicePlatformType}
  ) {
    return this.workspaceAppService.launchApp(param._id, param.platformType);
  }

  @Put(':_id/release-workspace-app/:platformType')
  public async releaseApp(
    @Param() param: ParamIdModel & {platformType: DevicePlatformType},
    @Body() body: NextReleaseInfoModel
  ) {
    return this.workspaceAppService.releaseApp(
      param._id,
      param.platformType,
      body
    );
  }
  @Get()
  public async find(@Query() query: WorkspaceAppSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.workspaceAppService.findWithPaginate(query);
      // do populates
      result.docs = await this.workspaceAppService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspaceAppService.find(query, {lean: true});
      // do populates
      result = await this.workspaceAppService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspaceAppService.findById(param._id, {
      lean: true
    });

    return this.workspaceAppService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.workspaceAppService.delete(param._id);
  }
}
