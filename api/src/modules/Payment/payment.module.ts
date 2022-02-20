import {forwardRef, Module, HttpModule} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/payment.schemas';
import {PaymentController} from './payment.controller';
import {PaymentService} from './payment.service';
import {PaymentResolver} from './payment.resolver';
// import {PaymentTransactionResolver} from './payment.transaction.resolver';
import {OrderModule} from '../Order/order.module';
import {OrderProductModule} from '../Order/submodules/OrderProduct/orderProduct.module';
import {WorkspaceModule} from '../Workspace/workspace.module';

import {UserModule} from '../User/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    forwardRef(() => OrderModule),
    HttpModule,
    WorkspaceModule,
    OrderProductModule,
    UserModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentResolver],
  exports: [PaymentService]
})
export class PaymentModule {}
