import {
  Get,
  Param,
  Query,
  Controller,
  UseFilters,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common';

// core
// services
import {WalletService} from './wallet.service';
// models
import {WalletBalanceService} from '../WalletBalance/walletBalance.service';
import {WalletBalanceSearchModel} from '../WalletBalance/models';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';
import {
  WalletCreateModel,
  WalletUpdateModel,
  WalletSearchModel
} from './models';

@Controller('wallets')
@UseFilters(HttpExceptionFilter)
export class WalletController extends BaseController {
  constructor(
    private readonly walletService: WalletService,
    private readonly walletBalanceService: WalletBalanceService
  ) {
    super();
  }

  @Get('isEmailExists')
  public async isEmailExists(@Query() query) {
    const isEmailExists = await this.walletService.isEmailExists(query.email);

    return isEmailExists;
  }

  @Get(':_id/balances')
  public async getWalletBalances(
    @Param() param,
    @Query() query: WalletBalanceSearchModel
  ) {
    const balances = await this.walletService.getWalletBalances(
      param._id,
      query.types
    );
    return balances;
  }

  @Get(':_id/info')
  public async getWalletInfo(@Param() param) {
    const walletInfo = await this.walletService.getWalletInfo(param._id);

    return walletInfo;
  }
  // Create
  @Post('/')
  @RequireLogin()
  public async create(@Body() body: WalletCreateModel, @Query() query?) {
    const result = await this.walletService.create(body);
    return this.walletBalanceService._populate(result, query?.populates);
  }
  @Put('/:id')
  @RequireLogin()
  public async update(
    @Param() param,
    @Body() body: WalletUpdateModel,
    @Query() query?
  ) {
    const result = await this.walletService.update(param.id, body);
    return this.walletBalanceService._populate(result, query?.populates);
  }
  @Get()
  public async find(@Query() query: WalletSearchModel) {
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
