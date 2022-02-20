import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';
import {REQUEST} from '@nestjs/core';
import {PaginateModel} from 'mongoose';

// core
// interfaces & models
import {
  WalletBalanceTransactionCreateModel,
  WalletBalanceTransactionUpdateModel,
  WalletBalanceTransactionSearchModel
} from './models';
import {
  IWalletBalanceTransaction,
  IWalletBalanceTransactionService
} from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class WalletBalanceTransactionService
  extends BaseCRUDService<
    IWalletBalanceTransaction,
    WalletBalanceTransactionCreateModel,
    WalletBalanceTransactionUpdateModel,
    WalletBalanceTransactionSearchModel
  >
  implements IWalletBalanceTransactionService {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WalletBalanceTransactions')
    private readonly walletBalanceTransactionRepository: PaginateModel<IWalletBalanceTransaction>
  ) {
    super(walletBalanceTransactionRepository, request);
  }
}
