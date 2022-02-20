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
import common from '@golpasal/common';

// core
import {
  ParamIdModel,
  BaseController,
  HttpExceptionFilter,
  RequireLogin,
  UserTypes
} from 'src/core';
// services
import {UserCreditService} from './userCredit.service';

// models
import {
  UserCreditCreateModel,
  UserCreditUpdateModel,
  UserCreditSearchModel,
  UserCreditGetBalanceModel
} from './models';

const {UserType} = common.type;

@RequireLogin()
@Controller('user-credits')
@UseFilters(HttpExceptionFilter)
export class UserCreditController extends BaseController {
  constructor(private readonly userCreditService: UserCreditService) {
    super();
  }

  @Post()
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROGRAMMATIC, UserType.PROVIDER)
  public async create(@Body() body: UserCreditCreateModel) {
    return this.userCreditService.create(body);
  }

  @Put(':_id')
  @UserTypes(UserType.SYSTEM_ADMIN, UserType.PROVIDER)
  public async update(
    @Param() param: ParamIdModel,
    @Body() body: UserCreditUpdateModel
  ) {
    return this.userCreditService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: UserCreditSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    if (String(paginate) === 'true') {
      result = await this.userCreditService.findWithPaginate(query);
      // do populates
      result.docs = await this.userCreditService._populate(
        result.docs,
        populates
      );
    } else {
      result = await this.userCreditService.find(query);
      // do populates
      result = await this.userCreditService._populate(result, populates);
    }

    return result;
  }

  @Get('balance/:userId')
  public async getUserBalance(
    @Param('userId') userId: string,
    @Query() query: UserCreditGetBalanceModel
  ) {
    const balance = await this.userCreditService.getBalance(
      userId,
      query.amountType,
      query.currency
    );

    return balance;
  }

  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.userCreditService.findById(param._id);

    return this.userCreditService._populate(
      result,
      query ? query.populates : []
    );
  }

  @Delete(':_id')
  public async delete(@Param() param: ParamIdModel) {
    return this.userCreditService.delete(param._id);
  }
}
