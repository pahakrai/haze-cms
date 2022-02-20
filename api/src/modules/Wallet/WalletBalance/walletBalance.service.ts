import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {PaginateModel} from 'mongoose';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
// interfaces & models
import {
  WalletBalanceCreateModel,
  WalletBalanceUpdateModel,
  WalletBalanceSearchModel,
  WalletBalanceChargeModel
} from './models';
import {IWalletBalance, IWalletBalanceService} from './interfaces';
// eslint-disable-next-line max-len
import {WalletBalanceTransactionService} from '../WalletBalanceTransaction/walletBalanceTransaction.service';

@Injectable({scope: Scope.REQUEST})
export class WalletBalanceService
  extends BaseCRUDService<
    IWalletBalance,
    WalletBalanceCreateModel,
    WalletBalanceUpdateModel,
    WalletBalanceSearchModel
  >
  implements IWalletBalanceService {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WalletBalances')
    private readonly walletBalanceRepository: PaginateModel<IWalletBalance>,
    private readonly walletBalanceTransactionService: WalletBalanceTransactionService
  ) {
    super(walletBalanceRepository, request);
  }

  public _castQuery(searchModel: WalletBalanceSearchModel): any {
    const {types, ...rest} = searchModel;
    const query: any = {...rest};

    if (types && types.length > 0) {
      query.type = {$in: types};
    }

    return query;
  }

  public async chargeBalance(transaction: WalletBalanceChargeModel) {
    const walletBalance = await this.findById(transaction.balanceId);

    if (!walletBalance) {
      throw new Error('Wallet not found');
    }

    // check current balance can afford charge or not
    if (
      transaction.enforcePositiveBalance &&
      walletBalance.amount + transaction.amount < 0
    ) {
      throw new Error('Insufficient funds');
    }

    // add transaction log
    await this.walletBalanceTransactionService.create({
      walletBalance: transaction.balanceId,
      event: transaction.event,
      description: transaction.description,
      change: transaction.amount,
      amount: walletBalance.amount
    });

    // save new wallet balance change to db
    return this.update(transaction.balanceId, {
      amount: walletBalance.amount + transaction.amount
    });
  }
}
