import {
  Controller,
  UseFilters,
  Post,
  Body,
  Query,
  Put,
  Param,
  Get,
  Delete
} from '@nestjs/common';
import {WalletBalanceTransactionService} from './walletBalanceTransaction.service';

import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';
import {
  WalletBalanceTransactionUpdateModel,
  WalletBalanceTransactionSearchModel,
  WalletBalanceTransactionCreateModel
} from './models';

@Controller('wallet-balance-transactions')
@UseFilters(HttpExceptionFilter)
export class WalletBalanceTransactionController extends BaseController {
  constructor(
    private readonly walletBalanceTransactionService: WalletBalanceTransactionService
  ) {
    super();
  }
  // Create
  @Post('/')
  @RequireLogin()
  public async create(
    @Body() body: WalletBalanceTransactionCreateModel,
    @Query() query?
  ) {
    const result = await this.walletBalanceTransactionService.create(body);
    return this.walletBalanceTransactionService._populate(
      result,
      query?.populates
    );
  }
  @Put('/:id')
  @RequireLogin()
  public async update(
    @Param() param,
    @Body() body: WalletBalanceTransactionUpdateModel,
    @Query() query?
  ) {
    const result = await this.walletBalanceTransactionService.update(
      param.id,
      body
    );
    return this.walletBalanceTransactionService._populate(
      result,
      query?.populates
    );
  }
  @Get()
  public async find(@Query() query: WalletBalanceTransactionSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    result = await this.walletBalanceTransactionService.find({
      ...query
    });
    if (paginate) {
      // do populates
      result.docs = await this.walletBalanceTransactionService._populate(
        result.docs,
        populates
      );
    } else {
      // do populates
      result = await this.walletBalanceTransactionService._populate(
        result,
        populates
      );
    }

    return result;
  }
  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.walletBalanceTransactionService.findById(
      param._id
    );
    return this.walletBalanceTransactionService._populate(
      result,
      query ? query.populates : []
    );
  }
  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.walletBalanceTransactionService.delete(param._id);
  }
}
