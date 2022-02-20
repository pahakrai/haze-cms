import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  // Delete,
  // UseGuards,
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
import {ParamService} from './param.service';

// models
import {ParamCreateModel, ParamUpdateModel, ParamSearchModel} from './models';

@Controller('params')
@UseFilters(HttpExceptionFilter)
export class ParamController extends BaseController {
  constructor(private readonly paramService: ParamService) {
    super();
  }

  @Post()
  @RequireLogin()
  public async create(@Body() body: ParamCreateModel) {
    return this.paramService.create(body);
  }

  @Put(':_id')
  @RequireLogin()
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: ParamUpdateModel
  ) {
    return this.paramService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: ParamSearchModel) {
    let result: any;
    const {paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.paramService.findWithPaginate(query);
    } else {
      result = await this.paramService.find(query, {lean: true});
    }

    return result;
  }

  @Get('by-type/:type')
  public async findByType(@Param('type') type: string) {
    const result = await this.paramService.find({types: [type]});

    return result.length ? result[0] : null;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel) {
    const result = await this.paramService.findById(param._id, {lean: true});

    return result;
  }

  // @Delete(':_id')
  // @RequireLogin()
  // public async delete(@Param() param: ParamIdModel) {
  //   return this.paramService.delete(param._id);
  // }
}
