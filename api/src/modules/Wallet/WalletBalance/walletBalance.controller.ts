import {
  Body,
  Post,
  Param,
  Controller,
  UseFilters,
  Query,
  Put,
  Get,
  Delete
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';

// services
import {WalletBalanceService} from './walletBalance.service';
// models
import {
  WalletBalanceCreateModel,
  WalletBalanceChargeModel,
  WalletBalanceUpdateModel,
  WalletBalanceSearchModel
} from './models';

@Controller(':walletId/balances')
@UseFilters(HttpExceptionFilter)
export class WalletBalanceController extends BaseController {
  constructor(private readonly walletBalanceService: WalletBalanceService) {
    super();
  }

  @Post()
  public async createBalance(
    @Param() param,
    @Body() body: WalletBalanceCreateModel
  ) {
    const walletBalance = await this.walletBalanceService.create({
      ...body,
      wallet: param.walletId
    });

    if (new Date().getSeconds() % 2 === 0) {
      throw new Error('hello world');
    }
    return walletBalance;
  }

  @Post('charge')
  public async chargeBalance(@Body() body: WalletBalanceChargeModel) {
    const charge = await this.walletBalanceService.chargeBalance(body);

    return charge;
  }
  // Create
  @Post('/')
  @RequireLogin()
  public async create(@Body() body: WalletBalanceCreateModel, @Query() query?) {
    const result = await this.walletBalanceService.create(body);
    return this.walletBalanceService._populate(result, query?.populates);
  }
  @Put('/:id')
  @RequireLogin()
  public async update(
    @Param() param,
    @Body() body: WalletBalanceUpdateModel,
    @Query() query?
  ) {
    const result = await this.walletBalanceService.update(param.id, body);
    return this.walletBalanceService._populate(result, query?.populates);
  }
  @Get()
  public async find(@Query() query: WalletBalanceSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    result = await this.walletBalanceService.find({
      ...query
    });
    if (paginate) {
      // do populates
      result.docs = await this.walletBalanceService._populate(
        result.docs,
        populates
      );
    } else {
      // do populates
      result = await this.walletBalanceService._populate(result, populates);
    }

    return result;
  }
  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.walletBalanceService.findById(param._id);
    return this.walletBalanceService._populate(
      result,
      query ? query.populates : []
    );
  }
  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.walletBalanceService.delete(param._id);
  }
}
