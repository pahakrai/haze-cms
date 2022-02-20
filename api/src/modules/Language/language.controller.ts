import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Controller,
  UseFilters,
  UseInterceptors
} from '@nestjs/common';

import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  RequireLogin
} from 'src/core';
import {WorkspaceInterceptor} from 'src/core/interceptors';

// services
import {LanguageService} from './language.service';

// models
import {
  LanguageCreateModel,
  LanguageSearchModel,
  LanguageUpdateModel
} from './models';

@Controller('languages')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(WorkspaceInterceptor)
export class LanguageController extends BaseController {
  constructor(private readonly languageService: LanguageService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: LanguageCreateModel) {
    return this.languageService.create(body, {lean: true});
  }

  @Get()
  public async find(@Query() query: LanguageSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.languageService.findWithPaginate(query);
      // do populates
      result.docs = await this.languageService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.languageService.find(query, {lean: true});
      // do populates
      result = await this.languageService._populate(result, populates);
    }
    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.languageService.findById(param._id, {lean: true});

    return this.languageService._populate(result, query?.populates || []);
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: LanguageUpdateModel
  ) {
    return this.languageService.update(param._id, body, {lean: true});
  }
}
