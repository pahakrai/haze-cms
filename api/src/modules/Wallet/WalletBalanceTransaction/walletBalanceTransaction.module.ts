import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {
  Schema,
  CollectionName
} from './schemas/walletBalanceTransaction.schemas';
import {WalletBalanceTransactionController} from './walletBalanceTransaction.controller';
import {WalletBalanceTransactionService} from './walletBalanceTransaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName,
        schema: Schema
      }
    ])
  ],
  controllers: [WalletBalanceTransactionController],
  providers: [WalletBalanceTransactionService],
  exports: [WalletBalanceTransactionService]
})
export class WalletBalanceTransactionModule {}
