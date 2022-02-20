import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {
  Schema,
  CollectionName
} from './schemas/walletBankCardTransaction.schemas';
import {WalletBankCardTransactionController} from './walletBankCardTransaction.controller';
import {WalletBankCardTransactionService} from './walletBankCardTransaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CollectionName,
        schema: Schema
      }
    ])
  ],
  controllers: [WalletBankCardTransactionController],
  providers: [WalletBankCardTransactionService],
  exports: [WalletBankCardTransactionService]
})
export class WalletBankCardTransactionModule {}
