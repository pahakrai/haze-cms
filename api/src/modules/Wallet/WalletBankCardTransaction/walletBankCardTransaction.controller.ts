import {
  Controller,
  UseFilters,
  Post,
  // UseGuards,
  Body,
  Query,
  Put,
  Param,
  Get,
  Delete
} from '@nestjs/common';
import {WalletBankCardTransactionService} from './walletBankCardTransaction.service';
// models
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';
import {
  WalletBankCardTransactionCreateModel,
  WalletBankCardTransactionUpdateModel,
  WalletBankCardTransactionSearchModel
} from './models';

@Controller('wallet-bank-card-transactions')
@UseFilters(HttpExceptionFilter)
export class WalletBankCardTransactionController extends BaseController {
  constructor(
    private readonly walletBankCardTransactionService: WalletBankCardTransactionService
  ) {
    super();
  }
  @Post('/')
  @RequireLogin()
  public async create(
    @Body() body: WalletBankCardTransactionCreateModel,
    @Query() query?
  ) {
    const result = await this.walletBankCardTransactionService.create(body);
    return this.walletBankCardTransactionService._populate(
      result,
      query?.populates
    );
  }
  @Put('/:id')
  @RequireLogin()
  public async update(
    @Param() param,
    @Body() body: WalletBankCardTransactionUpdateModel,
    @Query() query?
  ) {
    const result = await this.walletBankCardTransactionService.update(
      param.id,
      body
    );
    return this.walletBankCardTransactionService._populate(
      result,
      query?.populates
    );
  }
  @Get()
  public async find(@Query() query: WalletBankCardTransactionSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    result = await this.walletBankCardTransactionService.find({
      ...query
    });
    if (paginate) {
      // do populates
      result.docs = await this.walletBankCardTransactionService._populate(
        result.docs,
        populates
      );
    } else {
      // do populates
      result = await this.walletBankCardTransactionService._populate(
        result,
        populates
      );
    }

    return result;
  }
  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.walletBankCardTransactionService.findById(
      param._id
    );
    return this.walletBankCardTransactionService._populate(
      result,
      query ? query.populates : []
    );
  }
  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.walletBankCardTransactionService.delete(param._id);
  }
}
