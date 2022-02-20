import {HttpModule, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/workspaceSubscription.schemas';
import {WorkspaceSubscriptionController} from './workspaceSubscription.controller';
import {WorkspaceSubscriptionService} from './workspaceSubscription.service';
import {WorkspaceSubscriptionResolver} from './workspaceSubscription.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}]),
    HttpModule
  ],
  controllers: [WorkspaceSubscriptionController],
  providers: [WorkspaceSubscriptionService, WorkspaceSubscriptionResolver],
  exports: [WorkspaceSubscriptionService]
})
export class WorkspaceSubscriptionModule {}
