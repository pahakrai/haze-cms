import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {REQUEST} from '@nestjs/core';
import {PaginateModel} from 'mongoose';

// interfaces & models
import {
  WalletBankCardTransactionCreateModel,
  WalletBankCardTransactionUpdateModel,
  WalletBankCardTransactionSearchModel
} from './models';
import {
  IWalletBankCardTransaction,
  IWalletBankCardTransactionService
} from './interfaces';
import {BaseCRUDService} from 'src/core/layers/base.crud.service';

@Injectable({scope: Scope.REQUEST})
export class WalletBankCardTransactionService
  extends BaseCRUDService<
    IWalletBankCardTransaction,
    WalletBankCardTransactionCreateModel,
    WalletBankCardTransactionUpdateModel,
    WalletBankCardTransactionSearchModel
  >
  implements IWalletBankCardTransactionService {
  constructor(
    @Inject(REQUEST) request,
    @InjectModel('WalletBankCardTransactions')
    private readonly walletBankCardTransactionRepository: PaginateModel<IWalletBankCardTransaction>
  ) {
    super(walletBankCardTransactionRepository, request);
  }
}
