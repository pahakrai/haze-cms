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
  UserTypes
} from 'src/core';
import common from '@golpasal/common';

// services
import {TagRecommendationService} from './tagRecommendation.service';

// models
import {
  TagRecommendationCreateModel,
  TagRecommendationUpdateModel,
  TagRecommendationSearchModel
} from './models';

const {UserType} = common.type;

@Controller('tag-recommendations')
@UseFilters(HttpExceptionFilter)
export class TagRecommendationController extends BaseController {
  constructor(
    private readonly tagRecommendationService: TagRecommendationService
  ) {
    super();
  }

  @Post()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async create(@Body() body: TagRecommendationCreateModel) {
    return this.tagRecommendationService.create(body, {lean: true});
  }

  @Put(':_id')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: TagRecommendationUpdateModel
  ) {
    return this.tagRecommendationService.update(param._id, body, {lean: true});
  }

  @Get()
  public async find(@Query() query: TagRecommendationSearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.tagRecommendationService.findWithPaginate(query);
      // do populates
      result.docs = await this.tagRecommendationService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.tagRecommendationService.find(query, {lean: true});
      // do populates
      result = await this.tagRecommendationService._populate(result, populates);
    }

    return result;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.tagRecommendationService.findById(param._id, {
      lean: true
    });

    return this.tagRecommendationService._populate(
      result,
      query?.populates || []
    );
  }

  @Delete(':_id')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER, UserType.USER)
  public async delete(@Param() param: ParamIdModel) {
    return this.tagRecommendationService.delete(param._id);
  }
}
