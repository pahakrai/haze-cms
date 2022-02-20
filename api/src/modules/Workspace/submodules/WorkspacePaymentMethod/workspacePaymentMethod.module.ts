import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/workspacePaymentMethod.schemas';
import {WorkspacePaymentMethodController} from './workspacePaymentMethod.controller';
import {WorkspacePaymentMethodService} from './workspacePaymentMethod.service';
import {WorkspacePaymentMethodResolver} from './workspacePaymentMethod.resolver';

import {PaymentMethodModule} from '../../../PaymentMethod/paymentMethod.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    PaymentMethodModule
  ],
  controllers: [WorkspacePaymentMethodController],
  providers: [WorkspacePaymentMethodService, WorkspacePaymentMethodResolver],
  exports: [WorkspacePaymentMethodService]
})
export class WorkspacePaymentMethodModule {}
