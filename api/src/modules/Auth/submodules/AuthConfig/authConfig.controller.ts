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
import {AuthConfigService} from './authConfig.service';

// models
import {
  AuthConfigCreateModel,
  AuthConfigUpdateModel,
  AuthConfigSearchModel
} from './models';

@Controller('auth-configs')
@UseFilters(HttpExceptionFilter)
export class AuthConfigController extends BaseController {
  constructor(private readonly authConfigService: AuthConfigService) {
    super();
  }

  @Post()
  public async create(@Body() body: AuthConfigCreateModel) {
    return this.authConfigService.create(body, {lean: true});
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: AuthConfigUpdateModel
  ) {
    return this.authConfigService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: AuthConfigSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.authConfigService.findWithPaginate(query);
      // do populates
      result.docs = await this.authConfigService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.authConfigService.find(query, {lean: true});
      // do populates
      result = await this.authConfigService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.authConfigService.findById(param._id, {
      lean: true
    });

    return this.authConfigService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.authConfigService.delete(param._id);
  }
}
