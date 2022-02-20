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
import {PhoneRegionService} from './phoneRegion.service';

// models
import {
  PhoneRegionCreateModel,
  PhoneRegionUpdateModel,
  PhoneRegionSearchModel
} from './models';

@Controller('phone-regions')
@UseFilters(HttpExceptionFilter)
export class PhoneRegionController extends BaseController {
  constructor(private readonly phoneRegionService: PhoneRegionService) {
    super();
  }

  @RequireLogin()
  @Post()
  public async create(@Body() body: PhoneRegionCreateModel) {
    return this.phoneRegionService.create(body, {lean: true});
  }

  @RequireLogin()
  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: PhoneRegionUpdateModel
  ) {
    return this.phoneRegionService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: PhoneRegionSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.phoneRegionService.findWithPaginate(query);
      // do populates
      result.docs = await this.phoneRegionService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.phoneRegionService.find(query, {lean: true});
      // do populates
      result = await this.phoneRegionService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.phoneRegionService.findById(param._id, {
      lean: true
    });

    return this.phoneRegionService._populate(result, query?.populates || []);
  }

  @RequireLogin()
  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.phoneRegionService.delete(param._id);
  }
}
