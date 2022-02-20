import {IWallet} from './IWallet';

export interface IWalletInfo extends IWallet {
  bankCardCount: number;
  balance: number;
}
