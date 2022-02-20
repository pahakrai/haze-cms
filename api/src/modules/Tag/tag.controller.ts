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
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  PaginateOptionsQueryModel
} from 'src/core';

// services
import {TagService} from './tag.service';

// models
import {TagCreateModel, TagUpdateModel, TagSearchModel} from './models';

@Controller('tags')
@UseFilters(HttpExceptionFilter)
export class TagController extends BaseController {
  constructor(private readonly tagService: TagService) {
    super();
  }

  @Post()
  public async create(@Body() body: TagCreateModel) {
    const workspace = this.tagService.getWorkspaceId();
    return this.tagService.create({...body, ...(workspace ? {workspace} : {})});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: TagUpdateModel
  ) {
    const workspace = this.tagService.getWorkspaceId();
    return this.tagService.update(param._id, {
      ...body,
      ...(workspace ? {workspace} : {})
    });
  }

  @Get('distinct')
  public async getDistinctTags(
    @Query() query: TagSearchModel & PaginateOptionsQueryModel
  ) {
    return this.tagService.getDistinctTags(query);
  }

  @Get()
  public async find(@Query() query: TagSearchModel) {
    return this.tagService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query) {
    const result = await this.tagService.findById(param._id);
    return this.tagService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.tagService.delete(param._id);
  }
}
