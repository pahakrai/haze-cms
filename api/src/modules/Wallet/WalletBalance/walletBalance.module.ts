import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/walletBalance.schemas';
import {WalletBalanceController} from './walletBalance.controller';
import {WalletBalanceService} from './walletBalance.service';
// eslint-disable-next-line max-len
import {WalletBalanceTransactionModule} from '../WalletBalanceTransaction/walletBalanceTransaction.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    WalletBalanceTransactionModule
  ],
  controllers: [WalletBalanceController],
  providers: [WalletBalanceService],
  exports: [WalletBalanceService]
})
export class WalletBalanceModule {}
