import {HttpModule, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {
  Schema,
  CollectionName
} from './schemas/workspaceSubscriptionInvoice.schemas';
import {WorkspaceSubscriptionInvoiceController} from './workspaceSubscriptionInvoice.controller';
import {WorkspaceSubscriptionInvoiceService} from './workspaceSubscriptionInvoice.service';
import {WorkspaceSubscriptionInvoiceResolver} from './workspaceSubscriptionInvoice.resolver';
import {WorkspaceSubscriptionModule} from '../WorkspaceSubscription/workspaceSubscription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    HttpModule,
    WorkspaceSubscriptionModule
  ],
  controllers: [WorkspaceSubscriptionInvoiceController],
  providers: [
    WorkspaceSubscriptionInvoiceService,
    WorkspaceSubscriptionInvoiceResolver
  ],
  exports: [WorkspaceSubscriptionInvoiceService]
})
export class WorkspaceSubscriptionInvoiceModule {}
