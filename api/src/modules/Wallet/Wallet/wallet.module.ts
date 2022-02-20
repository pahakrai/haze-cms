import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/wallet.schemas';
import {WalletController} from './wallet.controller';
import {WalletService} from './wallet.service';
import {WalletBalanceModule} from '../WalletBalance/walletBalance.module';
import {WalletBankCardModule} from '../WalletBankCard/walletBankCard.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    WalletBalanceModule,
    WalletBankCardModule
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}
