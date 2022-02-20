import {IWalletBankCardTransaction} from './IWalletBankCardTransaction';
import {
  WalletBankCardTransactionCreateModel,
  WalletBankCardTransactionUpdateModel
} from '../models';

export interface IWalletBankCardTransactionService {
  create(
    walletBankCardTransactionCreateModel: WalletBankCardTransactionCreateModel
  ): Promise<IWalletBankCardTransaction>;
  findById(_id: string): Promise<IWalletBankCardTransaction | null>;
  update(
    _id: string,
    walletBankCardTransactionUpdateModel: WalletBankCardTransactionUpdateModel
  ): Promise<IWalletBankCardTransaction | null>;
  delete(_id: string): void;
}
