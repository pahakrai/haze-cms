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
  RequireLogin
} from 'src/core';

// services
import {ThemeService} from './theme.service';

// models
import {ThemeCreateModel, ThemeUpdateModel, ThemeSearchModel} from './models';

@Controller('themes')
@UseFilters(HttpExceptionFilter)
export class ThemeController extends BaseController {
  constructor(private readonly themeService: ThemeService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: ThemeCreateModel) {
    return this.themeService.create(body, {lean: true});
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: ThemeUpdateModel
  ) {
    return this.themeService.update(param._id, body, {lean: true});
  }

  @Get()
  @RequireLogin()
  public async find(@Query() query: ThemeSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.themeService.findWithPaginate(query);
      // do populates
      result.docs = await this.themeService._populate(result.docs, populates);
    } else {
      result = await this.themeService.find(query, {lean: true});
      // do populates
      result = await this.themeService._populate(result, populates);
    }

    return result;
  }

  @RequireLogin()
  @Get('my-themes')
  public async myTheme(@Query() query?) {
    return this.themeService.getMyThemes(query.scope);
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.themeService.findById(param._id, {lean: true});

    return this.themeService._populate(result, query?.populates || []);
  }

  @RequireLogin()
  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.themeService.delete(param._id);
  }
}
