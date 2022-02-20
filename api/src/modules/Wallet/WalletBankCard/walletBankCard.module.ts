import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Schema, CollectionName} from './schemas/walletBankCard.schemas';
import {WalletBankCardController} from './walletBankCard.controller';
import {WalletBankCardService} from './walletBankCard.service';
// eslint-disable-next-line max-len
import {WalletBankCardTransactionModule} from '../WalletBankCardTransaction/walletBankCardTransaction.module';
import {
  Schema as WalletSchema,
  CollectionName as WalletCollectionName
} from '../Wallet/schemas/wallet.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    MongooseModule.forFeature([
      {name: WalletCollectionName, schema: WalletSchema}
    ]),
    WalletBankCardTransactionModule
  ],
  controllers: [WalletBankCardController],
  providers: [WalletBankCardService],
  exports: [WalletBankCardService]
})
export class WalletBankCardModule {}
