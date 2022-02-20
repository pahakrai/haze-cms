import {IWallet} from './IWallet';
import {WalletCreateModel, WalletUpdateModel} from '../models';

export interface IWalletService {
  create(walletCreateModel: WalletCreateModel): Promise<IWallet>;
  findById(_id: string): Promise<IWallet | null>;
  update(
    _id: string,
    walletUpdateModel: WalletUpdateModel
  ): Promise<IWallet | null>;
  delete(_id: string): void;
}
