import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/checkout.schemas';
import {CheckoutController} from './checkout.controller';
import {CheckoutService} from './checkout.service';
import {CheckoutResolver} from './checkout.resolver';
import {OrderModule} from '../Order/order.module';
import {PaymentModule} from '../Payment/payment.module';
import {WalletBankCardModule} from '../Wallet/WalletBankCard/walletBankCard.module';
// eslint-disable-next-line max-len
import {WorkspacePaymentMethodModule} from '../Workspace/submodules/WorkspacePaymentMethod/workspacePaymentMethod.module';
import {ShoppingCartModule} from '../ShoppingCart/shoppingCart.module';
import {InvoiceModule} from '../Invoice/invoice.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    OrderModule,
    PaymentModule,
    ShoppingCartModule,
    WalletBankCardModule,
    WorkspacePaymentMethodModule,
    InvoiceModule
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService, CheckoutResolver],
  exports: [CheckoutService]
})
export class CheckoutModule {}
