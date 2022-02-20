import {IWalletBalance} from './IWalletBalance';
import {WalletBalanceCreateModel, WalletBalanceUpdateModel} from '../models';

export interface IWalletBalanceService {
  create(
    walletBalanceCreateModel: WalletBalanceCreateModel
  ): Promise<IWalletBalance>;
  findById(_id: string): Promise<IWalletBalance | null>;
  update(
    _id: string,
    walletBalanceUpdateModel: WalletBalanceUpdateModel
  ): Promise<IWalletBalance | null>;
  delete(_id: string): void;
}
