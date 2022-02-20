import {Module} from '@nestjs/common';
import {WalletModule} from './Wallet/wallet.module';
import {WalletBankCardModule} from './WalletBankCard/walletBankCard.module';
import {WalletBalanceModule} from './WalletBalance/walletBalance.module';

@Module({
  imports: [WalletModule, WalletBalanceModule, WalletBankCardModule],
  controllers: [],
  providers: [],
  exports: []
})
export class WalletBaseModule {}
