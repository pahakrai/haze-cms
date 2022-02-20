import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/subscriptionItem.schemas';
import {SubscriptionItemController} from './subscriptionItem.controller';
import {SubscriptionItemService} from './subscriptionItem.service';
import {SubscriptionItemResolver} from './subscriptionItem.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [SubscriptionItemController],
  providers: [SubscriptionItemService, SubscriptionItemResolver],
  exports: [SubscriptionItemService]
})
export class SubscriptionItemModule {}
