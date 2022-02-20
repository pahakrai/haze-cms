import {IWalletBalanceTransaction} from './IWalletBalanceTransaction';
import {
  WalletBalanceTransactionCreateModel,
  WalletBalanceTransactionUpdateModel
} from '../models';

export interface IWalletBalanceTransactionService {
  create(
    walletBalanceTransactionCreateModel: WalletBalanceTransactionCreateModel
  ): Promise<IWalletBalanceTransaction>;
  findById(_id: string): Promise<IWalletBalanceTransaction | null>;
  update(
    _id: string,
    walletBalanceTransactionUpdateModel: WalletBalanceTransactionUpdateModel
  ): Promise<IWalletBalanceTransaction | null>;
  delete(_id: string): void;
}
