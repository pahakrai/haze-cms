import {
  Get,
  Body,
  Post,
  Patch,
  Param,
  Query,
  Controller,
  UseFilters,
  Put,
  Delete
} from '@nestjs/common';
import {ParamIdModel} from 'src/core/models';
import {BaseController} from 'src/core/layers';
import {RequireLogin} from 'src/core/decorators';
import {HttpExceptionFilter} from 'src/core/filters';
import {WalletBankCardService} from './walletBankCard.service';
// models
import {
  WalletBankCardCreateModel,
  WalletBankCardSearchModel,
  WalletBankCardUpdateModel
} from './models';
import {WalletBankCardChargeModel} from './models/walletBankCard.charge.model';

@Controller(':walletId/bank-cards')
@UseFilters(HttpExceptionFilter)
export class WalletBankCardController extends BaseController {
  constructor(private readonly walletBankCardService: WalletBankCardService) {
    super();
  }

  @Get()
  public async getByWallet(
    @Query() query: WalletBankCardSearchModel,
    @Param() param
  ) {
    const bankCards = await this.walletBankCardService.find({
      ...query,
      wallet: param.walletId
    });

    return bankCards;
  }

  @Post()
  public async createBankCard(
    @Body() body: WalletBankCardCreateModel,
    @Param() param
  ) {
    const bankCard = await this.walletBankCardService.create({
      ...body,
      wallet: param._id
    });

    return bankCard;
  }

  @Post('charge')
  public async chargeCard(@Body() body: WalletBankCardChargeModel) {
    const transaction = await this.walletBankCardService.chargeCard(body);

    return transaction;
  }

  @Patch(':bankCardId/set-default')
  public async setDefaultBankCard(@Param() param) {
    const bankCard = await this.walletBankCardService.setDefaultBankCard(
      param.walletId,
      param.bankCardId
    );

    return bankCard;
  }
  @Post('/')
  @RequireLogin()
  public async create(
    @Body() body: WalletBankCardCreateModel,
    @Query() query?
  ) {
    const result = await this.walletBankCardService.create(body);
    return this.walletBankCardService._populate(result, query?.populates);
  }
  @Put('/:id')
  @RequireLogin()
  public async update(
    @Param() param,
    @Body() body: WalletBankCardUpdateModel,
    @Query() query?
  ) {
    const result = await this.walletBankCardService.update(param.id, body);
    return this.walletBankCardService._populate(result, query?.populates);
  }
  @Get()
  public async find(@Query() query: WalletBankCardSearchModel) {
    let result: any;
    const {populates, paginate} = query;

    result = await this.walletBankCardService.find({
      ...query
    });
    if (paginate) {
      // do populates
      result.docs = await this.walletBankCardService._populate(
        result.docs,
        populates
      );
    } else {
      // do populates
      result = await this.walletBankCardService._populate(result, populates);
    }

    return result;
  }
  @Get(':_id')
  public async findById(@Param() param: ParamIdModel, @Query() query?) {
    const result = await this.walletBankCardService.findById(param._id);
    return this.walletBankCardService._populate(
      result,
      query ? query.populates : []
    );
  }
  @Delete(':_id')
  @RequireLogin()
  public async delete(@Param() param: ParamIdModel) {
    return this.walletBankCardService.delete(param._id);
  }
}
