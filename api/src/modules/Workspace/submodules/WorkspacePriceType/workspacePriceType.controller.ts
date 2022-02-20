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
import {WorkspacePriceTypeService} from './workspacePriceType.service';

// models
import {
  WorkspacePriceTypeCreateModel,
  WorkspacePriceTypeUpdateModel,
  WorkspacePriceTypeSearchModel
} from './models';

@RequireLogin()
@Controller('workspace-price-types')
@UseFilters(HttpExceptionFilter)
export class WorkspacePriceTypeController extends BaseController {
  constructor(
    private readonly workspacepriceTypeService: WorkspacePriceTypeService
  ) {
    super();
  }

  @Post()
  public async create(@Body() body: WorkspacePriceTypeCreateModel) {
    return this.workspacepriceTypeService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: WorkspacePriceTypeUpdateModel
  ) {
    return this.workspacepriceTypeService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: WorkspacePriceTypeSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.workspacepriceTypeService.findWithPaginate(query);
      // do populates
      result.docs = await this.workspacepriceTypeService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.workspacepriceTypeService.find(query, {lean: true});
      // do populates
      result = await this.workspacepriceTypeService._populate(
        result,
        populates
      );
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.workspacepriceTypeService.findById(param._id, {
      lean: true
    });

    return this.workspacepriceTypeService._populate(
      result,
      query?.populates || []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.workspacepriceTypeService.delete(param._id);
  }
}
