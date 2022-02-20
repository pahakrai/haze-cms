import {IWalletBankCard} from './IWalletBankCard';
import {WalletBankCardCreateModel, WalletBankCardUpdateModel} from '../models';

export interface IWalletBankCardService {
  create(
    walletBankCardCreateModel: WalletBankCardCreateModel
  ): Promise<IWalletBankCard>;
  findById(_id: string): Promise<IWalletBankCard | null>;
  update(
    _id: string,
    walletBankCardUpdateModel: WalletBankCardUpdateModel
  ): Promise<IWalletBankCard | null>;
  delete(_id: string): void;
}
