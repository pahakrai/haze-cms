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
import {WorkspacePhoneRegionService} from './workspacePhoneRegion.service';

// models
import {
  WorkspacePhoneRegionCreateModel,
  WorkspacePhoneRegionUpdateModel,
  WorkspacePhoneRegionSearchModel
} from './models';

@Controller('workspace-phone-regions')
@UseFilters(HttpExceptionFilter)
export class WorkspacePhoneRegionController extends BaseController {
  constructor(
    private readonly workspacePhoneRegionService: WorkspacePhoneRegionService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: WorkspacePhoneRegionCreateModel) {
    return this.workspacePhoneRegionService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspacePhoneRegionUpdateModel
  ) {
    return this.workspacePhoneRegionService.update(param._id, body, {
      lean: true
    });
  }

  @Get()
  public async find(@Query() query: WorkspacePhoneRegionSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.workspacePhoneRegionService.findWithPaginate(query);
      // do populates
      result.docs = await this.workspacePhoneRegionService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspacePhoneRegionService.find(query, {
        lean: true,
        sort: 'idx'
      });
      // do populates
      result = await this.workspacePhoneRegionService._populate(
        result,
        populates
      );
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspacePhoneRegionService.findById(param._id, {
      lean: true
    });

    return this.workspacePhoneRegionService._populate(
      result,
      query?.populates || []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.workspacePhoneRegionService.delete(param._id);
  }
}
