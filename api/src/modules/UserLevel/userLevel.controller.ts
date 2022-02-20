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
import {UserLevelService} from './userLevel.service';

// models
import {
  UserLevelCreateModel,
  UserLevelUpdateModel,
  UserLevelSearchModel
} from './models';

@RequireLogin()
@Controller('user-levels')
@UseFilters(HttpExceptionFilter)
export class UserLevelController extends BaseController {
  constructor(private readonly userLevelService: UserLevelService) {
    super();
  }

  @Post()
  public async create(@Body() body: UserLevelCreateModel) {
    return this.userLevelService.create(body);
  }

  @Put(':_id')
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: UserLevelUpdateModel
  ) {
    return this.userLevelService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: UserLevelSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.userLevelService.findWithPaginate(query);
      // do populates
      result.docs = await this.userLevelService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.userLevelService.find(query, {lean: true});
      // do populates
      result = await this.userLevelService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.userLevelService.findById(param._id, {
      lean: true
    });

    return this.userLevelService._populate(result, query?.populates || []);
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.userLevelService.delete(param._id);
  }
}
