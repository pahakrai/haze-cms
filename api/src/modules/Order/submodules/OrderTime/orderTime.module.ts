import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {Schema, CollectionName} from './schemas/orderTime.schemas';
import {OrderTimeController} from './orderTime.controller';
import {OrderTimeService} from './orderTime.service';
import {OrderTimeResolver} from './orderTime.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [OrderTimeController],
  providers: [OrderTimeService, OrderTimeResolver],
  exports: [OrderTimeService]
})
export class OrderTimeModule {}
