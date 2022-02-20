import {
  Get,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters
} from '@nestjs/common';
import {RequireLogin} from 'src/core';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {UserSearchHistoryService} from './userSearchHistory.service';

// models
import {UserSearchHistorySearchModel} from './models';

@RequireLogin()
@Controller('user-search-histories')
@UseFilters(HttpExceptionFilter)
export class UserSearchHistoryController extends BaseController {
  constructor(
    private readonly userSearchHistoryService: UserSearchHistoryService
  ) {
    super();
  }

  @Get()
  public async find(@Query() query: UserSearchHistorySearchModel) {
    let result: any;
    const {populates = [], paginate} = query;

    if (paginate) {
      result = await this.userSearchHistoryService.findWithPaginate(query);
      // do populates
      result.docs = await this.userSearchHistoryService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.userSearchHistoryService.find(query, {lean: true});
      // do populates
      result = await this.userSearchHistoryService._populate(result, populates);
    }

    return result;
  }

  @Get('my-history')
  public async findMySearchHistory(
    @Query('q') q: string,
    @Query('limit') limit: number,
    @Query('populates') populates: string[]
  ) {
    const userHistories = this.userSearchHistoryService.findMySearchHistory(
      {q},
      {limit}
    );

    return this.userSearchHistoryService._populate(userHistories, populates);
  }

  @Delete()
  public async clearMySearchHistory() {
    return this.userSearchHistoryService.clearMySearchHistory();
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.userSearchHistoryService.delete(param._id);
  }
}
